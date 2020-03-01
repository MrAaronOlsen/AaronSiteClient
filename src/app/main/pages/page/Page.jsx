import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import shortid from 'shortid';

import Logger from 'logger';
import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import MotionExit from 'motion/MotionExit.jsx';
import Motion from 'motion/Motion.jsx';
import { arrowMotion, arrowStyles, headerMotion, headerStyles } from './PageMotionConfigs.js';

import Blocks from 'blocks/Blocks.jsx';

import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
import styles from './page.mod.scss';

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
          <MotionExit trigger={trigger}>
            <Motion key={"arrow"} motion={arrowMotion} classNames={styles.arrowMotion}>
              <ArrowBtn classNames={styles.button}
                size={"32px"}
                direction={'left'}
                onClick={() => setTrigger(!trigger)} />
            </Motion>

            <Motion key={"header"} motion={headerMotion} classNames={styles.headerMotion}>
              {getPage().header}
            </Motion>
          </MotionExit>
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