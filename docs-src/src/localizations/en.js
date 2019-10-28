const React = require('react')

module.exports = {
  'ADVANCED': 'Advanced',
  'ALTERNATIVE_SYNTAX': 'Alternative syntax',
  'API': 'API',

  'API_DESC_INIT': ({ setD, setL }) => <>Initialize langutil with a dictionary and language. Shorthand for {setD} and {setL}.</>,
  'API_DESC_SET_DICTIONARY': ({ init }) => <>Sets the dictionary. We encourage using {init} and not changing the contents of the dictionary in halfway. Unless the dictionary has been splitted up into sections for lazy loading.</>,
  'API_DESC_SET_LANGUAGE': 'Sets the language.',
  'API_PARAM_DICT': 'The object containing all localizations.',
  'API_PARAM_LANG': 'The language to use.',
  'API_PARAM_DETECTOR': ({ auto }) => <>A langutil built-in function, pass {auto} into this parameter to allow auto-language detection.</>,

  'APP_BOUNDARY_ERROR_OCCURED': 'We\'re sorry, an error occured.',
  'APPLY_CASINGS': 'Apply casings',
  'APPLY_TRANSFORMATION': 'Apply transformation',

  'BASIC_USAGE': 'Basic usage',
  'BASICS': 'Basics',
  'BUILDER': 'Builder',

  'CASING': 'Casing',
  'CASINGS': 'Casings',
  'CHANGELOG': 'Changelog',
  'COPY': 'Copy',

  'DEFAULT_VALUE': 'Default value',
  'DESCRIPTION': 'Description',

  'DOC_BODY_ADDITIONALLY_USE_CAN_USE_AUTO_DETECT': ({ autoDetect }) => <>Additionally, you can use {autoDetect} to let langutil figure out what language the device using.</>,
  'DOC_BODY_AS_YOU_BUILD_YOUR_PROJ': 'As you build your project, you will realize that amount of localizations begin to increase exponentially, if not, by a lot! It is because of that, it is better to split localizations into different files then combined them in an index file.',
  'DOC_BODY_BELOW_IS_COMPLETE_LIST_OF_CASINGS': 'Below is a complete list of the casing styles that langutil provides.',
  'DOC_BODY_BY_PASSING_IN_ARRAY_AS_OBJECT': ({ k: key }) => <>By passing in an object as the second parameter, langutil will substitute each occurence of every key in the object it finds in the localized string. This is done in the format of {key}.</>,
  'DOC_BODY_BY_PASSING_IN_ARRAY_AS_PARAM': ({ p }) => <>By passing in an array as the second parameter, langutil will substitute each occurence of {p} sequencially.</>,
  'DOC_BODY_CODE_BELOW_SHOWS_SIMPLE_EXAMPLE_COLON': 'The code below shows a simple example of that:',
  'DOC_BODY_TO_DISPLAY_P_IN_LOC': ({ p, escapedP }) => <>Note: To display {p} in your localizations, escape it with {escapedP}.</>,
  'DOC_BODY_IF_THE_BUILT_IN_CSTYLES_X_ENOUGH': 'If the built-in casing styles aren\'t enough, you can add your own transformation to the localized value.',
  'DOC_BODY_IN_YOUR_DIRECTORY': 'In your project\'s directory, run either of the commands below:',
  'DOC_BODY_INSERT_PARAM_INTRO': 'In some cases, you might want to insert values into your localizations. While it is do-able by using string concatenation or replacing a marker in the localized string, it would be tedious to repeat this for such ocassions every time.',
  'DOC_BODY_LANGUTIL_ALSO_ALLOW_STYLE_LOC': <>Langutil also allows you to styles localizations with different casings... just in <i style={{ opacity: 0.75 }}>case</i>.</>,
  'DOC_BODY_LANGUTIL_NEEDS_TO_BE_INIT': 'Langutil needs to be initialized with a dictionary and language before it can be used.',
  'DOC_BODY_LANGUTIL_PROVIDE_TWO_MTD_OVERCOME_ISSUE': 'Langutil provides two methods to overcome this issue.',
  'DOC_BODY_SETTING_UP_DESC': 'Before you start, you will need to setup a dictionary first.',
  'DOC_BODY_SETTING_UP_STRUCT_SUGGESTION': 'We would suggest you to structure your dictionary according to the example below.',
  'DOC_BODY_THEN_ADD_SOME_LOC': 'Then add some localization into the language files.',
  'DOC_BODY_TO_DISPLAY_KEY_IN_LOC': ({ k1, k2 }) => <>To display {k1} in your localizations, escape it with {k2}.</>,
  'DOC_BODY_USE_SETLANG_TO_SWITCH_LANG': ({ setL }) => <>Use {setL} to switch between languages.</>,
  'DOC_BODY_USE_LOC_TO_TRANSLATE': ({ loc }) => <>Use {loc} to translate your content.</>,
  'DOC_BODY_YOU_MAY_ADD_MORE_FILES': 'You may add more files for other languages',

  // 'DOC_BODY_': '',

  'DOC_EXAMPLE_PRIMARY_LANG': 'en',
  'DOC_EXAMPLE_SECONDARY_LANG': 'zh',
  'DOC_EXAMPLE_NAME_1': 'John',
  'DOC_EXAMPLE_NAME_2': 'Jane',
  'DOC_EXAMPLE_PARAM_ARR_HELLO_NAME': 'Hello, %%p.',
  'DOC_EXAMPLE_PARAM_ARR_HELLO_NAME_2': 'Hello, %%p and %%p.',
  'DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME': 'Hello, {::name1}.',
  'DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_2': 'Hello, {::name1} and {::name2}.',

  'DOC_NEXT_PARAM': 'Next: %p ▶',
  'DOC_PREV_PARAM': '◀ Prev: %p',
  'DOC_UNAVAILABLE': 'Document unavailable',
  'DOCS': 'Docs',
  'DYNAMIC_LOCALIZATIONS': 'Dynamic localizations',

  'FOOTER_COPYRIGHT': 'Copyright © %p chin98edwin',

  'GET_STARTED': 'Get started',

  'HELLO_WORLD': 'Hello world',
  'HELLO_WORLD_SECONDARY': '哈咯世界',
  'HERES_HOW_IT_WORKS_NUTSHELL': 'Here\'s how it works in a nutshell',

  'ITS_THAT_SIMPLE': 'It\'s that simple!',
  'IN_YOUR_OWN_FILE_COLON': 'In your own file:',
  'INITIALIZING': 'Initializing',
  'INSERT_PARAMETERS': 'Insert parameters',
  'INSTALLATION': 'Installation',
  'INSTALLATION_AND_SETUP': 'Installation & Setup',

  'LIKE_THIS_KAWAII_IMG': ({ link }) => <>Like this cute image? Check out {link} for more.</>,
  'LOADING_ELLIPSIS': 'Loading...',
  'LOC_JS_MADE_SIMPLE': 'Localization for JavaScript made simple',
  'LOCALIZING_JSX': 'Localizing JSX',


  'LOREM_IPSUM': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

  'OUTPUT': 'Output',
  'OUTPUT_HELLO_WORLD': 'Output: Hello world',
  'ORIGINAL_BRACKET': '(Original)',

  'PARAMETER': 'Parameter',
  'PARAMETERS': 'Parameters',

  'SWITCH_LANGUAGE': 'Switch language',
  'SWITCHING_LANGUAGES': 'Switching languages',
  'SETTING_UP': 'Setting up',

  // 'TRANSFORMATIONS': 'Transformations',
  'THE_QUICK_BROWN_FOX': 'The quick brown fox jumped over the fence.',
  'TYPE': 'Type',

  'USAGE': 'Usage',
  'USING_NPM': 'Using NPM',
  'USING_YARN': 'Using Yarn',

  'VIEW_IN_GITHUB': 'View in GitHub',

  // '': '',
}
