import React from "react";
import PropTypes from "prop-types";

import styles from './header.mod.scss'

export default function Header(props) {

  return (
    <div className={styles.wrapper}>
      Maze Generator
    </div>
  )
}