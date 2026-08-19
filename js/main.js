// Tabs Button with Smooth Animation
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')
let isSwitching = false

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

    // Switch active button
    tabs.forEach((t) => t.classList.remove('main-active'))
    tab.classList.add('main-active')

    // Fade out the current content
    currentContent.classList.remove('show')

    const finishTransition = () => {
      currentContent.classList.remove('main-active')
      isSwitching = false

      // Fade in new content
      targetContent.classList.add('main-active')

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          targetContent.classList.add('show')
        })
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
    }, 500)

    currentContent.addEventListener('transitionend', handleTransitionEnd)
  })
})

// Initial Fade in on Load

window.addEventListener('load', () => {
  const initialContent = document.querySelector('[data-content].main-active')
  if (!initialContent) return

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initialContent.classList.add('show')
    })
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