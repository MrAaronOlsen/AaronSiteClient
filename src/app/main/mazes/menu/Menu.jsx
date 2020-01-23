import React from "react";
import PropTypes from "prop-types";

import MazeList from "mazes/menu/mazelist/MazeList.jsx";
import Options from "mazes/menu/options/Options.jsx";

import styles from './menu.mod.scss'

export default function Menu(props) {

  return (
    <div className={styles.wrapper}>
      <MazeList selected={props.selected} selectMaze={props.selectMaze}/>

      <Options
        handleInput={props.handleInput}
        handleCall={props.handleCall}
        mazeSize={props.mazeSize}
        timeout={props.timeout} />
    </div>
  )
}

Menu.propTypes = {
  selectMaze: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleCall: PropTypes.func.isRequired,
  mazeSize: PropTypes.number,
  timeout: PropTypes.number,
};