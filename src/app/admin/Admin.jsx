import React, { Component} from "react";

import NavBar from './navbar/NavBar.jsx'
import Pages from './pages/Pages.jsx'

import styles from './admin.mod.scss';

class Admin extends Component {

  state = {
    page: "EDIT_PAGES"
  }

  handleState(state) {
    this.setState(state)
  }

  getPage() {
    if (this.state.page == "EDIT_PAGES") {
      return <Pages />
    } else {
      return
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <NavBar handleState={this.handleState.bind(this)}/>

        <div className={styles.viewWrapper}>
          { this.getPage() }
        </div>
      </div>
    )
  }
}

export default Admin;