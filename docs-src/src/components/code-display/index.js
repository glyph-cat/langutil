import React from 'react'
import CodeDisplay from './code-display'
import './index.css'

const INDENT_WIDTH = 4
const DEF_BASE = '#79b6f2'
const COLORS = {
  keyword: '#c5a5c5', // Eg: import, switch, if, for
  variable: '#a5dfff',
  definition: DEF_BASE, // Eg: const, let, var
  html: DEF_BASE, // <div>
  propPass: DEF_BASE, // {} brackets for passing props
  comment: '#6c9985',
  string: '#ffa899',
  number: '#B5CEA8',
  regex: '#CC6688',
  regexEsc: '#CC9988',
  boolean: DEF_BASE,
  type: '#64c9b5', // Eg: <Component/>
  function: '#efefb1',
  angular: '#767676' // Angular brackets such as <></>
}

export const Com = ({ children }) => <span children={children} style={{ color: COLORS.comment }} />
export const Key = ({ children }) => <span children={children} style={{ color: COLORS.keyword }} />
export const Var = ({ children }) => <span children={children} style={{ color: COLORS.variable }} />
export const Def = ({ children }) => <span children={children} style={{ color: COLORS.definition }} />
export const Html = ({ children }) => <span children={children} style={{ color: COLORS.html }} />
export const Prop = ({ children }) => <span children={children} style={{ color: COLORS.propPass }} />
export const Str = ({ children }) => <span children={children} style={{ color: COLORS.string }} />
export const Num = ({ children }) => <span children={children} style={{ color: COLORS.number }} />
export const Rgx = ({ children }) => <span children={children} style={{ color: COLORS.regex }} />
export const Rgxe = ({ children }) => <span children={children} style={{ color: COLORS.regexEsc }} />
export const Bool = ({ children }) => <span children={children} style={{ color: COLORS.boolean }} />
export const Type = ({ children }) => <span children={children} style={{ color: COLORS.type }} />
export const Func = ({ children }) => <span children={children} style={{ color: COLORS.function }} />
export const Ang = ({ children }) => <span children={children} style={{ color: COLORS.angular }} />
export const Mark = ({ children }) => <span children={children} style={{ backgroundColor: '#000000', borderRadius: '0.35em', paddingInlineStart: '0.5em', paddingInlineEnd: '0.5em', paddingBlockStart: '0.15em', paddingBlockEnd: '0.15em' }} />
export const Line = ({ children = <br />, indent = 0 }) => <>{' '.repeat(4 * indent)}{children}</>
export const LineEmp = ({ children, indent = 0 }) => <>{' '.repeat(INDENT_WIDTH * indent)}{children}</>
LineEmp.mod = '*'
export const LineAdd = ({ children, indent = 0 }) => <>{' '.repeat(INDENT_WIDTH * indent)}{children}</>
LineAdd.mod = '+'
export const LineRem = ({ children, indent = 0 }) => <>{' '.repeat(INDENT_WIDTH * indent)}{children}</>
LineRem.mod = '-'
export const Err = ({ children }) => (
  <span children={children} style={{
    textDecorationColor: '#F48771',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed'
  }} />
)

export default CodeDisplay
