import React from "react";

import PageList from './pagelist/PageList.jsx';
import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import styles from './menuBar.mod.scss';

export default function MenuBar(props) {

  return(
    <div className={ styles.wrapper }>
      <PageList
        pages={props.pages}
        focus={props.focus} />

      {props.pageId && <ActionBtn text="Save"
        classNames={styles.button}
        onClick={props.save} />}

      {props.pageId && <ActionBtn text="Check Out"
        classNames={styles.button}
        onClick={{}} />}

      {props.pageId && <ActionBtn text="Delete"
          classNames={styles.button}
          onClick={props.delete} />}

      <ActionBtn text="New"
        classNames={styles.button}
        onClick={props.new} />
    </div>
  )
}