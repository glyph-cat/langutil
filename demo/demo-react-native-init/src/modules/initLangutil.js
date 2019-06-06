import AsyncStorage from '@react-native-community/async-storage'
import langutil from 'langutil'
import dictionary from '../localizations'
const isStringAndNotNull = value => (value !== null) && (typeof value === 'string')

// This module initializes the language setting; it must be called upon app launch
// AsyncStorage is used to store the user's preferred language

getLang = async () => {
    let langToSet = "en", autoDetect = true
    try {
        const cachedLang = await AsyncStorage.getItem('user-lang')
        if (isStringAndNotNull(cachedLang)) {
            langToSet = cachedLang
            autoDetect = false
        }
    } catch (e) {
        console.error(e)
    }
    // console.log('langToSet: ' + langToSet)
    // console.log('autoDetect: ' + autoDetect)
    langutil.init(dictionary, langToSet, autoDetect)
}; getLang()