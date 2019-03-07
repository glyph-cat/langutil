if (typeof document !== 'undefined') {
    module.exports = require('./counterparts/web')
} else if (typeof navigator !== 'undefined' && navigator.product == 'ReactNative') {
    module.exports = require('./counterparts/native')
} else {
    throw Error('<Localizable/> is meant for React and React Native only. ')
}