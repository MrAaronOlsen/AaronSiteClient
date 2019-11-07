import React, { Component} from "react";

import styles from "./header.mod.scss";

export default class Header extends Component {
  render(){
    return(
      <div className={styles.header}>Aaron Olsen</div>
    );
  }
}