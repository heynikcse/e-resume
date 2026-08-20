// Tabs Button with Smooth Animation
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')
let isSwitching = false

// Matches the 0.22s transition duration in styles.css, with a small buffer.
// (Was 500ms against a 0.4s transition — trimming both is most of the
// perceived "slow tab switch" fix.)
const TRANSITION_FALLBACK_MS = 280

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (isSwitching) return

    const targetSelector = tab.dataset.target,
        targetContent = document.querySelector(targetSelector),
        currentContent = [...tabContents].find((content) =>
          content.classList.contains('main-active')
        )

    // Avoid re-triggering if the same tab is clicked
    if (!targetContent || !currentContent || targetContent === currentContent) return

    isSwitching = true

    // Switch active button + keep ARIA state and roving tabindex in sync
    tabs.forEach((t) => {
      t.classList.remove('main-active')
      t.setAttribute('aria-selected', 'false')
      t.tabIndex = -1
    })
    tab.classList.add('main-active')
    tab.setAttribute('aria-selected', 'true')
    tab.tabIndex = 0

    // Fade out the current content
    currentContent.classList.remove('show')
    currentContent.setAttribute('aria-hidden', 'true')

    const finishTransition = () => {
      currentContent.classList.remove('main-active')
      isSwitching = false

      // Fade in new content
      targetContent.classList.add('main-active')
      targetContent.removeAttribute('aria-hidden')

      requestAnimationFrame(() => {
        targetContent.classList.add('show')
      })
    }

    const handleTransitionEnd = (event) => {
      // Only react to the opacity transition on currentContent itself,
      // not on any descendant element that might also transition opacity
      if (event.target !== currentContent || event.propertyName !== 'opacity') return

      currentContent.removeEventListener('transitionend', handleTransitionEnd)
      clearTimeout(transitionTimeout)
      finishTransition()
    }

    const transitionTimeout = setTimeout(() => {
      currentContent.removeEventListener('transitionend', handleTransitionEnd)
      finishTransition()
    }, TRANSITION_FALLBACK_MS)

    currentContent.addEventListener('transitionend', handleTransitionEnd)
  })

  tab.addEventListener('keydown', (event) => {
    const supportedKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!supportedKeys.includes(event.key) || isSwitching) return

    event.preventDefault()

    const currentIndex = [...tabs].indexOf(tab)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    const nextTab = tabs[nextIndex]
    nextTab.focus()
    nextTab.click()
  })
})

// Initial Fade in on Load

window.addEventListener('load', () => {
  const initialContent = document.querySelector('[data-content].main-active')
  if (!initialContent) return

  requestAnimationFrame(() => {
    initialContent.classList.add('show')
  })
})

// Social Reveal Animation

if (typeof ScrollReveal === 'function') {
  const sr = ScrollReveal({
    origin: 'right',
    distance: '200px',
    duration: 1500,
    delay: 300,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    reset: true
  })

  sr.reveal('.main__content', {origin: 'top'})
  sr.reveal('.profile', {delay: 600})
  sr.reveal('.profile__image', {rotate: {z: -55}, scale: 0, delay: 900})
  sr.reveal('.profile__greeting', {delay: 900})
  sr.reveal('.profile__name', {delay: 1100})
  sr.reveal('.profile__buttons', {delay: 1300, scale: 0})
  sr.reveal('.profile__data .section__title', {delay: 1500})
  sr.reveal('.profile__description', {delay: 1700})
  sr.reveal('.main__area', {origin: 'left', delay: 2000})
}
