import React from 'react'
import ReactOnScreen from 'react-on-screen'

function FadeIntoView({
  children, once, partialVisibility = true, transitionDuration = 150, contentContainerStyle, ...otherProps
}) {
  return (
    <ReactOnScreen
      {...{ once, partialVisibility, ...otherProps }}
      children={({ isVisible }) => {
        return (
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDuration: `${transitionDuration / 1000}s`,
              ...contentContainerStyle
            }}
            children={children}
          />
        )
      }}
    />
  )
}

export default FadeIntoView
