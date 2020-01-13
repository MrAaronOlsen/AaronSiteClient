import React from 'react'
import shortid from 'shortid'

import Element from './element/Element.jsx'

import AddButton from 'public/images/add-button.png'
import styles from './blockList.mod.scss'

export default function BlockList(props) {
  const blocks = props.blocks;
  var nextBlock;

  function unwindList() {
    if (!blocks) {
      return null;
    }

    const allKeys = Object.keys(blocks);

    if (!blocks[props.start]) {
      return buildList(allKeys);
    }

    const ordered = new Set();
    nextBlock = props.start;

    while (hasNext(ordered));

    allKeys.forEach(key => {
      if (!ordered.has(key)) {
        ordered.add(key)
      }
    })

    return buildList(ordered)
  }

  function buildList(keys) {
    return (
      [...keys].map((name, i) => {

        if (blocks[name]) {
          return <Element key={keys.length + blocks[name].id}
            name={name}
            focused={props.focused == name}
            renameBlock={props.renameBlock}
            deleteBlock={props.deleteBlock}
            onClick={props.focusBlock} />
        }
      })
    )
  }

  function hasNext(list) {
    list.add(nextBlock)
    const block = props.blocks[nextBlock]

    // To prevent infinite loops we check if the next block is calling itself or has already been called.
    if (!block || !block.next || block.next === nextBlock || list.has(block.next)) {
      return false
    } else {
      nextBlock = block.next;
      return true;
    }
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