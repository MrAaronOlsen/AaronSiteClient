import React, { Component} from "react";

import AdminNavBar from './adminnavbar/AdminNavBar.jsx'
import EditPages from './editPages/EditPages.jsx'

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
      return <EditPages />
    } else {
      return
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <AdminNavBar handleState={this.handleState.bind(this)}/>

        <div className={styles.viewWrapper}>
          { this.getPage() }
        </div>
      </div>
    )
  }
}

export default Admin;