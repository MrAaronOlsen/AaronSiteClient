import React, { Component} from "react";

import PostsList from './postslist/PostsList.jsx';
import PostRead from './postread/PostRead.jsx';
import styles from './posts.mod.scss';

class Posts extends Component {
  state = {
    page: "",
    readPost: "57"
  }

  handleState(state) {
    this.setState(state)
  }

  getPage() {
    if (this.state.page == "READ_POST") {
      return <PostRead handleState={this.handleState.bind(this)} postId={this.state.readPost}/>;
    } else {
      return <PostsList handleState={this.handleState.bind(this)} />
    }
  }

  render() {
    return(
      <div id='posts' className={styles.postsWrapper}>
        {this.getPage()}
      </div>
    )
  }
}

export default Posts