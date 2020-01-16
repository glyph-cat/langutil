import React from 'react'
// import { FlatList as FList } from 'react-native'
import './index.css'

function FlatList({
  className,
  data = [],
  ItemSeparatorComponent,
  keyExtractor,
  renderItem: RenderItem,
  style,
}) {
  let renderStack = []
  for (let i = 0; i < data.length; i++) {

    // Because key extractor needs to be used by RenderItem & ItemSeparatorComponent
    const key = keyExtractor(i, data[i]) // TODO: Find out if it's done like this

    renderStack.push(
      // TODO: Find out if it's done like this
      <RenderItem key={key} data={data[i]} />
    )

    // Push separator if defined and if not reached end of list
    if (ItemSeparatorComponent && i < (data.length - 1)) {
      renderStack.push(<ItemSeparatorComponent key={`_${key}`} />)
    }

  }

  return (
    <div
      className={['flatlist-container', className].join(' ')}
      children={renderStack}
      style={style}
    />
  )
}

export default FlatList
