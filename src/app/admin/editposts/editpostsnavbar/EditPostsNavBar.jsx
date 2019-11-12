import React, { Component} from "react";

import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import TextInput from 'modules/textinput/TextInput.jsx';

import styles from './editPostsNavBar.mod.scss';

export default class EditPostsNavBar extends Component {

  render() {
    return(
      <div className={ styles.editPostsNavBarWrapper }>
        <ActionBtn text="Save"
          classNames={styles.button}
          onClick={this.props.save}/>

        <ActionBtn text="New"
          classNames={styles.button}
          onClick={this.props.new}/>

        <ActionBtn text="Delete"
          classNames={styles.button}
          onClick={this.props.delete}/>

      </div>
    )
  }
}