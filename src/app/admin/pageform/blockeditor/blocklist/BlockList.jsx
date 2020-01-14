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

    const ordered = {};
    nextBlock = props.start;

    while (hasNext(ordered));

    allKeys.forEach(key => {
      if (!ordered[key]) {
        ordered[key] = 0
      }
    })

    return buildList(ordered)
  }

  function buildList(ordered) {
    const names = Object.keys(ordered);
    return (
      names.map((name, i) => {

        if (blocks[name]) {
          return <Element key={names.size + blocks[name].id}
            name={name}
            depth={ordered[name]}
            focused={props.focused == name}
            renameBlock={props.renameBlock}
            deleteBlock={props.deleteBlock}
            onClick={props.focusBlock} />
        }
      })
    )
  }

  function hasNext(list, depth = 0) {
    list[nextBlock] = depth;
    const block = props.blocks[nextBlock]

    if (!block) {
      return false;
    }

    if (block.first_child) {
      depth += 1
      nextBlock = block.first_child;
      while (hasNext(list, depth));
      nextBlock = block.first_child;
    }

    // To prevent infinite loops we check if the next block is calling itself or has already been called.
    if (!block.next || block.next === nextBlock || list[block.next]) {
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