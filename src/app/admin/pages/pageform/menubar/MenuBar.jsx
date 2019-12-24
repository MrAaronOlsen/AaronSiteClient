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

      {props.pageId && props.mode && props.mode != 'published' &&
        <ActionBtn text="Save"
          classNames={styles.button}
          onClick={props.save} />}

      {props.pageId && props.mode != 'published' && props.mode != 'checked_out' &&
        <ActionBtn text="Publish"
          classNames={styles.button}
          onClick={props.publish} />}

      {props.pageId && props.mode == 'published' &&
        <ActionBtn text="Unpublish"
          classNames={styles.button}
          onClick={props.unpublish} />}

      {props.pageId && props.mode && props.mode == 'published' &&
        <ActionBtn text="Check Out"
          classNames={styles.button}
          onClick={props.checkOut} />}

      {props.pageId && props.mode && props.mode == 'checked_out' &&
        <ActionBtn text="Check In"
          classNames={styles.button}
          onClick={props.checkIn} />}

      {props.pageId && props.mode && props.mode != 'published' &&
        <ActionBtn text="Delete"
          classNames={styles.button}
          onClick={props.delete} />}

      <ActionBtn text="New"
        classNames={styles.button}
        onClick={props.new} />
    </div>
  )
}