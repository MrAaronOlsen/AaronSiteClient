import React from 'react'

import { eventListener } from 'effects';

import BlockArray from 'blockform/blockarray/BlockArray.jsx'
import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockBool from 'blockform/blockbool/BlockBool.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockList from 'blockform/blocklist/BlockList.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'
import ActionField from 'blockform/modules/action/ActionField.jsx'

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

  const getBlock = function() {
    return props.block || {}
  }

  const getBlocks = function() {
    return props.blocks || {}
  }

  function onChange(value, name) {
    const block = getBlock();
    block[name] = value;

    props.onChange(block, props.root)
  }

  const field = function(Field, name) {
    return <Field {...props}
      focused={focused}
      focus={setFocused}
      name={name}
      content={getBlock()[name]}
      items={blockLists(getBlocks())[name]}
      properties={properties}
      onChange={onChange} />
  }

  const blockContent = function() {
    var type = getBlock().type;

    if (type && blockContentTypes[type]) {
      return field(blockContentTypes[type], blockContentDisplay[type])
    }

    return null;
  }

  const applyTemplate = function() {
    const block = getBlock();
    const blocks = getBlocks();

    if (block.template && blocks[block.template]) {
      const template = blocks[block.template]

      block.styles = JSON.parse(JSON.stringify(template.styles));
      block.motion = JSON.parse(JSON.stringify(template.motion));

      props.onChange(block, props.root)
    }
  }

  return(
    <div name={"form"} className={styles.wrapper} key={props.root} ref={ref}>
      {props.root && <React.Fragment>
        <div className={styles.flags}>
          { field(BlockBool, 'hasMotion') }
          { field(BlockBool, 'hasStyles') }
          { getBlock().type === 'wrapper' && field(BlockBool, 'hasLink') }
          { field(BlockBool, 'isTemplate') }
        </div>
        { !getBlock().isTemplate && field(BlockList, 'next') }
        { !getBlock().isTemplate && props.root !== 'start' && field(BlockList, 'type') }
        { blockContent() }
        { getBlock().hasLink && field(BlockText, 'link') }
        { getBlock().hasModal && field(BlockList, 'modal') }
        { getBlock().hasMotion && field(BlockObject, 'motion') }
        { getBlock().hasStyles && field(BlockObject, 'styles') }
        { !getBlock().isTemplate && action(field(BlockList, 'template'), applyTemplate) }
      </React.Fragment>}
    </div>
  )
}

function action(field, callback) {
  return (
    <ActionField action={callback}>
      {field}
    </ActionField>
  )
}