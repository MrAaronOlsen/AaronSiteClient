import React, { Component} from "react";
import Page from './page/Page.jsx'

import styles from './editPagesList.mod.scss'

export default class EditPagesList extends Component {

  render() {
    return(
      <div className={styles.wrapper}>
        {this.props.pages.map((page, i) => {
          return <Page key={i}
            page={page}
            watch={this.props.watch}
            focus={this.props.focus}/>
        })}
      </div>
    )
  }
}