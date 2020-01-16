import React from 'react'
import { Code } from '~components/document'

export default {

  // General
  CHANGELOG_CODE_OPTIMIZATIONS: {
    en: 'Code optimizations.',
  },
  CHANGELOG_BRACKET_WILL_BE_UPDATED_SOON: {
    en: '(Will be updated soon)'
  },
  CHANGELOG_ADD_QUICKFIX_TO_DOC: {
    en: 'Added some quick fixes to the documentation.',
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

  // 2.4.0
  CHANGELOG_2_4_0_S01: {
    en: ({ locz, setL }) => <>{locz} will update itself when {setL} is called.</>,
  },
  CHANGELOG_2_4_0_S02: {
    en: ({ aEty }) => <>New {aEty} parameter to suppress warnings about empty keywords.</>
  },
  CHANGELOG_2_4_0_S03: {
    en: 'Snooze dictionary inspection until a given date.',
  },

  // 2.3.3
  CHANGELOG_2_3_3_S01: {
    en: 'Fixed issue where already-warned keywords still show up in group warnings.',
  },

  // 2.3.2
  CHANGELOG_2_3_2_S01: {
    en: 'Grouped warnings for missing localizations.',
  },
  CHANGELOG_2_3_2_S02: {
    en: ({ r }) => <>You can pass in custom components via the {r} prop in React Native like how it can be done in React.</>,
  },

  // 2.3.1
  CHANGELOG_2_3_1_S01: {
    en: 'Hot fix for a problem in TypeScript.',
  },

  // 2.3.0
  CHANGELOG_2_3_0_S01: {
    en: 'Internal optimization for better performance and debugging experience.',
  },
  CHANGELOG_2_3_0_S02: {
    en: ({ na }) => <>Automatic language detection for React Native is no longer included in the core to avoid conflict with webpack config in some cases. It has been splitted out as a function and can be imported from {na}.</>,
  },
  CHANGELOG_2_3_0_S03: {
    en: ({ repo }) => <>The {repo} now includes template dictionaries, some of the most commonly used words are readily translated. More translations will be added over time.</>,
  },
  CHANGELOG_2_3_0_S04: {
    en: ({ locz }) => <>Additions for React: <ul><li>New {locz} component that acts as a wrapper for HTML or React elements.</li></ul></>,
  },

  // 2.2.4
  CHANGELOG_2_2_4_S01: {
    en: 'Added docs about the Dictionary.',
  },
  CHANGELOG_2_2_4_S02: {
    en: ({ rn }) => <>Changed {rn} from optional dependency to peer dependency.</>,
  },

  // 2.2.3
  CHANGELOG_2_2_3_S01: {
    en: 'Fixed a bug with auto detect.',
  },

  // 2.2.2
  CHANGELOG_2_2_2_S01: {
    en: 'Fixed the issue where false warnings about insufficient parameters are shown. For sure!',
  },

  // 2.2.1
  CHANGELOG_2_2_1_S01: {
    en: 'Emergency fix for a bug where auto detect in v2.2.0 fails for React Native apps.',
  },

  // 2.2.0
  CHANGELOG_2_2_0_S01: {
    en: <>In case the automatically detected language is not supported in the dictionary, langutil look for an alternative language from the dictionary. For example, if your dictionary contains localizations for <Code>'en'</Code>, but the automatically detected language is <Code>'en-us'</Code>, langutil will set the language to <Code>'en'</Code>.</>,
  },
  CHANGELOG_2_2_0_S02: {
    en: 'Fixed an issue where false warnings about insufficient parameters are shown.',
  },
  CHANGELOG_2_2_0_S03: {
    en: ({ f }) => <>New {f} function allows to you see langutil logs in a specific block of code while hiding the rest, that is, only necessary if the logs were already hidden prior to that block.</>,
  },
  CHANGELOG_2_2_0_S04: {
    en: ({ a }) => <>New {a} function to know whether autoDetection is set to true.</>,
  },

  // 2.1.3
  CHANGELOG_2_1_3_S01: {
    en: ({ cg, tr, lw }) => <>Silenced the unnecessary warning messages when {cg} and {tr} parameters in {lw} are not defined as they are optional.</>,
  },
  CHANGELOG_2_1_3_S02: {
    en: 'Auto language detection is now supported in React Native.',
  },
  CHANGELOG_2_1_3_S03: {
    en: 'Documentations have been updated to reduce package size.',
  },
  CHANGELOG_2_1_3_S04: {
    en: 'Fixed the bug where langutil will always launch in minified mode by default.',
  },

  // 2.1.2
  CHANGELOG_2_1_2_S01: {
    en: 'Fixed an issue where you may encounter an error with a message like "this.localize is not a function".',
  },

  // 2.1.1
  CHANGELOG_2_1_1_S02: {
    en: ({ sc, cg, lw }) => <>Added new option {sc} for the {cg} parameter in {lw}.</>,
  },

  // 2.1.0
  CHANGELOG_2_1_0_S01: {
    en: ({ lw }) => <>Added new method {lw} for more powerful localizing capabilities: Apply <b>casing styles</b> and <b>custom transformations</b> to the localized value! 🦄</>,
  },
  CHANGELOG_2_1_0_S02: {
    en: ({ gdl }) => <>Added new method {gdl} which allows you to access the list of languages defined in the dictionary during runtime.</>,
  },
  CHANGELOG_2_1_0_S03: {
    en: 'You can now assign anything to your localized value, for instance, you might want to have a different logo image for each language if you have a tagline in your logo.',
  },
  CHANGELOG_2_1_0_S04: {
    en: 'Fixed a critical bug where there production build fails if logs are shown.',
  },

  // 2.0.0
  CHANGELOG_2_0_0_S01: {
    en: 'You can now define dictionaries by Keywords.',
  },
  CHANGELOG_2_0_0_S02: {
    en: ({ ck }) => <>There is a new {ck} method to help you with that.</>,
  },
  CHANGELOG_2_0_0_S03: {
    en: 'Language list now follows ISO language codes but the old convention that langutil 1.x.x still works.',
  },
  CHANGELOG_2_0_0_S04: {
    en: 'Added support for typings',
  },

  // 1.1.4
  CHANGELOG_1_1_4_S01: {
    en: 'Minor performance fixes.',
  },

  // 1.1.3
  CHANGELOG_1_1_3_S01: {
    en: 'Fixed a bug where certain valid keywords are recognized as invalid.',
  },

  // 1.1.2
  CHANGELOG_1_1_2_S01: {
    en: 'Performance optimization for production mode.',
  },

  // 1.1.0
  CHANGELOG_1_1_0_S01: {
    en: ({ showL, lHide, lShow }) => <>{showL} (still usable) will be replaced by {lHide} and {lShow}.</>,
  },
  CHANGELOG_1_1_0_S02: {
    en: ({ langs }) => <>Added 84 new languages to auto detection algorithm: {langs}.</>
  },

  // 1.0.3
  CHANGELOG_1_0_3_S01: {
    en: ({ p, q, p2 }) => <>Fixed the issue where the {q}s in localization will be replaced with {p}s. Previously, the algorithm temporarily swapped {p2} with {q} to allow escaping {p}.</>,
  },
  CHANGELOG_1_0_3_S02: {
    en: 'Adapted syntax for CommonJS.',
  },
  CHANGELOG_1_0_3_S03: {
    en: ({ init, setL }) => <>Added auto suggestions from the Language List to {init} and {setL}.</>,
  },
  CHANGELOG_1_0_3_S04: {
    en: ({ c }) => <>Added the {c} option to the Language List (not simplified ot traditional specific).</>,
  },
  CHANGELOG_1_0_3_S05: {
    en: 'Examples have been removed from inline documentation as more detailed ones are already available in this readme file.',
  },
  CHANGELOG_1_0_3_S06: {
    en: ({ hL }) => <>{hL} will be deprecated in future versions in favor of a more flexible method.</>,
  },

  // 1.0.2
  CHANGELOG_1_0_2_S01: {
    en: 'Added Update History to Readme.',
  },
  CHANGELOG_1_0_2_S02: {
    en: 'The Language List table has been made more compact. Native names of the languages have been removed since a few are not able to displayed properly on most devices unless additional fonts are installed.',
  },

  // 1.0.1
  CHANGELOG_1_0_1_S01: {
    en: ({ hide }) => <>Added a new {hide} function.</>,
  },

  // 1.0.0
  CHANGELOG_1_0_0_S01: {
    en: 'Creation of langutil with 3 core functions and the ability to auto-detect up to 128 languages.',
  },

}
