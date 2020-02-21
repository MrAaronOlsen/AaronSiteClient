import React from 'react'

import Logger from 'logger';
import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import Element from './element/Element.jsx'

import styles from './list.mod.scss'

export default function List(props) {
  const [elements, setElements] = React.useState([])

  React.useEffect(loadPage, [])

  function loadPage() {
    GET(API_V1 + 'pages?mode=published&fields=id,header,caption,slug&sort=sequence', (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load pages. Cause: " + payload.getErrors());
      } else {
        if (payload.getData()) {
          setElements(payload.getData())
        }
      }
    })
  }

  return(
    <div className={styles.wrapper}>
      {elements.map((element, i) => {
        return(
          <Element key={i}
            element={element}
            index={i}
            history={props.history} /> )
      })}
    </div>
  )
}