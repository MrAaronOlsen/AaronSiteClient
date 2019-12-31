import React from 'react'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'

import TransitionProperties, { TransitionPropertiesList } from 'modules/transition/TransitionProperties.jsx'
import StyleProperties, { StylePropertiesList } from './StyleProperties.jsx'

import styles from './blockForm.mod.scss'

const objectAttributes = {
  'transition': TransitionProperties,
  'styles': StyleProperties
}

const objectAttributesOrder = {
  'transition': TransitionPropertiesList,
  'styles': StylePropertiesList
}

const locator = "form_line"

const block = function(props) {
  return props.block || {}
}

const blockText = function(name, props, focused, onChange) {
  return <BlockText
    locator={locator}
    focused={focused}
    name={name}
    text={block(props)[name]}
    onChange={onChange} />
}

const blockRich = function(name, props, focused, onChange) {
  return <BlockRich
    locator={locator}
    focused={focused}
    name={name}
    text={block(props)[name]}
    blockKey={props.blockKey}
    onChange={onChange} />
}

const blockObject = function(name, props, focused, onChange) {
  return <BlockObject
    locator={locator}
    focused={focused}
    name={name}
    object={block(props)[name]}
    objectOrder={objectAttributesOrder[name]}
    blockKey={props.blockKey}
    onChange={onChange}
    attributes={objectAttributes[name]}
    hasStyles />
}

const blockTypes = {
  'text': blockText,
  'rich': blockRich,
  'img': blockText,
  'wrapper': blockText
}

const blockTypesKey = {
  'text': 'content',
  'rich': 'content',
  'img': 'img_url',
  'wrapper': 'first_child'
}

const blockContent = function(props, focused, onChange) {
  var type = block(props).type;

  if (type && blockTypes[type]) {
    return blockTypes[type](blockTypesKey[type], props, focused, onChange)
  }

  return null;
}

function setUpClickListeners(clickedIn, clickedOut) {

  React.useEffect(() => {
    document.addEventListener("mousedown", clickedOut);
    document.addEventListener("mousedown", clickedIn);

    return () => {
      document.removeEventListener("mousedown", clickedOut);
      document.removeEventListener("mousedown", clickedIn);
    };
  }, []);
}

export default function BlockForm(props) {
  const ref = React.useRef(null);
  const [focused, setFocused] = React.useState("");

  setUpClickListeners(clickedIn, clickedOut)

  function clickedIn(event) {
    const target = event.target;

    if (ref.current && ref.current.contains(target)) {
      var node = target

      while (node.parentNode) {
        if (node.dataset && node.dataset.locator === locator) {
          break;
        }

        node = node.parentNode;
      }

      if (node && node.id) {
        setFocused(node.id)
      }
    }
  }

  function clickedOut(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setFocused("")
    }
  }

  function onChange(line, name) {
    let block = props.block;
    block[name] = line;

    props.onChange(block, props.blockKey)
  }

  return(
    <div className={styles.wrapper} key={props.blockKey} ref={ref}>
      {props.blockKey && <React.Fragment>
        { blockText('type', props, focused, onChange) }
        { blockContent(props, focused, onChange) }
        { blockText('link', props, focused, onChange) }
        { blockText('next', props, focused, onChange) }
        { blockObject('transition', props, focused, onChange) }
        { blockObject('styles', props, focused, onChange) }
        { blockText('sequence', props, focused, onChange) }
      </React.Fragment>}
    </div>
  )
}