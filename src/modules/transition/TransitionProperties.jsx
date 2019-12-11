const TransitionProperties = {
  transProperty: 'left',
  transType: 'ease',

  startValue: '100vw',
  inValue: '0',
  outValue: '100vw',

  transDelayIn: 0,
  transDelayOut: 0,

  transDurationIn: '500ms',
  transDurationOut: '500ms',

  outCallDelay: 0,
  controlsOutCall: false,

  styles: {}
}

export default TransitionProperties;

export const TransitionPropertiesList = Object.keys(TransitionProperties);