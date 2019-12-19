import React from 'react'
import shortid from 'shortid'

import Element from './element/Element.jsx'

import AddButton from 'public/images/add-button.png'
import styles from './blockList.mod.scss'

export default function BlockList(props) {

  function unwindList() {
    var blocks = props.blocks;
    if (!blocks) {
      return null;
    }

    var blockKeys = Object.keys(blocks).sort(function(a, b) {
      return blocks[a].sequence - blocks[b].sequence
    });

    return (
      blockKeys.map((name, i) => {
        var block = blocks[name];

        return <Element key={blockKeys.length + block.id}
          name={name}
          focused={props.focused == name}
          moveBlock={props.moveBlock}
          deleteBlock={props.deleteBlock}
          onClick={props.focusBlock} />
      })
    )
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={AddButton} onClick={props.addBlock}/>
      </div>

      { unwindList() }
    </div>
  )
}