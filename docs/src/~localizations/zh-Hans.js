const React = require('react')

module.exports = {

  ADVANCED: '高级',
  ALTERNATIVE_SYNTAX: '另类输入模式',
  API_REFERENCES: 'API 参考',
  APP_BOUNDARY_ERROR_OCCURED: '内有故障。我们为此深感抱歉.',
  APPEARANCE_LIGHT: '日光模式',
  APPEARANCE_DARK: '黑暗模式',
  APPLY_CASINGS: '附加大/小写风格',
  APPLY_TRANSFORMATION: '附加转型功能',
  APPLYING_CASINGS_TO_YOUR_LOC_STR: '为你的翻译内容加上大/小写风格',
  APPLYING_TRANSFORMATION_TO_YOUR_LOC_STR: '为你的翻译内容加上转型功能',
  AUTOMATIC: '自动',

  BASIC_USAGE: '基本用法',
  BASICS: '基本',
  BUILDER: '建造词库',
  BY_ARRAY: '通过 Array',
  BY_OBJECT: '通过 Object',

  CASING: '大/小写风格',
  CASINGS: '大/小写风格',
  CHANGELOG: '更动历史',
  COPY: '拷贝',

  DICTIONARY: '词典',
  DOC_NEXT_PARAM: '上一项: %p ▶',
  DOC_NOT_FOUND: '此文件并不存在',
  DOC_PREV_PARAM: '◀ 下一项: %p',
  DOCS: '文档',
  DOCUMENTATION: '文档',

  DOC_BODY_ADDITIONALLY_USE_CAN_USE_AUTO_DETECT: ({ autoDetect }) => <>此外，你也可以使用 {autoDetect} 来让langutil 来帮你辨认用户电脑上的语言。</>,
  DOC_BODY_AS_YOU_BUILD_YOUR_PROJ: '一路上，你或许会发现要翻译的内容越来越多。也因此，我们建议你把翻译内容以语言分成不同的文件，然后在 index.js 里再把它们结合起来。',
  DOC_BODY_CODE_BELOW_SHOWS_SIMPLE_EXAMPLE_COLON: '以下是一个简单的例子：',
  DOC_BODY_IN_YOUR_DIRECTORY: '在你的程序的文件夹里, 运行一下的其中一个命令：',
  DOC_BODY_INSERT_PARAM_INTRO: '在某些情况之下，你可能会想在被翻译的内容加入一些参数。当然，单凭自己来做不是不可能的，不过这样会很费时。',
  DOC_BODY_LANGUTIL_NEEDS_TO_BE_INIT: '在使用 langutil 之前，你必须现提供一个词典并列出用户语言。',
  DOC_BODY_LANGUTIL_PROVIDE_TWO_MTD_OVERCOME_ISSUE: 'Langutil 提供两种方法来克服这个问题。',
  DOC_BODY_NOTE_DICT_LANG_KEYS_FORMAT: '词典的关键词必须以大写（UPPERCASE）写出来；语言代码必须以小写开始（例：\'zh\', \'zh-Hans\'）。',
  DOC_BODY_USE_SETLANG_TO_SWITCH_LANG: ({ setL }) => <>你可以使用 {setL} 来切换语言.</>,
  DOC_BODY_USE_LOC_TO_TRANSLATE: ({ loc }) => <>你可以使用 {loc} 来翻译你的文字内容.</>,
  DOC_BODY_SETTING_UP_DESC: '首先，你必须先设好一个词库。',
  DOC_BODY_SETTING_UP_STRUCT_SUGGESTION: '我们建议您依据以下的例子来配置词库的构造。',
  DOC_BODY_THEN_ADD_SOME_LOC: '随后，把翻译加进每一个语言文件里。',
  DOC_BODY_YOU_MAY_ADD_MORE_FILES: '你可以把更多其他语言的文件添加进来',

  DOCX_PRIMARY_LANG: 'zh-Hans',
  DOCX_PRIMARY_LANG_NAME: '中文（简体）',
  DOCX_SECONDARY_LANG: 'en',
  DOCX_SECONDARY_LANG_NAME: '英文',
  DOCX_NAME_1: '志梁',
  DOCX_NAME_2: '文芳',
  DOCX_HELLO_VALUE_PRIMARY: '哈咯',
  DOCX_HELLO_VALUE_SECONDARY: 'Hello',
  DOCX_PARAM_ARR_HELLO_NAME_RAW: '%%p，你好。',
  DOCX_PARAM_ARR_HELLO_NAME_VALUE: '%p，你好。',
  DOCX_PARAM_ARR_HELLO_NAME_2_RAW: '%%p、%%p，你们好。',
  DOCX_PARAM_ARR_HELLO_NAME_2_VALUE: '%p、%p，你们好。',
  DOCX_PARAM_OBJ_HELLO_NAME_RAW: '{::name1}，你好。',
  DOCX_PARAM_OBJ_HELLO_NAME_VALUE: '{:name1}，你好。',
  DOCX_PARAM_OBJ_HELLO_NAME_2_RAW: '{::name1}、{::name2}，你们好。',
  DOCX_PARAM_OBJ_HELLO_NAME_2_VALUE: '{:name1}、{:name2}，你们好。',
  DOCX_HELLO_WORLD_PRIMARY_VALUE: '哈咯世界',
  DOCX_HELLO_WORLD_SECONDARY_VALUE: 'Hello world',

  EXTERNAL_LINKS: '外部链接',

  FAQ: '常见问题',
  FAQ_TITLE_001: '在 React Native 里需要 linking 吗？',
  FAQ_TITLE_002: '为什么在 React Native 里被自动辨认语言和手机语言不同？',
  FAQ_TITLE_003: '我能够用当前设定以外的语言来做翻译吗？',
  FAQ_TITLE_004: '用了 setLanguage 之后页面需要刷新吗？',

  FOLDER_STRUCTURE: '文件夹构造',
  FOOTER_COPYRIGHT_YEAR_NAME: ' © {:year} {:name} 版权所有',

  GET_STARTED: '立即开始',

  HERES_HOW_IT_WORKS_NUTSHELL: '主要操作方式如下',
  HOME: '主页',
  HOW_TO_USE_API: '如何使用 `%p`',
  HOW_TO_USE_API_REACT: '如何使用 `%p` (React)',

  INITIALIZING: '初步设置',
  INSTALLATION: '安装',
  INSTALLATION_AND_SETUP: '安装和配备',
  INSERT_PARAMETERS: '加入参数',
  ITS_THAT_SIMPLE: '就这么简单！',

  LOADING_ELLIPSIS: '请稍等...',
  LOC_JS_MADE_SIMPLE: 'JavaScript 里的翻译过程从此变得简单',

  LANG_DISP_EN: '英文',
  LANG_DISP_JA: '日文',
  LANG_DISP_MS: '马来文',
  LANG_DISP_ZH_HANS: '中文（简体）',
  LANG_DISP_ZH_HANT: '中文（繁体）',

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
  OUTPUT: '结果',
  OR: '或',
  ORIGINAL_BRACKET: '（原文）',

  PARAMETER: '参数',
  PARAMETERS: '参数',

  QUICK_LINKS: '快速链接',

  REACT_KAWAII_PROMO_TEXT: ({ link }) => <>喜欢着可爱的照片吗? 你浏览 {link} 了解更多哦.</>,

  SETTING_UP: '配置',
  SOME_PARAMETER: '随便一个参数',
  SWITCH_LANGUAGE: '更换语言',
  SWITCHING_LANGUAGES: '更换语言',
  SWITCHING_BETWEEN_LANGUAGES: '切换语言',
  SYSTEM_DEFAULT: '系统默认',

  THE_QUICK_BROWN_FOX: '視野無限廣，窗外有藍天',
  THIS_DOC_IS_UNAVAILABLE: '此文件已无法被打开',
  TOTAL_DOWNLOADS: '下载总数',

  USAGE: '用法',
  USAGE_OF_OTHER_API_UNCHANGED: '其他 API 的用法保持不变',
  USING_NPM: '使用 NPM',
  USING_YARN: '使用 Yarn',

  VIEW_ON_NPM: '在 NPM 了解更多',
  VIEW_ON_GITHUB: '在 GitHub 上阅读',

  WEB: '网络',

  YOU_NEED_IMPORT_AD_IF_USING_RN: ({ dect, add, rn }) => <>在{rn}里，你必须从{add}import{dect}。</>,

  YOUR_CODE_HERE: '你的程序编码',

}