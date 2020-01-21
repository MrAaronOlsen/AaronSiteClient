import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import List from './list/List.jsx'
import Page from './page/Page.jsx'
import Maze from 'mazes/Main.jsx'

import styles from './pages.mod.scss'

export default function Pages(props) {

  return(
      <div className={styles.wrapper}>
        <Switch>
          <Route path='/pages/:page' component={Page} />
          <Route path='/pages' component={List} />
          <Route path='/maze' component={Maze} />
          <Redirect to='/pages' />
        </Switch>
      </div>
  )
}