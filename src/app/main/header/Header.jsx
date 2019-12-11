import React, { Component} from "react";
import GithubLogo from 'public/images/github-mark-32.png';
import styles from "./header.mod.scss";

export default function Header(props) {

  return(
    <div className={styles.header}>
      <div className={styles.logo}>Aaron Olsen</div>
      <div className={styles.links}>
        <a href='https://github.com/mraaronolsen' target='_blank'>
          <img src={GithubLogo} />Github
        </a>
      </div>
    </div>
  )
}