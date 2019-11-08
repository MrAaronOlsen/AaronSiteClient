import React, { Component} from "react";

import AdminNavBar from './AdminNavBar.jsx'
import styles from './admin.mod.scss';

class Admin extends Component {

  render() {
    return (
      <div className={styles.adminWrapper}>
        <AdminNavBar />

        <div className={styles.adminWindow}>
        </div>
      </div>
    )
  }
}

export default Admin;