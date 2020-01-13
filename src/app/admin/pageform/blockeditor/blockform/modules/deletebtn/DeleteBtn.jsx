import React from 'react'
import shortid from 'shortid'

import DeleteBtn from 'public/images/delete-button.png'
import styles from './deleteBtn.mod.scss'

export default function BlockText(props) {
  const ref = React.useRef(null);

  React.useEffect(setFocus, [props.focused]);

  function setFocus() {
    if (!ref.current) {
      return;
    }

    if (props.focused === props.parentId) {
      ref.current.style.opacity = "0.5"
    } else {
      ref.current.style.opacity = "0.0"
    }
  }

  return(
    <img src={DeleteBtn} className={styles.wrapper} onClick={props.onClick} ref={ref}/>
  )
}