# langutil 2.4.X

## `<Localizable/>` will update itself when `setLanguage()` is called
When calling `setLanguage()`, translations implemented through `<Localizable/>` will be automatically updated to display the localizations of the new language. With this, there's no longer the need to call `setState` on parent components or require users to restart your app for language changes to take effect.

<br/>

## New `allowEmpty` parameter to suppress warnings about empty keywords
To help reduce clutter in logs, `allowEmpty` is now a parameter of `localize`, `localizeWith` and `<Localizable/>`. This is useful for conditional rendering where the keyword may end up being an empty string.

<br/>

## Snooze dictionary inspection until a given date
The new `logs.snoozeInspectionUntil(due: Date)` function allows you to suppress the warning message about missing localizations that appears right after the langutil is initialized. Depening on the size of the dictionary, the warning message could end up being very long and bothersome. Use this method to temporarily hide it away.

<br/>