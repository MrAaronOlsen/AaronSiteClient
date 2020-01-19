import React, { Component } from "react";
import ReactDOM from "react-dom";

import Run from 'maze/run/Run.jsx'
import Menu from 'maze/menu/Menu.jsx'
import Mazes from 'maze/lib/mazes/Mazes.js'

import Random from 'maze/lib/core/Random.js'

import styles from './maze.mod.scss'

export default class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mazeSize: 10,
      timeout: 20,
      maze: null
    };

    this.methods = {
      buildMaze: function() { this.state.buildMaze(this.state.maze, this.state.mazeSize, this.state.timeout) }
    }

    this.handleState = this.handleState.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCall = this.handleCall.bind(this);
  }

  handleState(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleInput(event) {
    var value = event.target.value;
    var key = event.target.dataset.key;

    if (event.target.type === 'number') {
      value = Number.parseInt(value);
    }

    this.handleState(key, value)
  }

  handleClick(event) {
    var value = event.target.dataset.value;
    var key = event.target.dataset.key;

    this.handleState(key, value)
  }

  handleCall(event) {
    var method = event.target.dataset.key;
    this.methods[method].call(this)
  }

  render() {
    return (
      <div id="main-window" className={styles.wrapper}>
        <Menu
          handleInput={this.handleInput}
          handleClick={this.handleClick}
          handleCall={this.handleCall}
          mazeList={Mazes.getMenuList()}
          mazeSize={this.state.mazeSize}
          timeout={this.state.timeout} />

        <Run handleState={this.handleState} />
      </div>
    )
  }
}