import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { appendDictionary, localize } from 'langutil'
import { useLang } from 'langutil/react-additions'
import AppendMeta from '~components/append-meta'
import { H1, H2, Ul, Li, SectionBreak } from '~components/document'
import FadeIntoView from '~components/fade-into-view'
import Loader from '~components/loader'
import { STRINGS } from '~constants'
import VersionCheckContext from '~contexts/VersionCheckContext'
import useScrollToSection from '~hooks/useScrollToSection'
import getChangelogs from './get-changelogs'
import localizations from './localizations'
import './index.css'

function ChangelogScreen({ match: { params: { subId } } }) {
  useLang(); appendDictionary(localizations, 'chg-log-scn')
  const [changelogs, setChangelogs] = useState([])

  const latestVersion = useContext(VersionCheckContext)
  const latestDocumentedVersion = getChangelogs()[0].data[0].title
  useEffect(() => {
    let finalChangelog = getChangelogs()
    if (latestVersion.match(/\d+.\d+.\d+/) && latestDocumentedVersion !== latestVersion) {
      finalChangelog[0].data.unshift({
        title: latestVersion,
        data: [localize('CHANGELOG_BRACKET_WILL_BE_UPDATED_SOON')]
      })
    }
    setChangelogs(finalChangelog)
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
  return (
    <>
      <AppendMeta title={localize('CHANGELOG')} />
      <div className='changelog-scn-container' children={toRender} />
    </>
  )
}
