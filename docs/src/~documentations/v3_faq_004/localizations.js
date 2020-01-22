export default {
  FAQ_TITLE_004: {
    en: 'Do I need to refresh my page/app after setLanguage?',
    ms: 'Perlukah saya menyegarkan halaman/app saya selepas setLanguage?',
    'zh-Hans': '用了 setLanguage 之后页面需要刷新吗？',
    'zh-Hant': '用了 setLanguage 之後頁面需要刷新嗎？',
  },
  FAQ_CONTENT_004: {
    en: ({ wl, ul }) => <><b>No.</b> So long as you wrap your component in {wl}, or use the {ul} hook, they should render with the correct localized content as the language changes.</>,
    'zh-Hans': ({ wl, ul }) => <><b>不必。</b>只要你有使用 {wl} 或 {ul}，只要语言设置有被更换你的内容将会自动显示出正确的翻译内容</>,
    'zh-Hant': ({ wl, ul }) => <><b>不必。</b>只要你有使用 {wl} 或 {ul}，只要語言設置有被更換你的內容將會自動顯示出正確的翻譯內容</>,
  },
}
