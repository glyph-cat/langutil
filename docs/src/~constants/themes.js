const CODE_COLOR_DEF_BASE_DARK = '#569cd6'
const darkTheme = {
  type: 'dark',
  palette: {

    primary: {
      dark: '#212833',
      light: '#112233',
      main: '#0099BB',
      contrastText: '#000000',
    },

    secondary: {
      dark: '#211519',
      light: '#aa5577',
      main: '#ff2b80',
      contrastText: '#000000',
    },

    misc: {
      appBg: '#111111',
      appFg: '#A5A5A5',
      docSidebarTitle: '#004466',
      docSidebarPathMatch: '#33CCFF',
      navbarBg: '#000000',
      navLinkIndicator: '#667788',
      navLinkActiveBg: '#111122',
      tableThBg: '#333333',
      shadowColor: '#555555',
      nbToggleActiveBg: '#0099BB',
      a: '#66bbff',
      aHover: '#88ddff',
      code: {
        keyword: '#c586c0', // Eg: import, switch, if, for
        variable: '#9cdcfe',
        definition: CODE_COLOR_DEF_BASE_DARK, // Eg: const, let, var
        html: CODE_COLOR_DEF_BASE_DARK, // <div>
        propPass: CODE_COLOR_DEF_BASE_DARK, // {} brackets for passing props
        comment: '#6a9955',
        string: '#ce9178',
        number: '#b5cea8',
        regex: '#d16969',
        regexEsc: '#d7ba7d',
        boolean: CODE_COLOR_DEF_BASE_DARK,
        type: '#4ec9b0', // Eg: <Component/>
        function: '#dcdcaa',
        angular: '#808080', // Angular brackets such as <></>
        mark: '#000000',
        editorBg: '#282c34cc', // Actual is '#1e1e1e'
        editorFg: '#eeeeee',
        titleBarBg: '#00000044', //'#1d2027',
        titleBarFg: '#88aa88',
        copyButtonBg: '#aaccff',
        copyButtonFg: '#1d2027',
      },
    },

  }

}

const CODE_COLOR_DEF_BASE_LIGHT = '#0000ff'
const lightTheme = {
  type: 'light',
  palette: {

    primary: {
      dark: '#212833',
      light: '#ddeeff',
      main: '#0099BB',
      contrastText: '#000000',
    },

    secondary: {
      dark: '#332128',
      light: '#ffccee',
      main: '#ff2b80',
      contrastText: '#000000',
    },

    misc: {
      appBg: '#EEEEEE',
      appFg: '#4A4A4A',
      docSidebarTitle: '#66bbff',
      docSidebarPathMatch: '#0099BB',
      navbarBg: '#212833',
      navLinkIndicator: '#aaddff',
      navLinkActiveBg: '#000000',
      tableThBg: '#DDDDDD',
      shadowColor: '#000000',
      nbToggleActiveBg: '#EEEEEE',
      a: '#004466',
      aHover: '#006688',
      code: {
        keyword: '#af00db',
        variable: '#001080',
        definition: CODE_COLOR_DEF_BASE_LIGHT,
        html: CODE_COLOR_DEF_BASE_LIGHT,
        propPass: CODE_COLOR_DEF_BASE_LIGHT,
        comment: '#008000',
        string: '#a31515',
        number: '#09885a',
        regex: '#811f3f',
        regexEsc: '#ff0000',
        boolean: CODE_COLOR_DEF_BASE_LIGHT,
        type: '#267f99',
        function: '#795e26',
        angular: '#800000',
        mark: '#dddddd',
        editorBg: '#ffffff',
        editorFg: '#222222',
        titleBarBg: '#dddddd',
        titleBarFg: '#5b8877',
        copyButtonBg: '#bbccdd',
        copyButtonFg: '#1d2027',
      },
    },

  }
}

export default { darkTheme, lightTheme }
