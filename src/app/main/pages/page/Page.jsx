import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import shortid from 'shortid';

import Logger from 'logger';
import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import MotionExit from 'motion/MotionExit.jsx';
import Blocks from 'blocks/Blocks.jsx'
import Transition from 'modules/transition/Transition.jsx'
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx'

import styles from './page.mod.scss'

const arrowTransitionConfig = {
  transProperty: 'left',
  startValue: '-100vw',
  inValue: '0',
  outValue: '-100vw',
  transDurationIn: '1000ms'
}

const arrowStyles = {
  'position': 'absolute',
  'width': 'auto',
  'z-index': '999'
}

const headerTransitionConfig = {
  transProperty: 'opacity',
  startValue: '0',
  inValue: '1',
  outValue: '0',
  transDurationIn: '1000ms'
}

const headerStyles = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  width: '100%',
  'font-size': '24px'
}

export default function Page(props) {
  const [id] = React.useState(shortid.generate())
  const [page, setPage] = React.useState({})
  const [trigger, setTrigger] = React.useState(true)
  const [redirect, setRedirect] = React.useState(false)

  React.useEffect(() => load(), [])

  function getPage() {
    return page || {}
  }

  function getBlocks() {
    return getPage().blocks || {}
  }

  function load() {
    const query = 'pages/' + props.location.state.id

    GET(API_V1 + query, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load page. Cause: " + payload.getErrors());
      } else {
        setPage(payload.getFirst())
      }
    })
  }

  function renderPage() {
    if (redirect) {
      return <Redirect to='/pages' />
    }

    if (!page) {
      return null
    }

    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Transition
            styles={arrowStyles}
            config={arrowTransitionConfig}
            outTrigger={trigger}>

            <ArrowBtn classNames={styles.button}
              direction={'left'}
              onClick={() => setTrigger(!trigger)} />

          </Transition>
          <Transition
            styles={headerStyles}
            config={headerTransitionConfig}
            outTrigger={trigger}>

            {getPage().header}
          </Transition>
        </div>
        <div className={styles.blocks}>
          <MotionExit trigger={trigger} onExit={() => setRedirect(true)} >
            <Blocks key={id} {...props}
              blocks={getBlocks()}
              start={'start'} />
          </MotionExit>
        </div>
      </div>
    )
  }

  return renderPage();
}