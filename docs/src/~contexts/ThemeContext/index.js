import { createContext } from 'react'
import { THEMES } from '~constants'

const ThemeContext = createContext(THEMES.lightTheme)

export default ThemeContext
