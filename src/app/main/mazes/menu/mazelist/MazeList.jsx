import React from "react";
import PropTypes from "prop-types";

import Mazes from 'mazes/lib/mazes/Mazes.js'
import List from "mazes/modules/List.jsx";

import styles from './mazeList.mod.scss'

export default function Menu(props) {

  return (
    <div className={styles.wrapper}>
      <List
        elements={Mazes.getMenuList()}
        handleClick={props.handleClick} />
    </div>
  )
}