import React from 'react'
import { withRouter } from 'react-router-dom'
import { withLang } from 'langutil/react-additions'
import { H1, H2, Ul, Li, SectionBreak } from '~components/document'
import FadeIntoView from '~components/fade-into-view'
import { useScrollToSection } from '~custom-hooks'
import getChangelogs from '~content/get-changelogs'
import './index.css'

function ChangelogScreen({ match: { params: { subId } } }) {
  useScrollToSection(subId)
  const changelogs = getChangelogs()
  let toRender = []
  for (let i = 0; i < changelogs.length; i++) {
    const { title: version, data } = changelogs[i]
    toRender.push(
      <FadeIntoView key={`h1-${i}`} once>
        <H1 id={version} children={version} />
      </FadeIntoView>
    )
    let majorVersionArray = []
    for (let j = 0; j < data.length; j++) {
      const { title, data: logs } = data[j]
      majorVersionArray.push(
        <FadeIntoView key={`h2-${j}`} once>
          <H2 id={title} className='changelog-scn-h2' children={title} />
        </FadeIntoView>
      )
      let minorVersionArray = []
      for (let k = 0; k < logs.length; k++) {
        minorVersionArray.push(
          <FadeIntoView key={`li-${k}`} once>
            <Li className='changelog-scn-li' children={logs[k]} />
          </FadeIntoView>
        )
      }
      majorVersionArray.push(
        <FadeIntoView key={`ul-${j}`} once>
          <Ul children={minorVersionArray} />
        </FadeIntoView>
      )
      majorVersionArray.push(<br key={`br-${j}`} />)
    }
    toRender.push(majorVersionArray)
    toRender.push(<SectionBreak key={`sb-${i}`} />)
  }
  return <div className='changelog-scn-container' children={toRender} />
}

export default withRouter(withLang(ChangelogScreen))
