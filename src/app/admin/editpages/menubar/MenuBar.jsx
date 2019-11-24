import React, { Component} from "react";

import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import styles from './menuBar.mod.scss';

export default class MenuBar extends Component {

  render() {
    return(
      <div className={ styles.wrapper }>
        <ActionBtn text="Save"
          classNames={styles.button}
          onClick={this.props.save}/>

        <ActionBtn text="New"
          classNames={styles.button}
          onClick={this.props.new}/>
      </div>
    )
  }
}