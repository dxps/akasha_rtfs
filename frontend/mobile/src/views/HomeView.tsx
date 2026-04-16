import { apiRoutes, appInfo, type HealthResponse } from '@akasha/shared'
import { Server, Smartphone } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AkashaLogo } from '../AkashaLogo'
import { fonts } from '../fonts'
import { type ThemeColors } from '../theme'

const apiBaseUrl =
	process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:9908'

interface HomeViewProps {
	colors: ThemeColors
}

export function HomeView({ colors }: HomeViewProps) {
	const [apiStatus, setApiStatus] = useState('Not checked yet')
	const styles = createStyles(colors)

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
		<View style={styles.container}>
			<View style={styles.logo}>
				<AkashaLogo />
			</View>
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
	)
}

function createStyles(colors: ThemeColors) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			paddingBottom: 104,
			paddingHorizontal: 24,
			paddingTop: 24,
		},
		eyebrow: {
			color: colors.green,
			fontFamily: fonts.black,
			fontSize: 13,
			letterSpacing: 0,
			marginBottom: 12,
			textTransform: 'uppercase',
		},
		logo: {
			alignSelf: 'flex-start',
			marginBottom: 16,
		},
		title: {
			color: colors.foreground,
			fontFamily: fonts.extraBold,
			fontSize: 56,
			lineHeight: 60,
		},
		description: {
			color: colors.muted,
			fontFamily: fonts.regular,
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
			minHeight: 40,
			paddingHorizontal: 12,
		},
		primaryButtonText: {
			color: colors.background,
			fontFamily: fonts.regular,
			fontSize: 16,
		},
		nativeBadge: {
			alignItems: 'center',
			backgroundColor: colors.muted,
			borderRadius: 8,
			flexDirection: 'row',
			gap: 8,
			minHeight: 40,
			paddingHorizontal: 12,
		},
		nativeBadgeText: {
			color: colors.background,
			fontFamily: fonts.regular,
			fontSize: 15,
		},
		status: {
			alignItems: 'center',
			flexDirection: 'row',
			gap: 8,
			marginTop: 24,
		},
		statusText: {
			color: colors.green,
			fontFamily: fonts.extraBold,
			fontSize: 16,
		},
		route: {
			color: colors.muted,
			fontFamily: fonts.regular,
			fontSize: 14,
			lineHeight: 22,
			marginTop: 8,
		},
	})
}
