import { Navigation } from 'react-native-navigation'

// Screen Components
const screens = {
	HomeScreen: require('../screens/HomeScreen'),
	PushedScreen: require('../screens/PushedScreen'),
	SettingScreen: require('../screens/SettingScreen'),
}

// Register Screens
const screenIndex = Object.keys(screens)
for (let i = 0; i < screenIndex.length; i++) {
	const currentIndex = screenIndex[i]
	const currentItem = screens[currentIndex]
	try {
		Navigation.registerComponent(currentIndex, () => currentItem.default)
	} catch (error) {
		console.log(error)
	}
}