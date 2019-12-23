import { createContext } from 'react'

const ThemeContext = createContext({

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

  }

})

export default ThemeContext
