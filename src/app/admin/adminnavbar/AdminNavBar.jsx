import React, { Component} from "react";
import ActionBtn from 'modules/buttons/ActionBtn.jsx'
import styles from './adminNavBar.mod.scss';

class AdminNavBar extends Component {

  handleAction(action) {
    let id = action.currentTarget.dataset.id;

    this.props.handleState({
      page: id
    })
  }

  render() {
    return(
      <div className={styles.adminNavBarWrapper}>
        <ActionBtn text='Edit Blog'
          width='100px'
          dataId="EDIT_BLOG"
          onClick= { this.handleAction.bind(this) }/>

        <ActionBtn text='Clear Screen'
          width='100px'
          classNames={ styles.buttonWrapper }
          dataId="CLEAR_SCREEN"
          onClick= { this.handleAction.bind(this) }/>
      </div>
    )
  }
}

export default AdminNavBar