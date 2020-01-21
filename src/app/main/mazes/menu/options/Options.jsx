import React from "react";
import PropTypes from "prop-types";

import Input from "mazes/modules/Input.jsx";
import Button from "mazes/modules/Button.jsx";

import styles from './options.mod.scss'

export default function Options(props) {

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.title}>Size</span>
        <Input class={styles.input}
          type="number"
          dataKey="mazeSize"
          value={props.mazeSize}
          handleInput={props.handleInput} />
      </div>

      <div className={styles.row}>
        <span className={styles.title}>Timeout</span>
        <Input class={styles.input}
          type="number"
          dataKey="timeout"
          value={props.timeout}
          handleInput={props.handleInput} />
      </div>

      <div className={styles.row}>
        <Button class={styles.button}
          dataKey="buildMaze"
          handleClick={props.handleCall}
          displayText="Build" />
      </div>
    </div>
  )
}