import React, { Component} from "react";
import ActionBtn from 'modules/buttons/ActionBtn.jsx'
import styles from './adminNavBar.mod.scss';

class AdminNavBar extends Component {

  goToBlog() {
    console.log("Click")
  }

  render() {
    return(
      <div className={styles.adminNavBarWrapper}>
        <ActionBtn text='Edit Blog'
          width='100px'
          onClick= { this.goToBlog.bind(this) }/>
      </div>
    )
  }
}

export default AdminNavBar