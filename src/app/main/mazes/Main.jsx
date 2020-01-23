import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from 'mazes/header/Header.jsx'
import Menu from 'mazes/menu/Menu.jsx'
import Screen from 'mazes/screen/Screen.jsx'

import Random from 'mazes/lib/core/Random.js'

import styles from './main.mod.scss'

export default class Main extends Component {
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
    this.selectMaze = this.selectMaze.bind(this);
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

  selectMaze(maze) {
    this.handleState('maze', maze)
  }

  handleCall(event) {
    var method = event.target.dataset.key;
    this.methods[method].call(this)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.maze}>
          <Menu
            handleInput={this.handleInput}
            selectMaze={this.selectMaze}
            selected={this.state.maze}
            handleCall={this.handleCall}
            mazeSize={this.state.mazeSize}
            timeout={this.state.timeout} />

          <Screen handleState={this.handleState} />
        </div>
      </div>
    )
  }
}