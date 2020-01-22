export default {
  FAQ_TITLE_002: {
    en: 'Why is auto detection detecting the wrong language in React Native?',
    ms: 'Mengapa \'auto detect\' memulangkan bahasa yang salah dalam React Native?',
    'zh-Hans': '为什么在 React Native 里被自动辨认语言和手机语言不同？',
    'zh-Hant': '為什麼在 React Native 里被自動辨認語言和手機語言不同？',
  },
  FAQ_CONTENT_002: {
    en: ({ ad, lu, luna }) => <>You might have accidentally imported {ad} from {lu} instead of {luna}. By importing directly from {lu}, the language of your debugger is 'detected' instead.</>,
    'zh-Hans': ({ ad, lu, luna }) => <>你很有可能是不小心使用到　{lu} 里的 {ad}。你必须使用 {luna} 的才是。要不然，langutil 反而会自动辨认调试器里的语言。</>,
    'zh-Hant': ({ ad, lu, luna }) => <>你很有可能是不小心使用到　{lu} 里的 {ad}。你必須使用 {luna} 的才是。要不然，langutil 反而會自動辨認調試器里的語言。</>,

  },
  FAQ_CONTENT_002_B: {
    en: 'It is separated in this way because it works differently in React Native. Besides, we didn\'t want to mix in uncessary logic by including the code for React Native in your Web app or the other way round.',
    'zh-Hans': '我们会有这样的安排是因为从浏览器里自动变人语言的方式和在 React Native 里的有所不同。此外，我们并不想把不相关的自动辨认程序编码混进来添加处理器的负担。',
    'zh-Hant': '我們會有這樣的安排是因為從瀏覽器里自動變人語言的方式和在 React Native 里的有所不同。此外，我們並不想把不相關的自動辨認程序編碼混進來添加處理器的負擔。',
  },
  FAQ_CONTENT_002_C: {
    en: 'If that is not the case, please submit a bug report instead and we will look into the issue.',
    'zh-Hans': '如果是因为故障，请你向我们举报，我们将会该事项进行研究并作出适当的调整。',
    'zh-Hant': '如果是因為故障，請你向我們舉報，我們將會該事項進行研究並作出適當的調整。',
  },
}
