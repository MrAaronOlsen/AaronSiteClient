import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import List from './list/List.jsx'
import About from './about/About.jsx'
import Portfolio from './portfolio/Portfolio.jsx'
import Stack from './stack/Stack.jsx'

import styles from './pages.mod.scss'

export default class Pages extends Component {

  render(){

    return(
        <div className={styles.wrapper}>
          <Switch>
            <Route path='/pages/about' component={About} />
            <Route path='/pages/portfolio' component={Portfolio} />
            <Route path='/pages/stack' component={Stack} />
            <Route path='/pages' component={List} />

            <Redirect to='/pages' />
          </Switch>
        </div>
    )
  }
}