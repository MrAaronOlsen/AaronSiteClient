import React, { Component} from "react";
import GithubLogo from 'public/images/github-mark-32.png';
import LinkedinLogo from 'public/images/linkedin-mark-32.png';
import styles from "./header.mod.scss";

export default function Header(props) {

  return(
    <div className={styles.header}>
      <a href='http://www.aaron-olsen.com' className={styles.logo}>Aaron Olsen</a>
      <div className={styles.links}>
        <div className={styles.link}>
          <a href='https://github.com/mraaronolsen' target='_blank'>
            <img src={GithubLogo} className={styles.circle}/>
          </a>
        </div>
        <div className={styles.link}>
          <a href='https://www.linkedin.com/in/mraaronolsen/' target='_blank'>
            <img src={LinkedinLogo} />
          </a>
        </div>
      </div>
    </div>
  )
}