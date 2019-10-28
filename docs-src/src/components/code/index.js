import React from 'react'
import './index.css'

let errorShown = false
if (errorShown) {
  errorShown = true
  window.alert('Deprecation Error')
}

function TdWithTable({ children, tdStyle }) {
  return (
    <td style={tdStyle}>
      <table cellSpacing={0} cellPadding={0} style={{ width: '100%' }}>
        <tbody>
          {children}
        </tbody>
      </table>
    </td>
  )
}

// TODO: New container component using CSS Grid
// Add props: `title`

function CodeDisplay({ children = [], lineStart = 1, mode = 'all' }) {
  let modArray = [], lineArray = [], codeArray = []
  const modStyles = {
    '+': { backgroundColor: '#223311', color: '#AAFFAA' },
    '-': { backgroundColor: '#440000', color: '#FFAAAA' },
    '*': { backgroundColor: '#FFFFFF0F', color: '#00000000' },
  }

  if (!Array.isArray(children)) { children = [children] }
  for (let i = 0; i < children.length; i++) {
    const modType = children[i].type.mod
    const { backgroundColor, color } = modStyles[modType] || {}

    if (mode === 'all') {
      modArray.push(
        <tr key={`mod${i}`} style={{ backgroundColor }}>
          <td className='code-commonPadding code-mod noselect' style={{
            color,
            opacity: ['+', '-'].includes(modType) ? 1 : 0,
          }}>
            {modType || '•'}
          </td>
        </tr>
      )
    }

    if (['all', 'line'].includes(mode)) {
      lineArray.push(
        <tr key={`line${i}`} style={{ backgroundColor }}>
          <td className='code-commonPadding code-line noselect'>
            {i + lineStart}
          </td>
        </tr>
      )
    }

    codeArray.push(
      <tr key={`code${i}`} style={{ backgroundColor }}>
        <td className='code-commonPadding' style={{ paddingInlineEnd: '2em' }}>
          <pre className='code-pre'>
            {children[i]}
          </pre>
        </td>
      </tr>
    )
  }

  return (
    <div className='code-container'>
      {/* <h2>title</h2> */}
      <div className='code-subcontainer'>
        <table cellSpacing={0} cellPadding={0} style={{ width: '100%' }}>
          <tbody>
            {/* <tr>
              <td />
              <td />
              <td style={{ textAlign: 'right' }}>
                <button children={localize('COPY')} />
              </td>
            </tr> */}
            <tr>

              <TdWithTable tdStyle={{ width: '2em' }} children={mode === 'all' ? modArray : null} />

              {['all', 'line'].includes(mode) ?
                <TdWithTable tdStyle={{ width: '2em' }} children={lineArray} />
                :
                null
              }

              <TdWithTable children={codeArray} />

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

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

const INDENT_WIDTH = 4
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
// export default withLang(CodeDisplay)
