import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { localizeWith } from 'langutil'

export default class Screen extends React.Component {

    state = {
        casing: '',
    }

    render() {
        const { casing } = this.state
        return (
            <View style={styles.container}>
                <Text children={localizeWith({
                    keyword: 'HELLO_WORLD',
                    // casing: ''
                })}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})