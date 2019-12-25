const React = require('react')

module.exports = {

  ADVANCED: '高級',
  ALTERNATIVE_SYNTAX: '另類輸入模式',
  API_REFERENCES: 'API 參考',
  APP_BOUNDARY_ERROR_OCCURED: '內有故障。我們為此深感抱歉.',
  APPEARANCE_LIGHT: '日光模式',
  APPEARANCE_DARK: '黑暗模式',
  APPLY_CASINGS: '附加大/小寫風格',
  APPLY_TRANSFORMATION: '附加轉型功能',
  APPLYING_CASINGS_TO_YOUR_LOC_STR: '為你的翻譯內容加上大/小寫風格',
  APPLYING_TRANSFORMATION_TO_YOUR_LOC_STR: '為你的翻譯內容加上轉型功能',
  AUTOMATIC: '自動',

  BASIC_USAGE: '基本用法',
  BASICS: '基本',
  BUILDER: '建造詞庫',
  BY_ARRAY: '通過 Array',
  BY_OBJECT: '通過 Object',

  CASING: '大/小寫風格',
  CASINGS: '大/小寫風格',
  CHANGELOG: '更動歷史',
  COPY: '拷貝',

  DICTIONARY: '詞典',
  DOC_NEXT_PARAM: '上一項: %p ▶',
  DOC_NOT_FOUND: '此文件並不存在',
  DOC_PREV_PARAM: '◀ 下一項: %p',
  DOCS: '文檔',
  DOCUMENTATION: '文檔',

  DOC_BODY_ADDITIONALLY_USE_CAN_USE_AUTO_DETECT: ({ autoDetect }) => <>此外，你也可以使用 {autoDetect} 來讓langutil 來幫你辨認用戶電腦上的語言。</>,
  DOC_BODY_AS_YOU_BUILD_YOUR_PROJ: '一路上，你或許會發現要翻譯的內容越來越多。也因此，我們建議你把翻譯內容以語言分成不同的文件，然後在 index.js 里再把它們結合起來。',
  DOC_BODY_CODE_BELOW_SHOWS_SIMPLE_EXAMPLE_COLON: '以下是一個簡單的例子：',
  DOC_BODY_IN_YOUR_DIRECTORY: '在你的程序的文件夾里, 運行一下的其中一個命令：',
  DOC_BODY_INSERT_PARAM_INTRO: '在某些情況之下，你可能會想在被翻譯的內容加入一些參數。當然，單憑自己來做不是不可能的，不過這樣會很費時。',
  DOC_BODY_LANGUTIL_NEEDS_TO_BE_INIT: '在使用 langutil 之前，你必須現提供一個詞典並列出用戶語言。',
  DOC_BODY_LANGUTIL_PROVIDE_TWO_MTD_OVERCOME_ISSUE: 'Langutil 提供兩種方法來克服這個問題。',
  DOC_BODY_NOTE_DICT_LANG_KEYS_FORMAT: '詞典的關鍵詞必須以大寫（UPPERCASE）寫出來；語言代碼必須以小寫開始（例：\'zh\', \'zh-Hant\'）。',
  DOC_BODY_USE_SETLANG_TO_SWITCH_LANG: ({ setL }) => <>你可以使用 {setL} 來切換語言.</>,
  DOC_BODY_USE_LOC_TO_TRANSLATE: ({ loc }) => <>你可以使用 {loc} 來翻譯你的文字內容.</>,
  DOC_BODY_SETTING_UP_DESC: '首先，你必須先設好一個詞庫。',
  DOC_BODY_SETTING_UP_STRUCT_SUGGESTION: '我們建議您依據以下的例子來配置詞庫的構造。',
  DOC_BODY_THEN_ADD_SOME_LOC: '隨後，把翻譯加進每一個語言文件里。',
  DOC_BODY_YOU_MAY_ADD_MORE_FILES: '你可以把更多其他語言的文件添加進來',

  DOCX_PRIMARY_LANG: 'zh-Hant',
  DOCX_PRIMARY_LANG_NAME: '中文（繁體）',
  DOCX_SECONDARY_LANG: 'en',
  DOCX_SECONDARY_LANG_NAME: '英文',
  DOCX_NAME_1: '志梁',
  DOCX_NAME_2: '文芳',
  DOCX_HELLO_VALUE_PRIMARY: '哈咯',
  DOCX_HELLO_VALUE_SECONDARY: 'Hello',
  DOCX_PARAM_ARR_HELLO_NAME_RAW: '%%p，你好。',
  DOCX_PARAM_ARR_HELLO_NAME_VALUE: '%p，你好。',
  DOCX_PARAM_ARR_HELLO_NAME_2_RAW: '%%p、%%p，你們好。',
  DOCX_PARAM_ARR_HELLO_NAME_2_VALUE: '%p、%p，你們好。',
  DOCX_PARAM_OBJ_HELLO_NAME_RAW: '{::name1}，你好。',
  DOCX_PARAM_OBJ_HELLO_NAME_VALUE: '{:name1}，你好。',
  DOCX_PARAM_OBJ_HELLO_NAME_2_RAW: '{::name1}、{::name2}，你們好。',
  DOCX_PARAM_OBJ_HELLO_NAME_2_VALUE: '{:name1}、{:name2}，你們好。',
  DOCX_HELLO_WORLD_PRIMARY_VALUE: '哈咯世界',
  DOCX_HELLO_WORLD_SECONDARY_VALUE: 'Hello world',

  EXTERNAL_LINKS: '外部鏈接',

  FAQ: '常見問題',
  FAQ_TITLE_001: '在 React Native 里需要 linking 嗎？',
  FAQ_TITLE_002: '為什麼在 React Native 里被自動辨認語言和手機語言不同？',
  FAQ_TITLE_003: '我能夠用當前設定以外的語言來做翻譯嗎？',
  FAQ_TITLE_004: '用了 setLanguage 之後頁面需要刷新嗎？',

  FOLDER_STRUCTURE: '文件夾構造',
  FOOTER_COPYRIGHT_YEAR_NAME: ' © {:year} {:name} 版權所有',

  GET_STARTED: '立即開始',

  HERES_HOW_IT_WORKS_NUTSHELL: '主要操作方式如下',
  HOME: '主頁',
  HOW_TO_USE_API: '如何使用 `%p`',
  HOW_TO_USE_API_REACT: '如何使用 `%p` (React)',

  INITIALIZING: '初步設置',
  INSTALLATION: '安裝',
  INSTALLATION_AND_SETUP: '安裝和配備',
  INSERT_PARAMETERS: '加入參數',
  ITS_THAT_SIMPLE: '就這麼簡單！',

  LOADING_ELLIPSIS: '請稍等...',
  LOC_JS_MADE_SIMPLE: 'JavaScript 里的翻譯過程從此變得簡單',

  LANG_DISP_EN: '英文',
  LANG_DISP_JA: '日文',
  LANG_DISP_MS: '馬來文',
  LANG_DISP_ZH_HANS: '中文（簡體）',
  LANG_DISP_ZH_HANT: '中文（繁體）',

  MONTH_0: '1月',
  MONTH_1: '2月',
  MONTH_2: '3月',
  MONTH_3: '4月',
  MONTH_4: '5月',
  MONTH_5: '6月',
  MONTH_6: '7月',
  MONTH_7: '8月',
  MONTH_8: '9月',
  MONTH_9: '10月',
  MONTH_10: '11月',
  MONTH_11: '12月',
  MONTH_YEAR: '{:year}年 {:month}月',

  ONE_OF_PARAMS: ({ params }) => <>{params} 之一</>,
  OUTPUT: '結果',
  OR: '或',
  ORIGINAL_BRACKET: '（原文）',

  PARAMETER: '參數',
  PARAMETERS: '參數',

  QUICK_LINKS: '快速鏈接',

  REACT_KAWAII_PROMO_TEXT: ({ link }) => <>喜歡著可愛的照片嗎? 你瀏覽 {link} 瞭解更多哦.</>,

  SETTING_UP: '配置',
  SOME_PARAMETER: '隨便一個參數',
  SWITCH_LANGUAGE: '更換語言',
  SWITCHING_LANGUAGES: '更換語言',
  SWITCHING_BETWEEN_LANGUAGES: '切換語言',
  SYSTEM_DEFAULT: '系統默認',

  THE_QUICK_BROWN_FOX: '視野無限廣，窗外有藍天',
  THIS_DOC_IS_UNAVAILABLE: '此文件已無法被打開',
  TOTAL_DOWNLOADS: '下載總數',

  USAGE: '用法',
  USAGE_OF_OTHER_API_UNCHANGED: '其他 API 的用法保持不變',
  USING_NPM: '使用 NPM',
  USING_YARN: '使用 Yarn',

  VIEW_ON_NPM: '在 NPM 瞭解更多',
  VIEW_ON_GITHUB: '在 GitHub 上閱讀',

  WEB: '網絡',

  YOU_NEED_IMPORT_AD_IF_USING_RN: ({ dect, add, rn }) => <>在{rn}里，你必須從{add}import{dect}。</>,

  YOUR_CODE_HERE: '你的程序編碼',

}
