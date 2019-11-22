import React, { Component} from "react";
import GithubLogo from 'public/images/github-mark-32.png';
import styles from "./header.mod.scss";

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  getClasses() {
    return [styles.header].join("")
  }

  render(){
    return(
      <div id='header' className={this.getClasses()}>
        <div className={styles.logo}>Aaron Olsen</div>
        <div className={styles.links}>
          <a href='https://github.com/mraaronolsen' target='_blank'>
            <img src={GithubLogo} />Github
          </a>
        </div>
      </div>
    );
  }
}