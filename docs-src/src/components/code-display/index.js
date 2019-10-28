import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import './index.css'

function CodeDisplay({ title, children = [], startLineFrom = 1, mode = 'all' }) {
  let modArray = [], lineArray = [], codeArray = [], padArray = []

  const modStyles = {
    '+': { backgroundColor: '#223311', color: '#AAFFAA' },
    '-': { backgroundColor: '#440000', color: '#FFAAAA' },
    '*': { backgroundColor: '#FFFFFF0F', color: '#00000000' },
  }

  // Ensure children is always array
  if (!Array.isArray(children)) { children = [children] }

  for (let i = 0; i < children.length; i++) {

    // conditional checking for line skipping
    const modType = children[i].type.mod
    const { backgroundColor, color } = modStyles[modType] || {}

    if (mode === 'all') {
      modArray.push(
        <div key={`mod${i}`}
          className='code-disp-content-each-line'
          style={{
            color: ['+', '-'].includes(modType) ? color : 'transparent',
            backgroundColor,
            // opacity: ['+', '-'].includes(modType) ? 1 : 0,
            paddingInlineStart: 20,
          }}
          children={modType || '•'}
        />
      )
    }

    if (['all', 'line'].includes(mode)) {
      lineArray.push(
        <div
          key={`line${i}`}
          className='code-disp-content-each-line'
          style={{
            backgroundColor,
            paddingInlineStart: 20,
            paddingInlineEnd: 20,
          }}
        >
          {i + startLineFrom}
        </div>
      )
    }

    codeArray.push(
      <div
        key={`code${i}`}
        className='code-disp-content-each-line code-disp-content-code-actual'
        style={{ backgroundColor }}
      >
        {children[i]}
      </div>
    )

    padArray.push(
      <div
        key={`pad${i}`}
        style={{ color: 'transparent', backgroundColor }}
        className='code-disp-content-each-line'
        children={' '}
      />
    )

  }

  return (
    <div className='code-disp-container'>
      <div className='code-disp-toolbar-container'>
        <p className='code-disp-title' children={title} />
        <CopyButton />
      </div>
      <div className='code-disp-content-container'>
        <div className='code-disp-content-mod-container'>
          <pre className='code-disp-pre' children={modArray} />
        </div>
        <div className='code-disp-content-line-container'>
          <pre className='code-disp-pre' children={lineArray} />
        </div>
        <div className='code-disp-content-code-container'>
          <pre className='code-disp-pre'>
            {codeArray}
          </pre>
        </div>
        <div>
          <pre className='code-disp-pre' children={padArray} />
        </div>
      </div>
    </div>
  )
}

const CopyButton = withLang(({ onClick }) => {
  return (
    <button className='code-disp-toolbar-button'>
      <div className='code-disp-toolbar-button-div'>
        <i
          className='material-icons code-disp-toolbar-button-icon'
          children='file_copy'
        />
        {localize({ keyword: 'COPY', casing: 'upperCase' })}
      </div>
    </button>
  )
})

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
