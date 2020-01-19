import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "maze/modules/Input.jsx";
import Button from "maze/modules/Button.jsx";
import List from "maze/modules/List.jsx";

import styles from './menu.mod.scss'

class Menu extends Component {

  render() {
    return (
      <div className={styles.menu}>
        <div className={styles['menu-box']}>
          <div className={styles['menu-row']}>
            <List elements={this.props.mazeList}
              handleClick={this.props.handleClick} />
          </div>

          <div className={styles.options}>
            <div className={styles['menu-row']}>
              <span className={styles['menu-title']}>Size</span>
              <Input class={styles.input}
                type="number"
                dataKey="mazeSize"
                value={this.props.mazeSize}
                handleInput={this.props.handleInput} />
            </div>

            <div className={styles['menu-row']}>
              <span className={styles['menu-title']}>Timeout</span>
              <Input class={styles.input}
                type="number"
                dataKey="timeout"
                value={this.props.timeout}
                handleInput={this.props.handleInput} />
            </div>

            <div className={styles['menu-row']}>
              <Button class={styles["menu-button"]}
                dataKey="buildMaze"
                handleClick={this.props.handleCall}
                displayText="Build" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleCall: PropTypes.func.isRequired,
  mazeList: PropTypes.array,
  mazeSize: PropTypes.number,
  timeout: PropTypes.number,
};

export default Menu;