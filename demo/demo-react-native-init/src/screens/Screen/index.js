import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default class Screen extends React.Component {

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text children="Coming soon"/>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})