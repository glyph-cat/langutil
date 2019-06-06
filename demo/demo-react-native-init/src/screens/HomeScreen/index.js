import React from 'react'
import { Alert, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { localize, localizeWith } from 'langutil'
import { Localizable } from 'langutil/native-additions'

export default class HomeScreen extends React.Component {

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView>
                    {/* <Localizable children="WELCOME_TO_MY_APP" style={styles.title}/> */}
                    {/* <Localizable children="WELCOME_TO_MY_APP" style={styles.title}/> */}
                    <TouchableOpacity style={{
                        backgroundColor: "cyan",
                    }} onPress={()=>{
                        Alert.alert(localizeWith({ keyword: "WELCOME_TO_MY_APP" }))
                    }}>
                        <Localizable keyword="CLICK_ME"/>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})