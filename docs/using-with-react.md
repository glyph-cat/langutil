# Using with React

To use Langutil with React, you will first need to install the `hoist-non-react-statics` package. 

See [React Docs: Higher-Order Components](https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over) (Head over to the section **Static Methods Must Be Copied Over** if the site doesn't automatically scroll to it).

<br/>

## Function Components

```js
import { useLangutil } from 'langutil/react'

// It is recommended to create a custom hook instead of
// directly consuming it in components.
export function useLang() {
  return useLangutil(core)
}

function MyComponent() {
  const langutilState = useLang()
  return <h1>{langutilState.localize('HELLO')}</h1>
}

```

<br/>

## Higher Order Component (For Classes)

```js
import React from 'react'
import { createLangutilHOC } from 'langutil/react'

export const withLang = createLangutilHOC(core)

class MyComponent extends React.Component {
  render() {
    const { langutilState } = this.props
    return <h1>{langutilState.localize('HELLO')}</h1>
  }
}

export default withLang(MyComponent)

```

## UNPKG Script tag

* The react additions can be imported with a script tag as shown below.
* Remember to replace `index.js` with `index.min.js` when deploying.

```html
<script src="https://unpkg.com/langutil@<VERSION>/react/lib/umd/index.js" crossorigin></script>
```

<br/>
