const React = require("react");
const langutil = require("langutil");

class LangProvider extends React.Component {

    constructor() {
        super();
        langutil.internalHook.subscribeToOnLangChange((langutilId, hook) => {
            this.langutilId = langutilId;
            hook(() => { this.setState({}); });
        });
    }

    componentWillUnmount() {
        langutil.internalHook.unsubscribeToOnLangChange(this.langutilId);
    }

    render() {
        return this.props.children;
    }

}

class Localizable extends LangProvider {
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
        if (renderAs === "value") {
            return child;
        } else {
            return React.createElement(renderAs, otherProps, child);
        }
    }
}

module.exports = { LangProvider, Localizable };