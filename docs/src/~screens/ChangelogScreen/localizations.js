import React from 'react'
import { Code } from '~components/document'

export default {
  // en: {
  //   'CHANGELOG_ADAPTED_SYNTAX_FOR_COMMONJS': 'Adapted syntax for CommonJS.',
  //   'CHANGELOG_ADD_QUICKFIX_TO_DOC': 'Added some quick fixes to the documentation.',
  //   'CHANGELOG_ADD_UPDATE_HISTORY_TO_README': 'Added Update History to Readme.',
  //   'CHANGELOG_ADDED_84_NEW_LANG': ({ langs }) => <>Added 84 new languages to auto detection algorithm: {langs}.</>,
  //   'CHANGELOG_ADDED_AUTO_SUGGESTIONS': ({ init, setL }) => <>Added auto suggestions from the Language List to {init} and {setL}.</>,
  //   'CHANGELOG_ADDED_CHINESE_CODE': ({ c }) => <>Added the {c} option to the Language List (not simplified ot traditional specific).</>,
  //   'CHANGELOG_ADDED_DOCS_ABT_DICT': 'Added docs about the Dictionary.',
  //   'CHANGELOG_ADDED_HIDELOGS': ({ hide }) => <>Added a new {hide} function.</>,
  //   'CHANGELOG_ADDED_NEW_OPTION_LOC_WITH': ({ sc, cg, lw }) => <>Added new option {sc} for the {cg} parameter in {lw}.</>,
  //   'CHANGELOG_ADDITIONS_FOR_REACT': ({ locz }) => <>Additions for React: <ul><li>New {locz} component that acts as a wrapper for HTML or React elements.</li></ul></>,
  //   'CHANGELOG_ASSIGN_ANYTHING_TO_LOC_VALUE': 'You can now assign anything to your localized value, for instance, you might want to have a different logo image for each language if you have a tagline in your logo.',
  //   'CHANGELOG_AUTO_DETECT_SPLITTED': ({ na }) => <>Automatic language detection for React Native is no longer included in the core to avoid conflict with webpack config in some cases. It has been splitted out as a function and can be imported from {na}.</>,
  //   'CHANGELOG_AUTO_DETECT_SUPPORT_RN': 'Auto language detection is now supported in React Native.',
  //   'CHANGELOG_CAN_DEFINE_DICT_BY_KEYWORDS': 'You can now define dictionaries by Keywords.',
  //   'CHANGELOG_CHG_RN_DEPENDENCY_TYPE': ({ rn }) => <>Changed {rn} from optional dependency to peer dependency.</>,

  //   'CHANGELOG_CREATION_OF_LANGUTIL': 'Creation of langutil with 3 core functions and the ability to auto-detect up to 128 languages.',
  //   'CHANGELOG_DOC_UPDATED_REDUCE_SIZE': 'Documentations have been updated to reduce package size.',
  //   'CHANGELOG_EMERGENCY_FIX_RN_AUTO_DETECT_FAIL': 'Emergency fix for a bug where auto detect in v2.2.0 fails for React Native apps.',
  //   'CHANGELOG_EXAMPLES_REMOVED_FROM_DOC': 'Examples have been removed from inline documentation as more detailed ones are already available in this readme file.',
  //   'CHANGELOG_FIXED_ALWAYS_MINIFIED': 'Fixed the bug where langutil will always launch in minified mode by default.',
  //   'CHANGELOG_FIXED_BUG_AUTO_DETECT': 'Fixed a bug with auto detect.',
  //   'CHANGELOG_FIXED_BUG_KEYWORD_REC_AS_INVALID': 'Fixed a bug where certain valid keywords are recognized as invalid.',
  //   'CHANGELOG_FIXED_FALSE_WARNINGS_PARAMS': 'Fixed an issue where false warnings about insufficient parameters are shown.',
  //   'CHANGELOG_FIXED_FALSE_WARNINGS_PARAMS_FOR_SURE': 'Fixed the issue where false warnings about insufficient parameters are shown. For sure!',
  //   'CHANGELOG_FIXED_INCORRECT_ESCAPER_SWAP': ({ p, q, p2 }) => <>Fixed the issue where the {q}s in localization will be replaced with {p}s. Previously, the algorithm temporarily swapped {p2} with {q} to allow escaping {p}.</>,
  //   'CHANGELOG_FIXED_ISSUE_ALREADY_WARNED_STILL_SHOW_UP': 'Fixed issue where already-warned keywords still show up in group warnings.',
  //   'CHANGELOG_FIXED_ISSUE_THIS_LOCALIZE_NOT_FN': 'Fixed an issue where you may encounter an error with a message like "this.localize is not a function".',
  //   'CHANGELOG_FIXED_PROD_BUILD_FAILS_IF_LOG_SHOWN': 'Fixed a critical bug where there production build fails if logs are shown.',
  //   'CHANGELOG_GROUPED_WARNINGS_FOR_MISSING_LOC': 'Grouped warnings for missing localizations.',
  //   'CHANGELOG_HOTFIX_FOR_TS': 'Hot fix for a problem in TypeScript.',
  //   'CHANGELOG_HIDELOGS_WILL_BE_DEPRECATED': ({ hL }) => <>{hL} will be deprecated in future versions in favor of a more flexible method.</>,
  //   'CHANGELOG_INTERNAL_OPTIMIZATIONS_PERF_DEBUG_XP': 'Internal optimization for better performance and debugging experience.',
  //   'CHANGELOG_LANG_TABLE_MADE_COMPACT': 'The Language List table has been made more compact. Native names of the languages have been removed since a few are not able to displayed properly on most devices unless additional fonts are installed.',
  //   'CHANGELOG_LIST_FOLLOWS_ISO_CODES': 'Language list now follows ISO language codes but the old convention that langutil 1.x.x still works.',
  //   'CHANGELOG_LOCZ_WILL_UPDATE_ITSELF': ({ locz, setL }) => <>{locz} will update itself when {setL} is called.</>,
  //   'CHANGELOG_MINOR_PERF_FIXES': 'Minor performance fixes.',
  //   'CHANGELOG_NEW_ALLOW_EMPTY': ({ aEty }) => <>New {aEty} parameter to suppress warnings about empty keywords.</>,
  //   'CHANGELOG_NEW_CREATEKEY_FN': ({ ck }) => <>There is a new {ck} method to help you with that.</>,
  //   'CHANGELOG_NEW_GET_DEF_LANGS': ({ gdl }) => <>Added new method {gdl} which allows you to access the list of languages defined in the dictionary during runtime.</>,
  //   'CHANGELOG_NEW_IS_AUTO_FN': ({ a }) => <>New {a} function to know whether autoDetection is set to true.</>,
  //   'CHANGELOG_NEW_LOC_WITH_FN': ({ lw }) => <>Added new method {lw} for more powerful localizing capabilities: Apply <b>casing styles</b> and <b>custom transformations</b> to the localized value! 🦄</>,
  //   'CHANGELOG_NEW_LOGS_FOCUS_FN': ({ f }) => <>New {f} function allows to you see langutil logs in a specific block of code while hiding the rest, that is, only necessary if the logs were already hidden prior to that block.</>,
  //   'CHANGELOG_PASS_CUSTOM_COMP_VIA_RENDER_AS': ({ r }) => <>You can pass in custom components via the {r} prop in React Native like how it can be done in React.</>,
  //   'CHANGELOG_PERF_OPT_FOR_PROD_MODE': 'Performance optimization for production mode.',
  //   'CHANGELOG_SHOWLOG_WILL_BE_REPLACED_BY': ({ showL, lHide, lShow }) => <>{showL} (still usable) will be replaced by {lHide} and {lShow}.</>,
  //   'CHANGELOG_SILENCED_UNNECESSARY_WARN_IN_LOC_WITH': ({ cg, tr, lw }) => <>Silenced the unnecessary warning messages when {cg} and {tr} parameters in {lw} are not defined as they are optional.</>,
  //   'CHANGELOG_SNOOZE_DICT_INSP_TILL_GIVEN_DATE': 'Snooze dictionary inspection until a given date.',
  //   'CHANGELOG_SUPPORT_TYPINGS': 'Added support for typings',
  //   'CHANGELOG_THE_REPO_NOW_INCL_TEMPLATE_DICT': ({ repo }) => <>The {repo} now includes template dictionaries, some of the most commonly used words are readily translated. More translations will be added over time.</>,
  //   'CHANGELOG_WILL_LOOK_FOR_ALT_LANG_IF_AUTO_UNAVAILABLE': <>In case the automatically detected language is not supported in the dictionary, langutil look for an alternative language from the dictionary. For example, if your dictionary contains localizations for <Code>'en'</Code>, but the automatically detected language is <Code>'en-us'</Code>, langutil will set the language to <Code>'en'</Code>.</>,
  // }

  // General
  CHANGELOG_CODE_OPTIMIZATIONS: {
    en: 'Code optimizations.',
  },

  // 3.2.0
  // CHANGELOG_3_2_0_S01: {
  //   en: '',
  // },
  // CHANGELOG_3_2_0_S02: {
  //   en: '',
  // },
  // CHANGELOG_3_2_0_S03: {
  //   en: '',
  // },

  // 3.1.3
  CHANGELOG_3_1_3_S01: {
    en: 'Minor patch for auto-detection in React Native.',
  },

  // 3.1.2
  CHANGELOG_3_1_2_S01: {
    en: 'Fixed an issue with grouped warnings where missing localizations from different languages are categorized under one language.',
  },
  CHANGELOG_3_1_1_S01: {
    en: ({ m }) => <>New {m} function that allows you to explicitly localize a keyword into a language other than the one currently set.</>,
  },

  // 3.1.1
  CHANGELOG_3_1_1_STR_2: {
    en: 'Refined auto-detection algorithm.',
  },

  // 3.1.0
  CHANGELOG_3_1_0_S01: {
    en: 'Errors are thrown upon critical situations such as invalid parameter.',
  },
  CHANGELOG_3_1_0_S02: {
    en: ({ wl, ls }) => <>{wl} now passes a prop called {ls}.</>,
  },
  CHANGELOG_3_1_0_S03: {
    en: ({ ul, ls }) => <>New {ul} hook, contents of {ls} are also accessible from this hook.</>,
  },

  // 3.0.2
  CHANGELOG_3_0_2_S01: {
    en: 'Added back legacy compensation for old dictionary structure where it is arranged by keywords as an array.',
  },
  CHANGELOG_3_0_2_S02: {
    en: 'Warnings for params (object) that are not tally will now be shown.',
  },
  CHANGELOG_3_0_2_S03: {
    en: ({ add }) => <>Fixed incorrect typing in {add}.</>
  },

  // 3.0.1
  CHANGELOG_3_0_1_S01: {
    en: ({ ad }) => <>Fixed incorrect function name for {ad} in Native Additions.</>
  },
  CHANGELOG_3_0_1_S02: {
    en: ({ p, pp, k, kk }) => <>Fixed issue where escaped placeholders do not level down if no param array or objects are provided ({pp} → {p} and {kk} → {k}).</>
  },
  CHANGELOG_3_0_1_S03: {
    en: 'When applying casings, ALLCAPPED words and Names will be preserved.',
  },
  CHANGELOG_3_0_1_S04: {
    en: 'Complete removal of deprecated APIs set to be in March 2020.',
  },

  // 3.0.0
  CHANGELOG_3_0_0_S01: {
    en: ({ loc }) => <>Localizing function is now simplified to only one function: {loc}.</>,
  },
  CHANGELOG_3_0_0_S02: {
    en: ({ wl, locz }) => <>New {wl} higher-order component in favor of {locz}.</>,
  },
  CHANGELOG_3_0_0_S03: {
    en: ({ ad }) => <>New {ad} implementation.</>,
  },
  CHANGELOG_3_0_0_S04: {
    en: 'Dictionary inspection now do not happen by default in favor of performance.',
  },
  CHANGELOG_3_0_0_S05: {
    en: 'Structure your dictionary by keywords or language in the shape of an object, langutil will automatically determine which method you\'re using.',
  },
  CHANGELOG_3_0_0_S06: {
    en: ({ sd }) => <>New {sd} function in case you want to lazy load your localizations.</>,
  },


}
