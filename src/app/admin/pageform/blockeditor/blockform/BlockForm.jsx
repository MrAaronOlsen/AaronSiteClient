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

const blockTypesKey = {
  'text': 'content',
  'rich': 'content',
  'img': 'img_url',
  'wrapper': 'first_child'
}

function setUnfocusEffect(unfocus) {
  React.useEffect(() => {
    document.addEventListener("mousedown", unfocus);

    return () => {
      document.removeEventListener("mousedown", unfocus);
    };
  }, []);
}

export default function BlockForm(props) {
  const ref = React.useRef(null);
  const [focused, setFocused] = React.useState("");

  function unfocus(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setFocused("")
    }
  }

  setUnfocusEffect(unfocus)

  function onChange(line, name) {
    let block = props.block;
    block[name] = line;

    props.onChange(block, props.blockKey)
  }

  const block = function() {
    return props.block || {}
  }

  const blockText = function(name) {
    return <BlockText
      focused={focused}
      focus={setFocused}
      name={name}
      text={block()[name]}
      onChange={onChange} />
  }

  const blockRich = function(name) {
    return <BlockRich
      focused={focused}
      focus={setFocused}
      name={name}
      text={block()[name]}
      blockKey={props.blockKey}
      onChange={onChange} />
  }

  const blockObject = function(name) {
    return <BlockObject
      focused={focused}
      focus={setFocused}
      name={name}
      object={block()[name]}
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

  const blockContent = function() {
    var type = block().type;

    if (type && blockTypes[type]) {
      return blockTypes[type](blockTypesKey[type])
    }

    return null;
  }

  return(
    <div className={styles.wrapper} key={props.blockKey} ref={ref}>
      {props.blockKey && <React.Fragment>
        { blockText('type') }
        { blockContent() }
        { blockText('link') }
        { blockText('next') }
        { blockObject('transition') }
        { blockObject('styles') }
        { blockText('sequence') }
      </React.Fragment>}
    </div>
  )
}