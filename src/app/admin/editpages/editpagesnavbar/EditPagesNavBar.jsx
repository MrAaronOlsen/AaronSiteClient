import React, { Component} from "react";

import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import TextInput from 'modules/textinput/TextInput.jsx';

import styles from './editPagesNavBar.mod.scss';

export default class EditPagesNavBar extends Component {

  render() {
    return(
      <div className={ styles.wrapper }>
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