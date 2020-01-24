import React from 'react'
import { localize } from 'langutil'
import useTheme from '~hooks/useTheme'
import { bridge } from '~modules'

function AppearanceMenu() {
  const userPrefAppearance = bridge.getItem('userPrefAppearance')
  return (
    <div className='langmenu-container'> {/* UNSAFE */}

      <ListButton
        text={localize('SYSTEM_DEFAULT')}
        selected={userPrefAppearance === 'auto'}
        onClick={bridge.getItem('appearanceSetAuto')}
      />

      <ListButton
        text={localize('APPEARANCE_LIGHT')}
        selected={userPrefAppearance === 'light'}
        onClick={bridge.getItem('appearanceSetLight')}
      />

      <ListButton
        text={localize('APPEARANCE_DARK')}
        selected={userPrefAppearance === 'dark'}
        onClick={bridge.getItem('appearanceSetDark')}
      />

    </div>
  )
}

export default AppearanceMenu

function ListButton({ text, selected, onClick }) {
  const { palette: { primary } } = useTheme()
  return (
    <div
      className='langmenu-item-container' // UNSAFE
      onClick={onClick}
      style={{
        color: selected ? primary.main : '',
        backgroundColor: selected ? primary.light : '',
      }}
    >
      <i
        className='material-icons langmenu-item-tick-container' // UNSAFE
        children='done'
        style={{ opacity: selected ? 1 : 0 }}
      />
      <b children={text} />
    </div>
  )
}
