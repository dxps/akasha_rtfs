import { apiRoutes, appInfo, type HealthResponse } from '@akasha/shared'
import { Moon, Server, Smartphone, Sun } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native'

const apiBaseUrl =
	process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:9908'
type ThemeMode = 'light' | 'dark'

const themes = {
	light: {
		accent: '#af3a03',
		background: '#d1d2d1',
		blue: '#076678',
		border: '#d5c4a1',
		foreground: '#504945',
		green: '#79740e',
		muted: '#7c6f64',
		surface: '#f2e5bc',
	},
	dark: {
		accent: '#fe8019',
		background: '#3c3c3c',
		blue: '#83a598',
		border: '#665c54',
		foreground: '#d5c4a1',
		green: '#b8bb26',
		muted: '#bdae93',
		surface: '#3c3836',
	},
} as const

export default function App() {
	const deviceTheme = useColorScheme()
	const [theme, setTheme] = useState<ThemeMode>(
		deviceTheme === 'dark' ? 'dark' : 'light',
	)
	const [apiStatus, setApiStatus] = useState('Not checked yet')
	const colors = themes[theme]
	const styles = useMemo(() => createStyles(colors), [colors])
	const themeIcon =
		theme === 'light' ? (
			<Moon color={colors.foreground} size={18} />
		) : (
			<Sun color={colors.foreground} size={18} />
		)

	async function checkApiHealth(): Promise<void> {
		try {
			const response = await fetch(`${apiBaseUrl}${apiRoutes.health}`)
			const health = (await response.json()) as HealthResponse
			setApiStatus(`${health.appName} API is ${health.status}`)
		} catch {
			setApiStatus('API is unreachable from this device')
		}
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Pressable
					accessibilityLabel={
						theme === 'light'
							? 'Switch to dark theme'
							: 'Switch to light theme'
					}
					accessibilityRole="button"
					style={styles.themeButton}
					onPress={() =>
						setTheme((current) =>
							current === 'light' ? 'dark' : 'light',
						)
					}
				>
					{themeIcon}
				</Pressable>

				<Text style={styles.eyebrow}>Fullstack TypeScript</Text>
				<Text style={styles.title}>{appInfo.name}</Text>
				<Text style={styles.description}>{appInfo.description}</Text>

				<View style={styles.actions}>
					<Pressable
						accessibilityRole="button"
						style={styles.primaryButton}
						onPress={checkApiHealth}
					>
						<Server color={colors.background} size={18} />
						<Text style={styles.primaryButtonText}>
							Check API health
						</Text>
					</Pressable>
					<View style={styles.nativeBadge}>
						<Smartphone color={colors.background} size={18} />
						<Text style={styles.nativeBadgeText}>
							React Native ready
						</Text>
					</View>
				</View>

				<View style={styles.status}>
					<Server color={colors.green} size={18} />
					<Text style={styles.statusText}>{apiStatus}</Text>
				</View>
				<Text style={styles.route}>
					Backend route: {apiBaseUrl}
					{apiRoutes.health}
				</Text>
			</View>
		</SafeAreaView>
	)
}

function createStyles(colors: (typeof themes)[ThemeMode]) {
	return StyleSheet.create({
		safeArea: {
			backgroundColor: colors.background,
			flex: 1,
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			padding: 24,
		},
		themeButton: {
			alignItems: 'center',
			alignSelf: 'flex-start',
			backgroundColor: 'transparent',
			borderRadius: 8,
			justifyContent: 'center',
			marginBottom: 36,
			minHeight: 44,
			width: 44,
		},
		eyebrow: {
			color: colors.green,
			fontSize: 13,
			fontWeight: '900',
			letterSpacing: 0,
			marginBottom: 12,
			textTransform: 'uppercase',
		},
		title: {
			color: colors.foreground,
			fontSize: 56,
			fontWeight: '800',
			lineHeight: 60,
		},
		description: {
			color: colors.muted,
			fontSize: 18,
			lineHeight: 28,
			marginBottom: 24,
			marginTop: 20,
		},
		actions: {
			alignItems: 'flex-start',
			gap: 12,
		},
		primaryButton: {
			alignItems: 'center',
			backgroundColor: colors.foreground,
			borderRadius: 8,
			flexDirection: 'row',
			gap: 8,
			minHeight: 46,
			paddingHorizontal: 16,
		},
		primaryButtonText: {
			color: colors.background,
			fontSize: 16,
			fontWeight: '800',
		},
		nativeBadge: {
			alignItems: 'center',
			backgroundColor: colors.muted,
			borderRadius: 8,
			flexDirection: 'row',
			gap: 8,
			minHeight: 44,
			paddingHorizontal: 14,
		},
		nativeBadgeText: {
			color: colors.background,
			fontSize: 15,
			fontWeight: '800',
		},
		status: {
			alignItems: 'center',
			flexDirection: 'row',
			gap: 8,
			marginTop: 24,
		},
		statusText: {
			color: colors.green,
			fontSize: 16,
			fontWeight: '800',
		},
		route: {
			color: colors.muted,
			fontSize: 14,
			lineHeight: 22,
			marginTop: 8,
		},
	})
}
