import React, { Component} from "react";

import AdminNavBar from './adminnavbar/AdminNavBar.jsx'
import EditPosts from './editposts/EditPosts.jsx'

import styles from './admin.mod.scss';

class Admin extends Component {

  state = {
    page: "EDIT_BLOG"
  }

  handleState(state) {
    this.setState(state)
  }

  getPage() {
    if (this.state.page == "EDIT_BLOG") {
      return <EditPosts />
    } else {
      return
    }
  }

  render() {
    return (
      <div className={styles.adminWrapper}>
        <AdminNavBar handleState={this.handleState.bind(this)}/>

        <div className={styles.adminWindow}>
          { this.getPage() }
        </div>
      </div>
    )
  }
}

export default Admin;