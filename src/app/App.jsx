import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './main/Main.jsx';
import Admin from './admin/Admin.jsx';

import "./root.scss";
import styles from "./app.mod.scss";

const App = function() {
  return(
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <div id='app' className={styles.wrapper}>
          <Switch>
            <Route exact path='/admin' component={Admin}/>
            <Route path='/' component={Main} />
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>

  )
}

export default App;