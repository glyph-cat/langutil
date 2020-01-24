import React, { useState, useLayoutEffect } from 'react'
import { ButtonBase } from '@material-ui/core'
import { debounce } from 'lodash'
import { VALUES } from '~constants'
import useTheme from '~hooks/useTheme'
import { bridge } from '~modules'

function DocSidebarFab({ onClick, isSidebarVisible }) {
  const [footerHeightInView, setFooterHeightInView] = useState(0)
  const onChangeFHIV_fab = debounce((height) => { setFooterHeightInView(height) })
  useLayoutEffect(() => {
    bridge.setItem({ onChangeFHIV_fab })
    return () => { bridge.removeItem('onChangeFHIV_fab') }
  })
  const { palette: { primary, misc }, type } = useTheme()
  return (
    <div style={{
      borderRadius: VALUES.fabSize / 2,
      position: 'fixed',
      left: VALUES.fabPadding,
      bottom: VALUES.fabPadding + footerHeightInView,
      transitionDuration: '0.25s',
      overflow: 'hidden',
      boxShadow: `0 3px 5px 0 ${misc.shadowColor}${type === 'dark' ? '' : '44'}`,
    }}>
      <ButtonBase onClick={onClick}>
        <div
          style={{
            backgroundColor: type === 'dark' ? primary.dark : misc.appBg,
            color: misc.appFg,
            width: VALUES.fabSize,
            height: VALUES.fabSize,
            display: 'grid',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <i
            className='material-icons'
            children={isSidebarVisible ? 'menu_open' : 'menu'}
          />
        </div>
      </ButtonBase>
    </div>
  )
}

export default DocSidebarFab
