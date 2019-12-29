import styles from 'colors';
import Color from 'color';

const theme = {
  brand: styles.brand
};

const defaults = {
  'display': 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  'justify-content': 'center'
}

const Themogrify = function(styles) {
  styles = {...defaults, ...styles};

  if (!styles) {
    return {};
  }

  var scrubbed = {}

  Object.keys(styles).forEach(key => {
    let value = styles[key];

    if (typeof value === 'object') {
      scrubbed[key] = Themogrify(value)
    } else {
      let params = getParams(value);
      value = prepareParams(value, params);

      let parts = value.split(' ');

      parts.forEach((part, i) => {
        parts[i] = getThemeColor(part, params)
      })

      scrubbed[key] = parts.join(' ');
    }
  })

  return scrubbed;
}

const getThemeColor = function(part, params) {
  if (part.startsWith('$')) {
    part = part.replace('$', '')

    var channels = {}
    params.forEach((param, i) => {
      if (part.includes('@' + i)) {
        param = param.replace('{', '').replace('}', '');
        channels = makeParamObject(param)

        part = part.replace('@' + i, '')
      }
    })

    var color = theme[part];
    if (color) {
      color = Color.hsl(color);

      color = color.alpha(channels.a || color.alpha())
      color = color.hue(channels.h || color.hue())
      color = color.saturationl(channels.s || color.saturationl())
      color = color.lightness(channels.l || color.lightness())

      return color.string();
    } else {
      return 'white'
    }
  } else {
    return part;
  }
}

const getParams = function(value) {
  return value.match(/\{(.*?)\}/g) || [];
}

const prepareParams = function(value, params) {
  params.forEach((param, i) => {
    value = value.replace(param, '@' + i)
  })

  return value;
}

const makeParamObject = function(param) {
  var object = {}
  var attrs = param.split(' ')

  attrs.forEach(attr => {
    let entry = attr.split('=')

    if (entry.length == 2) {
      object[entry[0]] = entry[1]
    }
  })

  return object;
}

export default Themogrify;