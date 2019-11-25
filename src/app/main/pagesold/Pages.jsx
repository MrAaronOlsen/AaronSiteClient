import React, { Component} from "react";

import PageList from './pagelist/PageList.jsx';
import PageRead from './pageread/PageRead.jsx';

import styles from './pages.mod.scss';

class Pages extends Component {
  state = {
    view: 'LIST_PAGES',
    readPage: ''
  }

  handleState(state) {
    this.setState(state)
  }

  getPage() {
    if (this.state.page == 'READ_PAGE') {
      return <PageRead handleState={this.handleState.bind(this)} pageId={this.state.readPage}/>;
    } else {
      return <PageList handleState={this.handleState.bind(this)} />
    }
  }

  render() {
    return(
      <div id='pages' className={styles.wrapper}>
        {this.getPage()}
      </div>
    )
  }
}

export default Pages