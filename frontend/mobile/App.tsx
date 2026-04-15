import { Moon, Sun } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	useColorScheme,
	View,
} from 'react-native'
import { FooterNav } from './src/components/FooterNav'
import { type MobileView } from './src/navigation'
import { themes, type ThemeColors, type ThemeMode } from './src/theme'
import { HomeView } from './src/views/HomeView'
import { PageLabelView } from './src/views/PageLabelView'

export default function App() {
	const deviceTheme = useColorScheme()
	const [theme, setTheme] = useState<ThemeMode>(
		deviceTheme === 'dark' ? 'dark' : 'light',
	)
	const [activeView, setActiveView] = useState<MobileView>('home')
	const colors = themes[theme]
	const styles = useMemo(() => createStyles(colors), [colors])
	const themeIcon =
		theme === 'light' ? (
			<Moon color={colors.foreground} size={18} />
		) : (
			<Sun color={colors.foreground} size={18} />
		)

	function renderView() {
		switch (activeView) {
			case 'data-explorer':
				return <PageLabelView colors={colors} title="Data Explorer" />
			case 'types':
				return <PageLabelView colors={colors} title="Types Mgmt" />
			case 'profile':
				return <PageLabelView colors={colors} title="User Profile" />
			case 'home':
				return <HomeView colors={colors} />
		}
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.screen}>
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
				{renderView()}
				<FooterNav
					activeView={activeView}
					colors={colors}
					onSelectView={setActiveView}
				/>
			</View>
		</SafeAreaView>
	)
}

function createStyles(colors: ThemeColors) {
	return StyleSheet.create({
		safeArea: {
			backgroundColor: colors.background,
			flex: 1,
		},
		screen: {
			flex: 1,
		},
		themeButton: {
			alignItems: 'center',
			backgroundColor: 'transparent',
			borderRadius: 8,
			justifyContent: 'center',
			left: 24,
			minHeight: 36,
			position: 'absolute',
			top: 24,
			width: 36,
			zIndex: 2,
		},
	})
}
