import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { localize } from 'langutil'
import { useLang } from 'langutil/react-additions'
import { H1, H2, Ul, Li, SectionBreak } from '~components/document'
import FadeIntoView from '~components/fade-into-view'
import Loader from '~components/loader'
import { STRINGS } from '~constants'
import getChangelogs from '~content/get-changelogs'
import VersionCheckContext from '~contexts/VersionCheckContext'
import useScrollToSection from '~hooks/useScrollToSection'
import './index.css'

function ChangelogScreen({ match: { params: { subId } } }) {
  const [changelogs, setChangelogs] = useState(getChangelogs())
  const latestVersion = useContext(VersionCheckContext)
  const latestDocumentedVersion = getChangelogs()[0].data[0].title
  useLang()
  useEffect(() => {
    if (latestVersion.match(/\d+.\d+.\d+/)) {
      let finalChangelog = getChangelogs()
      if (latestDocumentedVersion !== latestVersion) {
        finalChangelog[0].data.unshift({
          title: latestVersion,
          data: [localize('BRACKET_WILL_BE_UPDATED_SOON')]
        })
      }
      setChangelogs(finalChangelog)
    }
  }, [latestVersion, latestDocumentedVersion])

  if (latestVersion === STRINGS.labelWaiting) {
    return <Loader />
  } else {
    return (
      <ChangelogRenderer
        changelogs={changelogs}
        subId={subId}
      />
    )
  }
}

export default withRouter(ChangelogScreen)

function ChangelogRenderer({ changelogs, subId }) {
  useScrollToSection(subId)
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
