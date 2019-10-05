# langutil 3.0.0

* Localizing function is now simplified to only one function: `localize`
* New `withLang` higher-order component in favor of `<Localizable/>`
* New `AUTO_DETECT` implementation
* Dictionary inspection now do not happen by default in favor of performance
* Structure your dictionary by keywords or language in the shape of an object, langutil will automatically determine which method you're using
* New `setDictionary` function in case you want to lazy load your localizations.

<br/>