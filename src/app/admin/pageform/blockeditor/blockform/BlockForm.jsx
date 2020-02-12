import React from 'react'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockBool from 'blockform/blockbool/BlockBool.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockList from 'blockform/blocklist/BlockList.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'

import TransitionProperties from 'modules/transition/TransitionProperties.jsx'
import StyleProperties from './StyleProperties.jsx'
import MotionProperties from 'modules/motion/MotionProperties.jsx'

import styles from './blockForm.mod.scss'

const properties = {
  'transition': TransitionProperties,
  'styles': StyleProperties,
  ':hover': StyleProperties,
  ':action': StyleProperties,
  'motion': MotionProperties
}

const blockContentDisplay = {
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

  function onChange(value, name) {
    let block = props.block;
    block[name] = value;

    console.log(JSON.stringify(block))

    props.onChange(block, props.blockKey)
  }

  const block = function() {
    return props.block || {}
  }

  const blocks = function() {
    return props.blocks || {}
  }

  const blockText = function(name) {
    return <BlockText
      focused={focused}
      focus={setFocused}
      name={name}
      text={block()[name]}
      onChange={onChange} />
  }

  const blockBool = function(name) {
    return <BlockBool
      name={name}
      checked={block()[name]}
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

  const blockList = function(name) {
    return <BlockList
      focused={focused}
      focus={setFocused}
      name={name}
      text={block()[name]}
      properties={blockLists[name]}
      onChange={onChange} />
  }

  const blockObject = function(name) {
    return <BlockObject
      focused={focused}
      focus={setFocused}
      name={name}
      object={block()[name]}
      blockKey={props.blockKey}
      properties={properties}
      onChange={onChange} />
  }

  const blockContentTypes = {
    'text': blockText,
    'rich': blockRich,
    'img': blockText,
    'wrapper': blockList
  }

  const blockLists = {
    'type': Object.keys(blockContentTypes),
    'next': Object.keys(blocks()),
    'first_child': Object.keys(blocks()),
    'modal': Object.keys(blocks())
  }

  const blockContent = function() {
    var type = block().type;

    if (type && blockContentTypes[type]) {
      return blockContentTypes[type](blockContentDisplay[type])
    }

    return null;
  }

  return(
    <div className={styles.wrapper} key={props.blockKey} ref={ref}>
      {props.blockKey && <React.Fragment>
        <div className={styles.flags}>
          { blockBool('hasMotion') }
          { blockBool('hasStyles') }
          { blockBool('hasLink') }
          { blockBool('hasModal') }
        </div>
        { blockList('next') }
        { props.blockKey !== 'start' && blockList('type') }
        { blockContent() }
        { block().hasLink && blockText('link') }
        { block().hasModal && blockList('modal') }
        { block().hasMotion && blockObject('motion') }
        { block().hasStyles && blockObject('styles') }
      </React.Fragment>}
    </div>
  )
}