import React from 'react'

import { eventListener } from 'effects';
import BlockArray from 'blockform/blockarray/BlockArray.jsx'
import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockBool from 'blockform/blockbool/BlockBool.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockList from 'blockform/blocklist/BlockList.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'

import TransitionProperties from 'modules/transition/TransitionProperties.jsx'
import StyleProperties from './StyleProperties.jsx'
import MotionProperties from 'modules/motion/MotionProperties.jsx'

import { properties, blockContentDisplay, blockContentTypes, blockLists } from './BlockFormConfig.js'

import styles from './blockForm.mod.scss'

export default function BlockForm(props) {
  const ref = React.useRef(null);
  const [focused, setFocused] = React.useState("");

  React.useEffect(eventListener('mousedown', unfocus), [])

  function unfocus(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setFocused("")
    }
  }

  const block = function() {
    return props.block || {}
  }

  const blocks = function() {
    return props.blocks || {}
  }

  function onChange(value, name) {
    let block = props.block;
    block[name] = value;

    props.onChange(block, props.parent)
  }

  const field = function(Block, name) {
    return <Block
      focused={focused}
      focus={setFocused}
      name={name}
      content={block()[name]}
      parent={props.parent}
      items={blockLists(blocks())[name]}
      properties={properties}
      onChange={onChange} />
  }

  const blockContent = function() {
    var type = block().type;

    if (type && blockContentTypes[type]) {
      return field(blockContentTypes[type], blockContentDisplay[type])
    }

    return null;
  }

  return(
    <div className={styles.wrapper} key={props.parent} ref={ref}>
      {props.parent && <React.Fragment>
        <div className={styles.flags}>
          { field(BlockBool, 'hasMotion') }
          { field(BlockBool, 'hasStyles') }
          { field(BlockBool, 'hasLink') }
          { field(BlockBool, 'hasModal') }
        </div>
        { field(BlockList, 'next') }
        { props.parent !== 'start' && field(BlockList, 'type') }
        { blockContent() }
        { block().hasLink && field(BlockText, 'link') }
        { block().hasModal && field(BlockList, 'modal') }
        { block().hasMotion && field(BlockObject, 'motion') }
        { block().hasStyles && field(BlockObject, 'styles') }
        { field(BlockArray, 'test') }
      </React.Fragment>}
    </div>
  )
}