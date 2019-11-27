import React, { Component} from "react";

import PageList from './pagelist/PageList.jsx';
import ActionBtn from 'modules/buttons/ActionBtn.jsx';
import styles from './menuBar.mod.scss';

export default class MenuBar extends Component {

  render() {
    return(
      <div className={ styles.wrapper }>
        <ActionBtn text="Save"
          classNames={styles.button}
          onClick={this.props.save} />

        <ActionBtn text="New"
          classNames={styles.button}
          onClick={this.props.new} />

        <PageList reload={this.props.reload}
          focus={this.props.focus} />
      </div>
    )
  }
}