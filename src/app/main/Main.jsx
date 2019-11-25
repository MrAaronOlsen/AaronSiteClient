import React, { Component} from "react";

import Header from './header/Header.jsx'
import Pages from './pages/Pages.jsx'

import styles from "./main.mod.scss";

export default class Main extends Component {
  render(){
    return(
        <div id='main' className={styles.wrapper}>
          <Header />
          <Pages />
        </div>
    );
  }
}