const React = require('react');
const langutil = require("langutil");
module.exports = { Localizable: Localizable };
function Localizable({
    keyword, children, paramArray = [], casing, transform, renderAs = "span", ...otherProps
}) {
    if (!children && keyword) { children = keyword; }
    if (typeof children === "string") {
        children = langutil.localizeWith({
            keyword: children,
            paramArray: paramArray,
            casing: casing,
            transform: transform
        });
    }
    return React.createElement(renderAs, otherProps, children);
}