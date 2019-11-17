import { VALUES } from '~constants'

function scrollToViewById(id) {
  setTimeout(() => {
    const scrollTarget = document.getElementById(id)
    if (scrollTarget) {
      window.scrollTo(0, scrollTarget.offsetTop - VALUES.navbarHeight * 1.5)
    }
  })
}

export default scrollToViewById
