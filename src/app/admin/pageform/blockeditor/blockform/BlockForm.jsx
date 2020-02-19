import React from 'react'

import { eventListener } from 'effects';

import BlockArray from 'blockform/blockarray/BlockArray.jsx'
import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockBool from 'blockform/blockbool/BlockBool.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockList from 'blockform/blocklist/BlockList.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'

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

    props.onChange(block, props.root)
  }

  const field = function(Block, name) {
    return <Block {...props}
      focused={focused}
      focus={setFocused}
      name={name}
      content={block()[name]}
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
    <div name={"form"} className={styles.wrapper} key={props.root} ref={ref}>
      {props.root && <React.Fragment>
        <div className={styles.flags}>
          { field(BlockBool, 'hasMotion') }
          { field(BlockBool, 'hasStyles') }
          { block().type === 'wrapper' && field(BlockBool, 'hasLink') }
          { field(BlockBool, 'isTemplate') }
        </div>
        { field(BlockList, 'next') }
        { props.root !== 'start' && field(BlockList, 'type') }
        { blockContent() }
        { block().hasLink && field(BlockText, 'link') }
        { block().hasModal && field(BlockList, 'modal') }
        { block().hasMotion && field(BlockObject, 'motion') }
        { block().hasStyles && field(BlockObject, 'styles') }
        { field(BlockList, 'template') }
      </React.Fragment>}
    </div>
  )
}