import React from "react";

import Element from './element/Element.jsx'
import styles from './pageList.mod.scss'

export default function PageList(props) {

  return(
    <div className={styles.wrapper}>
      <div className={styles.title}>Pages</div>
      <div className={styles.list}>
        {props.pages.map((page, i) => {
          return <Element key={i}
            pageId={page.id}
            header={page.header}
            sequence={page.sequence}
            mode={page.mode}
            focus={props.focus}/>
        })}
      </div>
    </div>
  )
}