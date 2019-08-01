const React = require("react");
const langutil = require("langutil");

class Localizable extends React.Component {

    constructor(props) {
        super(props);
        langutil.internalHook.subscribeToOnLangChange((langutilId, hook) => {
            this.langutilId = langutilId;
            hook(() => { this.setState({}); });
        });
    }

    componentWillUnmount() {
        langutil.internalHook.unsubscribeToOnLangChange(this.langutilId);
    }

    render() {
        const {
            keyword, children, paramArray = [], casing, transform, renderAs = "span", allowEmpty, ...otherProps
        } = this.props;
        let child = !children && keyword ? keyword : children;
        if (typeof child === "string") {
            child = langutil.localizeWith({
                keyword: child, paramArray, casing, transform, allowEmpty
            });
        }
        return React.createElement(renderAs, otherProps, child);
    }

}

module.exports = { Localizable };