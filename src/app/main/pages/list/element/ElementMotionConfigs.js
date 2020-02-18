export const headerMotion = {
  initial: ['slideOut'],
  animate: ['slideIn'],
  exit: ['slideOut'],
  variants: {
    slideIn: i => ({
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        mass: 1,
        damping: 15,
        stiffness: 80,
        delay: i * 0.3
      },
    }),
    slideOut: {
      x: '-100vw',
      opacity: 0,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  }
}

export const arrowMotion = {
  initial: ['slideOut'],
  animate: ['slideIn'],
  exit: ['slideOut'],
  variants: {
    slideIn: i => ({
      x: 0,
      transition: {
        type: 'spring',
        mass: 1,
        damping: 15,
        stiffness: 80,
        delay: (i + 0.5) * 0.3,
      }
    }),
    slideOut: {
      x: '100vw',
      transition: {
        duration: 1
      }
    }
  }
}