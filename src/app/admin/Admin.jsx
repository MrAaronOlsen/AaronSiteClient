import React, { Component} from "react";
import ActionBtn from 'modules/buttons/ActionBtn.jsx'
import styles from './admin.mod.scss';

class Admin extends Component {
  state = {
    page: ""
  }

  goToBlog() {
    console.log("Click")
  }

  render() {
    return (
      <div className={styles.adminWrapper}>
        <ActionBtn text='Edit Blog'
          width='100px'
          onClick= { this.goToBlog.bind(this) }/>
      </div>
    )
  }
}

export default Admin;