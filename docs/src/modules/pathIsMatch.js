function pathIsMatch(to, exact) {
  const { href, origin } = window.location
  const currentLocation = href.replace(`${origin}/#`, '')
  if (exact) {
    // console.log(`currentLocation("${currentLocation}") === to("${to}")`, currentLocation === to)
    return currentLocation === to
  } else {
    // console.log(`"${currentLocation}".includes("${to}")`, currentLocation.includes(to))
    return currentLocation.includes(to)
  }
}

export default pathIsMatch
