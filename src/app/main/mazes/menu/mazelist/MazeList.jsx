import React from "react";
import PropTypes from "prop-types";

import List from "mazes/modules/List.jsx";

import styles from './mazeList.mod.scss'

export default function Menu(props) {

  return (
    <div className={styles.wrapper}>
      <List elements={props.mazes}
        handleClick={props.handleClick} />
    </div>
  )
}