import { Image, StyleSheet } from 'react-native'

interface AkashaLogoProps {
	height?: number
	width?: number
}

const akashaLogoImage = require('../assets/logo.png') as number

export function AkashaLogo({ height = 86, width = 134 }: AkashaLogoProps) {
	return (
		<Image
			accessibilityLabel="Akasha logo"
			resizeMode="contain"
			source={akashaLogoImage}
			style={[styles.logo, { height, width }]}
		/>
	)
}

const styles = StyleSheet.create({
	logo: {
		height: 86,
		width: 134,
	},
})
