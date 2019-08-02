// This file is used for testing random and minor things

import React from 'react'
import langutil from 'langutil'
import { Localizable } from 'langutil/react-additions'

import { Text, TouchableOpacity } from 'react-native'
// import { Localizable } from 'langutil/native-additions'

const dict = {
    'en': {
        'HELLO': 'Hello',
        'MEOW': 'Meow'
    },
    'zh-cn': {
        'HELLO': '哈咯',
        'MEOW': '喵'
    },
}

export default class App extends React.Component {

    constructor() {
        super()
        this.lang = 'en'
        langutil.init(dict, 'en')
        this.toggleLanguage = this.toggleLanguage.bind(this)
    }

    toggleLanguage() {
        this.lang = this.lang === 'en' ? 'zh-cn' : 'en'
        langutil.setLanguage(this.lang)
    }

    render() {
        const TOGGLE_TEXT = "TOGGLE LANGUAGE"
        return (
            <>

                <button onClick={this.toggleLanguage} children={TOGGLE_TEXT}/>

                <Localizable renderAs='p' keyword='HELLO'/>
                <Localizable renderAs='p' keyword='MEOW'/>
                <Localizable keyword='HELLO'/>
                <Localizable keyword='MEOW'/>

                <TouchableOpacity onPress={this.toggleLanguage}>
                    <Text children={TOGGLE_TEXT}/>
                </TouchableOpacity>

            </>
        )
    }

}