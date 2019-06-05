const React = require('react');
const langutil = require("langutil");
module.exports = { Localizable: Localizable };
function Localizable({
    keyword, children, paramArray = [], casing, transform, renderAs = "span", ...otherProps
}) {
    let kWordToUse = ""
    if (keyword) { kWordToUse = keyword } else if (children) { kWordToUse = children }
    if (typeof children === "string") {
        children = langutil.localizeWith({
            keyword: kWordToUse,
            paramArray: paramArray,
            casing: casing,
            transform: transform
        });
    }
    return React.createElement(renderAs, otherProps, children);
}