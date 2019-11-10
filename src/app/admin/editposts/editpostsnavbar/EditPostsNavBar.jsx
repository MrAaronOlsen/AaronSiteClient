import React, { Component} from "react";

import ActionBtn from 'modules/buttons/ActionBtn.jsx';

import styles from './editPostsNavBar.mod.scss';

export default class EditPostsNavBar extends Component {

  render() {
    return(
      <div className={ styles.editPostsNavBarWrapper }>
        <ActionBtn text="Save"
          onClick={this.props.save}/>

      </div>
    )
  }
}