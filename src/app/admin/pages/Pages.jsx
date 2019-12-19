import React from "react";

import PageForm from './pageform/PageForm.jsx'
import styles from './pages.mod.scss';

export default function EditPages(props) {

  return (
    <div className={styles.wrapper}>
      <PageForm />
    </div>
  )
}