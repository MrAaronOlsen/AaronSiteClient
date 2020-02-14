import React from 'react'

import ToggleList from 'modules/lists/togglelist/ToggleList.jsx'
import styles from './selectList.mod.scss'

export default function SelectList(props) {
  const textRef = React.useRef(null);
  const headerRef = React.useRef(null);

  const [expandList, setExpandList] = React.useState(false)

  function onClick(name) {
    props.onClick(name)
  }

  function toggleList() {
    setExpandList(!expandList)
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.header} ref={headerRef} onClick={toggleList}>
        <div className={styles.name} ref={textRef} >
          { props.name + ":"}
        </div>
        <div className={styles.selected}>
          { props.selected }
        </div>
      </div>
      <ToggleList classNames={{'list': styles.list}}
        onClick={onClick}
        items={props.items}
        selected={props.selected}
        anchorRef={textRef}
        expand={expandList}
        ignoreRefs={[headerRef]}/>
    </div>
  )
}