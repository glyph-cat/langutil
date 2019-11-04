import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Key, Var, Str, Func, Com } from '../../components/code-display'
import { withProps } from '../../modules'

const ApiAutoDetect = () => (
  <CodeDisplay title={localize('HOW_TO_USE_API', ['AUTO_DETECT'])}>
    <Line>
      <Com>{`// ${localize('WEB')}`}</Com>
    </Line>
    <Line>
      <Key>import</Key> {'{ '}<Var>init</Var>, <Var>setLanguage</Var>, <Var>AUTO_DETECT</Var>{' }'} <Key>from</Key> <Str>'langutil'</Str>
    </Line>
    <Line />
    <Line>
      <Com>{'// '}{localize({
        keyword: 'YOU_NEED_IMPORT_AD_IF_USING_RN',
        transform: withProps({ dect: 'AUTO_DETECT', add: '\'native-additions\'', rn: 'React Native' })
      })}</Com>
    </Line>
    <Line>
      <Key>import</Key> {'{ '}<Var>AUTO_DETECT</Var>{' }'} <Key>from</Key> <Str>'langutil/native-additions'</Str>
    </Line>
    <Line />
    <Line>
      <Com>{`// ${localize('USAGE_OF_OTHER_API_UNCHANGED')}`}</Com>
    </Line>
    <Line>
      <Func>init</Func>(<Var>dictionary</Var>, <Str>'{localize('DOC_EXAMPLE_PRIMARY_LANG')}'</Str>, <Var>AUTO_DETECT</Var>)
    </Line>
    <Line>
      <Func>setLanguage</Func>(<Str>'{localize('DOC_EXAMPLE_PRIMARY_LANG')}'</Str>, <Var>AUTO_DETECT</Var>)
    </Line>
  </CodeDisplay>
)

export default ApiAutoDetect
