## Hoist non-React statics

    // Implementating in React or React Native
    // NOTE: Peer dependency 'hoist-non-react-statics' is required

    import { localize } from 'langutil'
    import { withLang } from 'langutl/react-additions'

    const MyComponent = () => <p>{localize(LOGIN)}</p>
    export default withLang(MyComponent)
