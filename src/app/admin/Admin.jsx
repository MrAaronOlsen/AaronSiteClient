import React, { Component} from "react";

import NavBar from './navbar/NavBar.jsx'
import PageForm from './pageform/PageForm.jsx';

import styles from './admin.mod.scss';

export default function Admin(props) {


  return (
    <div className={styles.wrapper}>
      <PageForm />
    </div>
  )
}