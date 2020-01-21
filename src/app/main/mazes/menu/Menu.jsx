import React from "react";
import PropTypes from "prop-types";

import MazeList from "mazes/menu/mazelist/MazeList.jsx";
import Options from "mazes/menu/options/Options.jsx";

import styles from './menu.mod.scss'

export default function Menu(props) {

  return (
    <div className={styles.wrapper}>
      <MazeList mazes={props.mazeList} handleClick={props.handleClick}/>
      <Options {...props}/>
    </div>
  )
}

Menu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleCall: PropTypes.func.isRequired,
  mazeList: PropTypes.array,
  mazeSize: PropTypes.number,
  timeout: PropTypes.number,
};