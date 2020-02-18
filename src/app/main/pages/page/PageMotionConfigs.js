export const arrowMotion = {
  initial: ['slideOut'],
  animate: ['slideIn'],
  exit: ['slideOut'],
  variants: {
    slideIn: {
      x: 0,
      transition: {
        type: 'spring',
        mass: 1,
        damping: 15,
        stiffness: 80
      }
    },
    slideOut: {
      x: '-100vw',
      transition: {
        duration: 1
      }
    }
  }
}

export const headerMotion = {
  initial: ['fadeOut'],
  animate: ['fadeIn'],
  exit: ['fadeOut'],
  variants: {
    fadeIn: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1.5
      }
    },
    fadeOut: {
      opacity: 0
    }
  }
}