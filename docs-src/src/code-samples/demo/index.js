import React from 'react'
import { withLang } from 'langutil/react-additions'
import { localize } from 'langutil'
import CodeDisplay, {
  Line, Key, Com, Var, Def, Str, Html, Prop, Ang, Func, LineEmp, LineAdd
} from '../../components/code-display'

const CodeDemo = () => (
  <CodeDisplay title='demo.js'>
    <Line>
      <Key>import</Key> {'{'} <Var>localize</Var> {'}'} <Key>from</Key> <Str>'langutil'</Str>
    </Line>
    <Line>
      <Key>import</Key> {'{'} <Var>withLang</Var> {'}'} <Key>from</Key> <Str>'langutil/react-additions'</Str>
    </Line>
    <Line />
    <Line>
      <Def>const</Def> <Func>MyComponent</Func> <Def>=</Def> () <Def>=></Def> {'{'}
    </Line>
    <LineAdd indent={1}>
      <Com>{`// ${localize('ITS_THAT_SIMPLE')}`}</Com>
    </LineAdd>
    <LineEmp indent={1}>
      <Key>return</Key> <Ang>{'<'}</Ang><Html>p</Html><Ang>{'>'}</Ang>
      <Prop>{'{'}</Prop>
      <Func>localize</Func>(<Str>'HELLO_WORLD'</Str>)
      <Prop>{'}'}</Prop>
      <Ang>{'</'}</Ang><Html>p</Html><Ang>{'>'}</Ang>
    </LineEmp>
    <Line indent={1}>
      <Com>{`// ${'This is a very long line. '.repeat(7)}`}</Com>
    </Line>
    <Line indent={1}>
      <Com>{`// ${localize('OUTPUT_HELLO_WORLD')}`}</Com>
    </Line>
    <Line>
      {'}'}
    </Line>
    <Line />
    <Line>
      <Key>export default</Key> <Func>withLang</Func>(<Var>MyComponent</Var>)
    </Line>
  </CodeDisplay>
)

export default withLang(CodeDemo)
