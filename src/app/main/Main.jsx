import React, { Component} from "react";
import Header from './header/Header.jsx'

import styles from "./main.mod.scss";

export default class Main extends Component {
  render(){
    return(
      <div className={styles.main}>
        <Header />
      </div>
    );
  }
}