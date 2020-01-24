import React from 'react'
import CodeDisplay from './code-display'
import './index.css'
import useTheme from '~hooks/useTheme'

const INDENT_WIDTH = 4
function useCodeTheme() { return useTheme().palette.misc.code }

export const Com = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().comment }} />
)

export const Key = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().keyword }} />
)

export const Var = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().variable }} />
)

export const Def = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().definition }} />
)

export const Html = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().html }} />
)

export const Prop = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().propPass }} />
)

export const Str = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().string }} />
)

export const Num = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().number }} />
)

export const Rgx = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().regex }} />
)

export const Rgxe = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().regexEsc }} />
)

export const Bool = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().boolean }} />
)

export const Type = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().type }} />
)

export const Func = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().function }} />
)

export const Ang = ({ children }) => (
  <span children={children} style={{ color: useCodeTheme().angular }} />
)

export const Mark = ({ children }) => (
  <span
    children={children}
    style={{
      backgroundColor: useCodeTheme().mark,
      borderRadius: '0.35em',
      paddingBlockStart: '0.15em',
      paddingBlockEnd: '0.15em',
      paddingInlineStart: '0.5em',
      paddingInlineEnd: '0.5em',
    }}
  />
)

export const Line = ({ children = <br />, indent = 0 }) => (
  <>{' '.repeat(4 * indent)}{children ? children : ' '}</>
)

export const LineEmp = ({ children, indent = 0 }) => (
  <>{' '.repeat(INDENT_WIDTH * indent)}{children ? children : ' '}</>
)
LineEmp.mod = '*'

export const LineAdd = ({ children, indent = 0 }) => (
  <>{' '.repeat(INDENT_WIDTH * indent)}{children ? children : ' '}</>
)
LineAdd.mod = '+'

export const LineRem = ({ children, indent = 0 }) => (
  <>{' '.repeat(INDENT_WIDTH * indent)}{children ? children : ' '}</>
)
LineRem.mod = '-'

export const Err = ({ children }) => (
  <span children={children} style={{
    textDecorationColor: '#F48771',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed'
  }} />
)

export default CodeDisplay
