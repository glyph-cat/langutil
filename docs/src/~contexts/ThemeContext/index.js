import { createContext } from 'react'

const ThemeContext = createContext({

  palette: {

    primary: {
      dark: '#',
      light: '#',
      main: '#',
      contrastText: '#000000',
    },

    secondary: {
      dark: '#',
      light: '#',
      main: '#',
      contrastText: '#000000',
    },

  }

})

export default ThemeContext
