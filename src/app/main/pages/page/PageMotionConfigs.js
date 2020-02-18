export const arrowMotion = {
  initial: ['slideOut'],
  animate: ['slideIn'],
  exit: ['slideOut'],
  variants: {
    "slideIn": {
      "x": 0
    },
    "slideOut": {
      "x": '-100vw'
    }
  }
}

export const arrowStyles = {
  'position': 'relative',
  'width': 'auto',
  'z-index': '999'
}

export const headerMotion = {
  initial: ['fadeOut'],
  animate: ['fadeIn'],
  exit: ['fadeOut'],
  variants: {
    "fadeIn": {
      "opacity": 1,
      "transition": {
        delay: 0.2,
        duration: 1.5
      }
    },
    "fadeOut": {
      "opacity": 0
    }
  }
}

export const headerStyles = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  width: '100%',
  'font-size': '24px'
}