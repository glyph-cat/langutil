const React = require('react')
const { Code } = require('~components/document')

module.exports = {

  ADVANCED: 'Advanced',
  ALTERNATIVE_SYNTAX: 'Alternative syntax',
  API_REFERENCES: 'API References',
  APP_BOUNDARY_ERROR_OCCURED: 'We\'re sorry, an error occured.',
  APPLY_CASINGS: 'Apply casings',
  APPLY_TRANSFORMATION: 'Apply transformation',
  APPLYING_CASINGS_TO_YOUR_LOC_STR: 'Applying casings to your localized strings',
  APPLYING_TRANSFORMATION_TO_YOUR_LOC_STR: 'Applying transformation to your localized strings',

  'API_DESC_AUTO_DETECT': ({ init, setL }) => <>A detector function meant to be used in conjunction with {init} or {setL}.</>,
  'API_DESC_CREATE_KEY': 'Creates a key for your dictionary. This is used when structuring your dictionary by keywords instead of language in v2.',
  'API_DESC_GET_CURRENT_LANG': 'Get the currently set language.',
  'API_DESC_GET_DEFINED_LANG': 'Get the list of language that have been defined in the dictionary.',
  'API_DESC_GET_LANG': 'Get the currently set language.',
  'API_DESC_INIT': ({ setD, setL }) => <>Initialize langutil with a dictionary and language. Shorthand for {setD} and {setL}.</>,
  'API_DESC_IS_AUTO': 'Determine if auto language detection is used.',
  API_DESC_LANGMAP: 'Manually specify a language and have a keyword mapped its localized value.',
  'API_DESC_LOCALIZABLE': 'A wrapper component for rendering HTML/React elements.',
  'API_DESC_LOCALIZE': 'Maps a keyword to its localized value.',
  'API_DESC_LOGS_FOCUS': 'If you have chosen to hide away langutil logs but want to log a portion of code with it, place your code inside the callback.',
  'API_DESC_LOGS_HIDE': 'Hide logs from langutil.',
  'API_DESC_LOGS_HIDE_VERBOSE': 'Hide verbose logs from langutil.',
  'API_DESC_LOGS_SHOW': 'Show logs from langutil. Logs are shown by default.',
  'API_DESC_LOGS_SHOW_VERBOSE': 'Show verbose logs from langutil. Verbose logs are hidden by default.',
  'API_DESC_SET_DICTIONARY': ({ init }) => <>Sets the dictionary. We encourage using {init} and not changing the contents of the dictionary in halfway. The only scenario you might need to use this function is if the dictionary is splitted up into sections for lazy loading.</>,
  'API_DESC_SET_LANGUAGE': 'Sets the language.',
  'API_DESC_SNOOZE_INSPECTION_UNTIL': 'If your dictionary has not yet been completed and the warning about missing localizations bother you, you can use this to suppress the warning until a given date.',
  'API_DESC_USE_LANG': 'A hook that allows your existing components to listen for changes in langutil and update themselves accordingly.',
  'API_DESC_WITH_LANG': 'A Higher-order component that allows your existing components to listen for changes in langutil and update themselves accordingly.',

  'API_PARAM_DICT': 'The object containing all localizations.',
  'API_PARAM_DETECTOR': ({ auto }) => <>A langutil built-in function, pass {auto} into this parameter to allow auto-language detection.</>,
  'API_PARAM_DUE': 'The due date where warning will be shown again.',
  'API_PARAM_FN': 'The callback which you want langutil to focus its logs on.',
  'API_PARAM_LANG': 'The language to use.',
  'API_PARAM_KEYWORD': 'A short string representing the localized value.',
  'API_PARAM_PARAM': 'An array or object which each of their values can be swapped into localizations.',
  'API_PARAM_CASING': 'Casing styles that will be applied to the localized value if it is a string.',
  'API_PARAM_TRANSFORM': 'Apply a transformation to the localized value.',
  'API_PARAM_WRAPPED_COMPONENT': 'The component to be wrapped in.',

  'API_PARAM_KEYWORD_LOCZ': 'The keyword for localization.',
  'API_PARAM_PARAMARRAY_LOCZ': 'An array of parameters that can be passed into.',
  'API_PARAM_ALLOW_EMPTY': 'Ignore warnings about empty keywords.',
  'API_PARAM_RENDER_AS_LOCZ': ({ span, renderAsVal }) => <>Specify which type of HTML/React element you would like your localizations to be rendered into. By default it is rendered as a {span}. To obtain the raw value of the localization, use {renderAsVal}.</>,

  'API_RTYPE_THE_LOCALIZED_VALUE': 'The localized value.',
  'API_RTYPE_ALL_LANG_FOUND_IN_DICT': 'All languages found in the dictionary.',
  'API_RTYPE_STR_REP_OF_LANG': 'The string representation of the language.',
  'API_RTYPE_A_KEYWORD_OBJ': 'A keyword object.',
  'API_RTYPE_LOGS_FOCUS': 'True if the callback was sucessful.',
  'API_RTYPE_USE_LANG': '',
  // '': '',

  'BASIC_USAGE': 'Basic usage',
  'BASICS': 'Basics',
  'BUILDER': 'Builder',

  'CASING': 'Casing',
  'CASINGS': 'Casings',
  'CHANGELOG': 'Changelog',

  'CHANGELOG_ADAPTED_SYNTAX_FOR_COMMONJS': 'Adapted syntax for CommonJS.',
  'CHANGELOG_ADD_QUICKFIX_TO_DOC': 'Added some quick fixes to the documentation.',
  'CHANGELOG_ADD_UPDATE_HISTORY_TO_README': 'Added Update History to Readme.',
  'CHANGELOG_ADDED_84_NEW_LANG': ({ langs }) => <>Added 84 new languages to auto detection algorithm: {langs}.</>,
  'CHANGELOG_ADDED_BACK_LEGACY_COMPENSATION': 'Added back legacy compensation for old dictionary structure where it is arranged by keywords as an array.',
  'CHANGELOG_ADDED_AUTO_SUGGESTIONS': ({ init, setL }) => <>Added auto suggestions from the Language List to {init} and {setL}.</>,
  'CHANGELOG_ADDED_CHINESE_CODE': ({ c }) => <>Added the {c} option to the Language List (not simplified ot traditional specific).</>,
  'CHANGELOG_ADDED_DOCS_ABT_DICT': 'Added docs about the Dictionary.',
  'CHANGELOG_ADDED_HIDELOGS': ({ hide }) => <>Added a new {hide} function.</>,
  'CHANGELOG_ADDED_NEW_OPTION_LOC_WITH': ({ sc, cg, lw }) => <>Added new option {sc} for the {cg} parameter in {lw}.</>,
  'CHANGELOG_ADDITIONS_FOR_REACT': ({ locz }) => <>Additions for React: <ul><li>New {locz} component that acts as a wrapper for HTML or React elements.</li></ul></>,
  'CHANGELOG_ASSIGN_ANYTHING_TO_LOC_VALUE': 'You can now assign anything to your localized value, for instance, you might want to have a different logo image for each language if you have a tagline in your logo.',
  'CHANGELOG_AUTO_DETECT_SPLITTED': ({ na }) => <>Automatic language detection for React Native is no longer included in the core to avoid conflict with webpack config in some cases. It has been splitted out as a function and can be imported from {na}.</>,
  'CHANGELOG_AUTO_DETECT_SUPPORT_RN': 'Auto language detection is now supported in React Native.',
  'CHANGELOG_CAN_DEFINE_DICT_BY_KEYWORDS': 'You can now define dictionaries by Keywords.',
  'CHANGELOG_CHG_RN_DEPENDENCY_TYPE': ({ rn }) => <>Changed {rn} from optional dependency to peer dependency.</>,
  'CHANGELOG_CODE_OPTIMIZATIONS': 'Code optimizations.',
  'CHANGELOG_COMPLETE_REMOVAL_DEPRE_SET_MAR2020': 'Complete removal of deprecated APIs set to be in March 2020.',
  'CHANGELOG_CREATION_OF_LANGUTIL': 'Creation of langutil with 3 core functions and the ability to auto-detect up to 128 languages.',
  'CHANGELOG_DOC_UPDATED_REDUCE_SIZE': 'Documentations have been updated to reduce package size.',
  'CHANGELOG_DICT_INSP_NOT_HAPPEN_DEFAULT': 'Dictionary inspection now do not happen by default in favor of performance.',
  'CHANGELOG_ERR_THROWN_UPON_CRITICAL': 'Errors are thrown upon critical situations such as invalid parameter.',
  'CHANGELOG_EMERGENCY_FIX_RN_AUTO_DETECT_FAIL': 'Emergency fix for a bug where auto detect in v2.2.0 fails for React Native apps.',
  'CHANGELOG_EXAMPLES_REMOVED_FROM_DOC': 'Examples have been removed from inline documentation as more detailed ones are already available in this readme file.',
  'CHANGELOG_FIXED_ALWAYS_MINIFIED': 'Fixed the bug where langutil will always launch in minified mode by default.',
  'CHANGELOG_FIXED_BUG_AUTO_DETECT': 'Fixed a bug with auto detect.',
  'CHANGELOG_FIXED_BUG_KEYWORD_REC_AS_INVALID': 'Fixed a bug where certain valid keywords are recognized as invalid.',
  'CHANGELOG_FIXED_ESC_PHDRS': ({ p, pp, k, kk }) => <>Fixed issue where escaped placeholders do not level down if no param array or objects are provided ({pp} → {p} and {kk} → {k}).</>,
  'CHANGELOG_FIXED_FALSE_WARNINGS_PARAMS': 'Fixed an issue where false warnings about insufficient parameters are shown.',
  'CHANGELOG_FIXED_FALSE_WARNINGS_PARAMS_FOR_SURE': 'Fixed the issue where false warnings about insufficient parameters are shown. For sure!',
  'CHANGELOG_FIXED_INCR_FN_NAME_AUTO_DETECT_NATIVE_ADD': ({ ad }) => <>Fixed incorrect function name for {ad} in Native Additions.</>,
  'CHANGELOG_FIXED_INCR_TYPE_REACT_ADD': ({ add }) => <>Fixed incorrect typing in {add}.</>,
  'CHANGELOG_FIXED_INCORRECT_ESCAPER_SWAP': ({ p, q, p2 }) => <>Fixed the issue where the {q}s in localization will be replaced with {p}s. Previously, the algorithm temporarily swapped {p2} with {q} to allow escaping {p}.</>,
  'CHANGELOG_FIXED_ISSUE_ALREADY_WARNED_STILL_SHOW_UP': 'Fixed issue where already-warned keywords still show up in group warnings.',
  'CHANGELOG_FIXED_ISSUE_THIS_LOCALIZE_NOT_FN': 'Fixed an issue where you may encounter an error with a message like "this.localize is not a function".',
  'CHANGELOG_FIXED_PROD_BUILD_FAILS_IF_LOG_SHOWN': 'Fixed a critical bug where there production build fails if logs are shown.',
  'CHANGELOG_GROUPED_WARNINGS_FOR_MISSING_LOC': 'Grouped warnings for missing localizations.',
  'CHANGELOG_HOTFIX_FOR_TS': 'Hot fix for a problem in TypeScript.',
  'CHANGELOG_HIDELOGS_WILL_BE_DEPRECATED': ({ hL }) => <>{hL} will be deprecated in future versions in favor of a more flexible method.</>,
  'CHANGELOG_INTERNAL_OPTIMIZATIONS_PERF_DEBUG_XP': 'Internal optimization for better performance and debugging experience.',
  'CHANGELOG_LANG_TABLE_MADE_COMPACT': 'The Language List table has been made more compact. Native names of the languages have been removed since a few are not able to displayed properly on most devices unless additional fonts are installed.',
  'CHANGELOG_LIST_FOLLOWS_ISO_CODES': 'Language list now follows ISO language codes but the old convention that langutil 1.x.x still works.',
  'CHANGELOG_LOC_FN_SIMPLIFIED': ({ loc }) => <>Localizing function is now simplified to only one function: {loc}.</>,
  'CHANGELOG_LOCZ_WILL_UPDATE_ITSELF': ({ locz, setL }) => <>{locz} will update itself when {setL} is called.</>,
  'CHANGELOG_MINOR_PERF_FIXES': 'Minor performance fixes.',
  'CHANGELOG_NEW_ALLOW_EMPTY': ({ aEty }) => <>New {aEty} parameter to suppress warnings about empty keywords.</>,
  'CHANGELOG_NEW_AUTO_DETECT_IMPLEMENTATION': ({ ad }) => <>New {ad} implementation.</>,
  'CHANGELOG_NEW_CREATEKEY_FN': ({ ck }) => <>There is a new {ck} method to help you with that.</>,
  'CHANGELOG_NEW_GET_DEF_LANGS': ({ gdl }) => <>Added new method {gdl} which allows you to access the list of languages defined in the dictionary during runtime.</>,
  'CHANGELOG_NEW_IS_AUTO_FN': ({ a }) => <>New {a} function to know whether autoDetection is set to true.</>,
  CHANGELOG_NEW_LANGMAP_FN: ({ m }) => <>New {m} function that allows you to explicitly localize a keyword into a language other than the one currently set.</>,
  'CHANGELOG_NEW_LOC_WITH_FN': ({ lw }) => <>Added new method {lw} for more powerful localizing capabilities: Apply <b>casing styles</b> and <b>custom transformations</b> to the localized value! 🦄</>,
  'CHANGELOG_NEW_LOGS_FOCUS_FN': ({ f }) => <>New {f} function allows to you see langutil logs in a specific block of code while hiding the rest, that is, only necessary if the logs were already hidden prior to that block.</>,
  'CHANGELOG_NEW_SET_DICT_FN': ({ sd }) => <>New {sd} function in case you want to lazy load your localizations.</>,
  'CHANGELOG_NEW_USELANG_HOOK': ({ ul, ls }) => <>New {ul} hook, contents of {ls} are also accessible from this hook.</>,
  'CHANGELOG_NEW_WITHLANG_HOC': ({ wl, locz }) => <>New {wl} higher-order component in favor of {locz}.</>,
  'CHANGELOG_PASS_CUSTOM_COMP_VIA_RENDER_AS': ({ r }) => <>You can pass in custom components via the {r} prop in React Native like how it can be done in React.</>,
  'CHANGELOG_PERF_OPT_FOR_PROD_MODE': 'Performance optimization for production mode.',
  CHANGELOG_REFINED_AUTO_DETECT_ALGO: 'Refined auto-detection algorithm.',
  'CHANGELOG_SHOWLOG_WILL_BE_REPLACED_BY': ({ showL, lHide, lShow }) => <>{showL} (still usable) will be replaced by {lHide} and {lShow}.</>,
  'CHANGELOG_SILENCED_UNNECESSARY_WARN_IN_LOC_WITH': ({ cg, tr, lw }) => <>Silenced the unnecessary warning messages when {cg} and {tr} parameters in {lw} are not defined as they are optional.</>,
  'CHANGELOG_SNOOZE_DICT_INSP_TILL_GIVEN_DATE': 'Snooze dictionary inspection until a given date.',
  'CHANGELOG_STRUCT_DICT_AS_OBJ': 'Structure your dictionary by keywords or language in the shape of an object, langutil will automatically determine which method you\'re using.',
  'CHANGELOG_SUPPORT_TYPINGS': 'Added support for typings',
  'CHANGELOG_THE_REPO_NOW_INCL_TEMPLATE_DICT': ({ repo }) => <>The {repo} now includes template dictionaries, some of the most commonly used words are readily translated. More translations will be added over time.</>,
  'CHANGELOG_WARN_FOR_PARAMOBJ_WILL_BE_SHOWN': 'Warnings for params (object) that are not tally will now be shown.',
  'CHANGELOG_WHEN_APPLY_CASING_ALLCAP_PRESERVED': 'When applying casings, ALLCAPPED words and Names will be preserved.',
  'CHANGELOG_WITHLANG_NOW_PASS_LANGSTATE': ({ wl, ls }) => <>{wl} now passes a prop called {ls}.</>,
  'CHANGELOG_WILL_LOOK_FOR_ALT_LANG_IF_AUTO_UNAVAILABLE': <>In case the automatically detected language is not supported in the dictionary, langutil look for an alternative language from the dictionary. For example, if your dictionary contains localizations for <Code>'en'</Code>, but the automatically detected language is <Code>'en-us'</Code>, langutil will set the language to <Code>'en'</Code>.</>,
  // 'CHANGELOG_': '',

  COPY: 'Copy',
  CLICK_TO_COPY_LINK: 'Click to copy link',
  COPIED: 'Copied',
  CURRENTLY_USING_PARAM: 'Currently using: %p',

  'DEFAULT_VALUE': 'Default value',
  'DESCRIPTION': 'Description',
  'DEPRE_REMOVED_SINCE_VERSION': '(Removed in v{:ver})',
  'DEPRE_TO_BE_REMOVED_BY_DATE': '(To be removed by {:date})',
  'DEPRECATED': 'Deprecated',
  'DEPRECATED_MSG_CREATE_KEY': ({ dev, convert }) => <>All dictionaries are now structured as objects. You will be able to use this function in conjuction with {convert} from the {dev} to re-structure the dictionary.</>,
  'DEPRECATED_MSG_GET_LANGUAGE': ({ getCL }) => <>Use {getCL} instead. Reason: The new naming gives a little more hint about what value the function is returning.</>,
  'DEPRECATED_MSG_LOCALIZABLE': ({ renderAs, locz, loc, withL, useL }) => <>The {renderAs} parameter that allows {locz} to render into anything complicates the code.<br />Solution: Use {loc} as you normally would inside your JSX code. Then export your component with {withL} or hook it with {useL} so that your components show the correct language when the user language has changed.</>,
  'DEPRECATED_MSG_LOCALIZE_WITH': ({ loc }) => <>Use {loc} instead.</>,
  'DEPRECATED_MSG_SNOOZE_INSPECTION_UNTIL': ({ dev }) => <>Dictionary inspection consumes a lot of computation power and it happens everytime langutil is initialized. This feature is now part of the {dev} so you can use it only when you need it instead.</>,

  'DOC_BODY_ADDITIONALLY_USE_CAN_USE_AUTO_DETECT': ({ autoDetect }) => <>Additionally, you can use {autoDetect} to let langutil figure out what language the device using.</>,
  'DOC_BODY_AS_YOU_BUILD_YOUR_PROJ': 'As you build your project, you will realize that amount of localizations begin to increase exponentially, if not, by a lot! It is because of that, it is better to split localizations into different files then combined them in an index file.',
  'DOC_BODY_BELOW_IS_COMPLETE_LIST_OF_CASINGS': 'Below is a complete list of the casing styles that langutil provides.',
  'DOC_BODY_BY_PASSING_IN_ARRAY_AS_OBJECT': ({ k: key }) => <>By passing in an object as the second parameter, langutil will substitute each occurence of every key in the object it finds in the localized string. This is done in the format of {key}.</>,
  'DOC_BODY_BY_PASSING_IN_ARRAY_AS_PARAM': ({ p }) => <>By passing in an array as the second parameter, langutil will substitute each occurence of {p} sequencially.</>,
  'DOC_BODY_CODE_BELOW_SHOWS_SIMPLE_EXAMPLE_COLON': 'The code below shows a simple example of that:',
  'DOC_BODY_HOIST_NON_REACT_STATICS_REQUIRED': ({ h }) => <i>Note: This function requires {h} as peer dependency.</i>,
  'DOC_BODY_IF_THE_BUILT_IN_CSTYLES_X_ENOUGH': 'If the built-in casing styles aren\'t enough, you can add your own transformation to the localized value.',
  'DOC_BODY_IN_YOUR_DIRECTORY': 'In your project\'s directory, run either of the commands below:',
  'DOC_BODY_INSERT_PARAM_INTRO': 'In some cases, you might want to insert values into your localizations. While it is do-able by using string concatenation or replacing a marker in the localized string, it would be tedious to repeat this for such ocassions every time.',
  'DOC_BODY_LANGUTIL_ALSO_ALLOW_STYLE_LOC': <>Langutil also allows you to styles localizations with different casings... just in <i style={{ opacity: 0.75 }}>case</i>.</>,
  'DOC_BODY_LANGUTIL_NEEDS_TO_BE_INIT': 'Langutil needs to be initialized with a dictionary and language before it can be used.',
  'DOC_BODY_LANGUTIL_PROVIDE_TWO_MTD_OVERCOME_ISSUE': 'Langutil provides two methods to overcome this issue.',
  'DOC_BODY_LOGS_NOT_SHOWN_IN_PROD': 'NOTE: Logs, warnings and error messages from langutil are stripped away in the minified version. But don\'t worry, keeping these functions in your code while using the minified version will not throw an undefined error. ',
  'DOC_BODY_EQUIVALENT_OF_LOCALIZE': ({ loc }) => <>Currently the equivalent of the alternative syntax of {loc}.</>,
  'DOC_BODY_NOTE_DICT_LANG_KEYS_FORMAT': 'Note that keywords in the dictionary should always be in UPPERCASE while the language should be in lowercase (Eg: \'en\', \'en-US\', \'english\').',
  'DOC_BODY_SETTING_UP_DESC': 'Before you start, you will need to setup a dictionary first.',
  'DOC_BODY_SETTING_UP_LINKING_NOTE': <>If you're setting this up in React Native (regardless of which version), there is <b>no need</b> for linking since Langutil does not contain any native modules.</>,
  'DOC_BODY_SETTING_UP_STRUCT_SUGGESTION': 'We would suggest you to structure your dictionary according to the example below.',
  'DOC_BODY_THEN_ADD_SOME_LOC': 'Then add some localization into the language files.',
  'DOC_BODY_TO_DISPLAY_KEY_IN_LOC': ({ k1, k2 }) => <>To display {k1} in your localizations, escape it with {k2}.</>,
  'DOC_BODY_TO_DISPLAY_P_IN_LOC': ({ p, escapedP }) => <>Note: To display {p} in your localizations, escape it with {escapedP}.</>,
  'DOC_BODY_USE_SETLANG_TO_SWITCH_LANG': ({ setL }) => <>Use {setL} to switch between languages.</>,
  'DOC_BODY_USE_LOC_TO_TRANSLATE': ({ loc }) => <>Use {loc} to translate your content.</>,
  'DOC_BODY_WITH_LANG_ALSO_PASSES_PROPS': ({ ls }) => <>At the same time, a {ls} prop will be passed into your component as well.</>,
  'DOC_BODY_YOU_MAY_ADD_MORE_FILES': 'You may add more files for other languages',
  'DOC_BODY_IN_REACT_CALL_INIT_BEFORE_APP': ({ appjs, app }) => <>In React, this function should be called in your entry file (presumably {appjs}), before and outside of {app}.</>,
  // 'DOC_BODY_': '',

  // TODO: Rename 'DOC_EXAMPLE' to 'DOCX'
  DOC_EXAMPLE_PRIMARY_LANG: 'en',
  DOC_EXAMPLE_PRIMARY_LANG_NAME: 'English',
  DOC_EXAMPLE_SECONDARY_LANG: 'zh',
  DOC_EXAMPLE_SECONDARY_LANG_NAME: 'Chinese',
  DOC_EXAMPLE_NAME_1: 'John',
  DOC_EXAMPLE_NAME_2: 'Jane',
  DOC_EXAMPLE_HELLO_VALUE_PRIMARY: 'Hello',
  DOC_EXAMPLE_HELLO_VALUE_SECONDARY: '哈咯',
  DOC_EXAMPLE_PARAM_ARR_HELLO_NAME_RAW: 'Hello, %%p.',
  DOC_EXAMPLE_PARAM_ARR_HELLO_NAME_VALUE: 'Hello, %p.',
  DOC_EXAMPLE_PARAM_ARR_HELLO_NAME_2_RAW: 'Hello, %%p and %%p.',
  DOC_EXAMPLE_PARAM_ARR_HELLO_NAME_2_VALUE: 'Hello, %p and %p.',
  DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_RAW: 'Hello, {::name1}.',
  DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_VALUE: 'Hello, {:name1}.',
  DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_2_RAW: 'Hello, {::name1} and {::name2}.',
  DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_2_VALUE: 'Hello, {:name1} and {:name2}.',
  DOC_EXAMPLE_HELLO_WORLD_PRIMARY_VALUE: 'Hello world',
  DOC_EXAMPLE_HELLO_WORLD_SECONDARY_VALUE: '哈咯世界',

  'DOC_NEXT_PARAM': 'Next: %p ▶',
  'DOC_NOT_FOUND': 'Document not found',
  'DOC_PREV_PARAM': '◀ Prev: %p',
  DOC_UNAVAILABLE_DESC: 'It may have been moved to another section or completely removed.',
  'DOCS': 'Docs',
  'DOCUMENTATION': 'Documentation',
  'DYNAMIC_LOCALIZATIONS': 'Dynamic localizations',

  'EXTERNAL_LINKS': 'External links',

  'FAIL_COPY_DESC': 'We\'re deeply sorry, an error occured. Please copy the item manually. ',

  FAQ: 'FAQ',
  FAQ_TITLE_001: 'Is linking needed in React Native?',
  FAQ_TITLE_002: 'Why is auto detection broken in React Native?',
  FAQ_TITLE_003: 'Can I explicitly localize something in another language?',
  FAQ_TITLE_004: 'Do I need to refresh my page/app after setLanguage?',
  FAQ_CONTENT_001: <><b>No.</b> Langutil only relies on JavaScript (and some TypeScript). This allows it to work just fine be it on browsers with React and on mobile with React Native.</>,
  FAQ_CONTENT_002: ({ ad, lu, luna }) => <>You might have accidentally imported {ad} from {lu} instead of {luna}. By importing directly from {lu}, the language of your debugger is 'detected' instead.</>,
  FAQ_CONTENT_002_B: 'It is separated in this way because it works differently in React Native. Besides, we didn\'t want to mix in uncessary code by having React Native code in your Web app or the other way round.',
  FAQ_CONTENT_002_C: 'If that is not the case, please submit a bug report instead and we will look into the issue.',
  FAQ_CONTENT_003: ({ lm }) => <><b>YES,</b> you can - by using the {lm} function, you can explicitly localize something into a language that is not currently set.</>,
  FAQ_CONTENT_004: ({ wl, ul }) => <><b>No.</b> So long as you wrap your component in {wl}, or use the {ul} hook, they should render with the correct localized content as the language changes.</>,

  'FOOTER_COPYRIGHT': 'Copyright © %p chin98edwin',

  'FOLDER_STRUCTURE': 'Folder structure',
  'GET_STARTED': 'Get started',

  'HERES_HOW_IT_WORKS_NUTSHELL': 'Here\'s how it works in a nutshell',
  'HOW_TO_USE_API': 'How to use `%p`',
  'HOW_TO_USE_API_REACT': 'How to use `%p` (React)',

  'ITS_THAT_SIMPLE': 'It\'s that simple!',
  'IN_YOUR_OWN_FILE_COLON': 'In your own file:',
  'INITIALIZING': 'Initializing',
  'INSERT_PARAMETERS': 'Insert parameters',
  'INSTALLATION': 'Installation',
  'INSTALLATION_AND_SETUP': 'Installation & Setup',

  'LANGSTATE_AUTO': 'Was auto detection being used?',
  'LANGSTATE_LANG': 'The currently set language.',
  'LIKE_THIS_KAWAII_IMG': ({ link }) => <>Like this cute image? Check out {link} for more.</>,
  'LOADING_ELLIPSIS': 'Loading...',
  'LOC_JS_MADE_SIMPLE': 'Localization for JavaScript made simple',
  LOCALIZING_JSX: 'Localizing JSX',
  LOCALIZING_ON_SERVER: 'Localizing on Server',
  'LOREM_IPSUM': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

  CREATING_A_LANG_SELECT_MENU: 'Creating a Language Selection Menu',

  'MONTH_0': 'January',
  'MONTH_1': 'February',
  'MONTH_2': 'March',
  'MONTH_3': 'April',
  'MONTH_4': 'May',
  'MONTH_5': 'June',
  'MONTH_6': 'July',
  'MONTH_7': 'August',
  'MONTH_8': 'September',
  'MONTH_9': 'October',
  'MONTH_10': 'November',
  'MONTH_11': 'December',
  'MONTH_YEAR': '{:month} {:year}',

  NESTED_LOCALIZING: 'Nested localizing',
  'NORMAL_SYNTAX': 'Normal syntax',

  'ONE_OF_PARAMS': ({ params }) => <>One of {params}</>,
  'OUTPUT': 'Output',
  'OR': 'Or',
  'ORIGINAL_BRACKET': '(Original)',

  'PARAMETER': 'Parameter',
  'PARAMETERS': 'Parameters',

  'QUICK_LINKS': 'Quick links',

  'REACT_KAWAII_PROMO_TEXT': ({ link }) => <>Like this cute image? Check out {link} for more.</>,
  'RETURNS': 'Returns',
  // 'REPO': 'Repo',

  'SOME_PARAMETER': 'Some parameter',
  'SWITCH_LANGUAGE': 'Switch language',
  'SWITCHING_LANGUAGES': 'Switching languages',
  'SWITCHING_BETWEEN_LANGUAGES': 'Switching between languages',
  'SETTING_UP': 'Setting up',

  // 'TRANSFORMATIONS': 'Transformations',
  'THE_QUICK_BROWN_FOX': 'The quick brown fox jumped over the fence.',
  'THIS_DOC_IS_UNAVAILABLE': 'This document is unavailable',
  THIS_ITEM_IS_AVAILABLE_UNDER_PATH: ({ path }) => <>This item is available as an import under {path}.</>,
  'TOTAL_DOWNLOADS': 'Total downloads',
  'TYPE': 'Type',

  'USAGE': 'Usage',
  'USAGE_OF_OTHER_API_UNCHANGED': 'Usage of other APIs remain unchanged',
  'USING_NPM': 'Using NPM',
  'USING_YARN': 'Using Yarn',

  'VIEW_ON_NPM': 'View on NPM',
  'VIEW_ON_GITHUB': 'View on GitHub',

  'WEB': 'Web',

  'YOU_NEED_IMPORT_AD_IF_USING_RN': ({ dect, add, rn }) => <>You need to import {dect} from {add} in {rn}</>,

  'YOUR_CODE_HERE': 'Your code here',

  // '': '',

}
