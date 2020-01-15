import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Cat } from 'react-kawaii'
import ReactKawaiiPromoText from '~components/react-kawaii-promo-text'
import FadeIntoView from '~components/fade-into-view'
import { COLORS, VALUES } from '~constants'
import './index.css'

class Loader extends React.Component {

  state = { showHint: false }

  componentDidMount() {
    this.timeoutRef = setTimeout(() => {
      this.setState({ showHint: true })
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.timeoutRef)
  }

  render() {
    const { showHint } = this.state
    return (
      <FadeIntoView>
        <div className='loader-container'>
          <div className='loader-subcontainer'>

            <Cat
              size={VALUES.DERIVED.reactKawaiiLarge()}
              mood='excited'
              color={COLORS.grey}
            />

            <p
              className='loader-text'
              children={localize('LOADING_ELLIPSIS')}
              style={{ color: COLORS.grey }}
            />

            <div style={{ opacity: showHint ? 1 : 0, transitionDuration: '0.25s' }}>
              <ReactKawaiiPromoText />
            </div>

          </div>
        </div>
      </FadeIntoView>
    )
  }

}

export default withLang(Loader)
