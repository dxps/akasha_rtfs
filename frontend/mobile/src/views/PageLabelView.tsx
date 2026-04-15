import { StyleSheet, Text, View } from 'react-native'
import { type ThemeColors } from '../theme'

interface PageLabelViewProps {
	colors: ThemeColors
	title: string
}

export function PageLabelView({ colors, title }: PageLabelViewProps) {
	const styles = createStyles(colors)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	)
}

function createStyles(colors: ThemeColors) {
	return StyleSheet.create({
		container: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center',
			paddingBottom: 104,
			paddingHorizontal: 24,
			paddingTop: 24,
		},
		title: {
			color: colors.foreground,
			fontSize: 34,
			fontWeight: '800',
			textAlign: 'center',
		},
	})
}
