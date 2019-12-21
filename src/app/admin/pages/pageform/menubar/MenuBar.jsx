import React from "react";

import PageList from './pagelist/PageList.jsx';
import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import styles from './menuBar.mod.scss';

export default function MenuBar(props) {

  return(
    <div className={ styles.wrapper }>
      <ActionBtn text="Save"
        classNames={styles.button}
        onClick={props.save} />

      <ActionBtn text="New"
        classNames={styles.button}
        onClick={props.new} />

      <PageList
        pages={props.pages}
        focus={props.focus} />

      <ActionBtn text="delete"
          classNames={styles.button}
          onClick={props.delete} />
    </div>
  )
}