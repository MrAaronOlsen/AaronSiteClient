import React from 'react'
import shortid from 'shortid'

import Element from './element/Element.jsx'

import AddButton from 'public/images/add-button.png'
import styles from './blockList.mod.scss'

export default function BlockList(props) {
  const blocks = props.blocks || {};
  const allKeys = Object.keys(blocks);
  const size = allKeys.size;

  var nextBlock;

  function unwindList() {
    if (!blocks) {
      return null;
    }

    if (!blocks[props.start]) {
      return allKeys.map(key => {
        if (blocks[key]) {
          return makeElement(key, blocks[key], -1)
        }
      })
    }

    const ordered = {};
    nextBlock = props.start;

    while (hasNext(ordered));

    allKeys.forEach(key => {
      if (!ordered[key] && blocks[key]) {
        ordered[key] = makeElement(key, blocks[key], -1)
      }
    })

    return Object.values(ordered)
  }

  function hasNext(list, depth = 0) {
    const block = blocks[nextBlock];

    if (!block) {
      return false;
    }

    list[nextBlock] = makeElement(nextBlock, block, depth);

    if (block.first_child) {
      depth += 1
      nextBlock = block.first_child;

      // Recursively call hasNext to expand child blocks.
      while (hasNext(list, depth));

      // Reassign nextBlock to parent block to continue chain.
      nextBlock = block.first_child;
    }

    if (block.modal && blocks[block.modal]) {
      list[block.modal] = makeElement(block.modal, blocks[block.modal], depth + 1);
    }

    // To prevent infinite loops we check if the next block is calling itself or has already been called.
    if (!block.next || block.next === nextBlock || list[block.next]) {
      return false
    } else {
      nextBlock = block.next;
      return true;
    }
  }

  function makeElement(name, block, depth) {

    return <Element key={size + block.id}
      name={name}
      block={block}
      depth={depth}
      focused={props.focused == name}
      renameBlock={props.renameBlock}
      deleteBlock={props.deleteBlock}
      onClick={props.focusBlock} />
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={AddButton} className={styles.addBtn} onClick={props.addBlock}/>
      </div>

      { unwindList() }
    </div>
  )
}