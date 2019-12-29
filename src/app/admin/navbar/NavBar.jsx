import React, { Component} from "react";
import ActionBtn from 'modules/buttons/ActionBtn.jsx'
import styles from './navBar.mod.scss';

class AdminNavBar extends Component {

  handleAction(action) {
    let id = action.currentTarget.dataset.id;

    this.props.handleState({
      page: id
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <ActionBtn text='Pages'
          width='75px'
          dataId="EDIT_PAGES"
          onClick= { this.handleAction.bind(this) }/>

        <ActionBtn text='Clear'
          width='75px'
          classNames={ styles.buttonWrapper }
          dataId="CLEAR_SCREEN"
          onClick= { this.handleAction.bind(this) }/>
      </div>
    )
  }
}

export default AdminNavBar