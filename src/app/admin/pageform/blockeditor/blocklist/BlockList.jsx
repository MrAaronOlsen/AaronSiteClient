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

    if (!blocks[props.start]) {
      return buildList(Object.keys(blocks));
    }

    const list = new Set();
    nextBlock = props.start;

    while (hasNext(list)) {
      // Does nothing
    }

    const allKeys = Object.keys(blocks);

    allKeys.forEach(key => {
      if (!list.has(key)) {
        list.add(key)
      }
    })

    return buildList(list)
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