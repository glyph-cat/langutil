# langutil 2.3.0

## Changes to automatic language detection in React Native
Automatic language detection for React Native is no longer included in the core to avoid conflict with webpack config in some cases. It has been splitted out as a function and can be imported from `'langutil/native-additions'`.

A typical file used to initialize `langutil` would now look like this:

<pre>


    import { init } from 'langutil'
    <ins>import { detectLanguage } from 'langutil/native-additions'</ins>
    import dictionary from './dictionary'

    <del>init(dictionary, "en", true)</del>
    <ins>init(dictionary, "en", detectLanguage)</ins>

</pre>

<br/>

***What happens if I don't to change?***
* Your app will not break but automatic language detection will stop to work on your apps, as a result, whatever language code that was passed in will be used.


<br/>

## New `<Localizable/>` component

For React,

    import { Localizable } from 'langutil/react-additions'

    const Screen = () => (
        <div>
            <Localizable
                renderAs="h1"
                keyword="HELLO_NAME_HOW_ARE_YOU",
                paramArray={["John"]}
                casing="sentenceCase"
                onClick={()=>{ window.alert("Hello again") }}
                style={{
                    color: "#FFAA00",
                    fontStyle: "italic"
                }}
            />
        </div>
    )


<br/>
For React Native,

    import { Alert, View } from 'react-native'
    import { Localizable } from 'langutil/native-additions'

    const Screen = () => (
        <View>
            <Localizable
                // The `renderAs` prop is only available in React
                keyword="HELLO_NAME_HOW_ARE_YOU",
                paramArray={["John"]}
                casing="sentenceCase"
                onPress={()=>{ Alert.alert("Hello again") }}
                style={{
                    color: "#FFAA00",
                    fontStyle: "italic"
                }}
            />
        </View>
    )
<br/>

## Template Dictionaries
* The [repo](https://github.com/chin98edwin/langutil/tree/master/dictionary) now includes template dictionaries, some of the most commonly used words are readily translated. More translations will be added over time.

<br/>

## Miscellaneous
* Internal optimization for better performance and debugging experience.

<br/>