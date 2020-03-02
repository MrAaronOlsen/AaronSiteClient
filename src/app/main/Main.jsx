import React, { Component} from "react";
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './header/Header.jsx'
import Pages from './pages/Pages.jsx'
import Maze from 'mazes/Main.jsx'
import SpaceInvaders from 'games/SpaceInvaders.jsx'

import styles from "./main.mod.scss";

export default class Main extends Component {
  render(){
    return(
      <div id='main' className={styles.wrapper}>
        <Header />
        <Switch>
          <Route path='/maze' component={Maze} />
          <Route path='/spaceinvaders' component={SpaceInvaders} />
          <Route path='/' component={Pages} />
        </Switch>
      </div>
    );
  }
}