import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import List from './list/List.jsx'
import Page from './page/Page.jsx'

import styles from './pages.mod.scss'

export default class Pages extends Component {

  render(){

    return(
        <div className={styles.wrapper}>
          <Switch>
            <Route path='/pages/about' component={ (props) => <Page {...props} query='pages?slug=about' /> } />
            <Route path='/pages/portfolio' component={ (props) => <Page {...props} query='pages?slug=portfolio' /> } />
            <Route path='/pages/stack' component={ (props) => <Page {...props} query='pages?slug=stack' /> } />
            <Route path='/pages' component={List} />

            <Redirect to='/pages' />
          </Switch>
        </div>
    )
  }
}