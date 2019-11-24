const reconceal = (path) => {
  const [a, b] = Object.values(path)[0]
  return `${a}/${b}`
}

/**
 * @description Checks if a current path (includes accomodation for H1 navigation) matches that of sidebar's yet not overlapping other similar sidebar items
 * @param {string} path
 * @todo Potential performance optimizations
 * @returns {boolean}
 */
function isSidebarPathMatched(path, to) {
  const rgx = /^\/docs\/v\d\//
  const pathSplit = path.replace(rgx, '').split('/')
  const toSplit = to.replace(rgx, '').split('/')
  return reconceal({ pathSplit }) === reconceal({ toSplit })
}

export default isSidebarPathMatched
