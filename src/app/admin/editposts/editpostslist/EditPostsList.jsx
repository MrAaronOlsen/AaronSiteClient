import React, { Component} from "react";
import EditPost from './editpost/EditPost.jsx'

import styles from './editPostsList.mod.scss'

export default class EditPostsList extends Component {

  render() {
    return(
      <div className={styles.editPostsListWrapper}>
        {this.props.posts.map((post) => {
          return <EditPost key={post.id}
            post={post}
            focusPost={this.props.focusPost}/>
        })}
      </div>
    )
  }
}