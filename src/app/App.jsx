import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Main = React.lazy(() => import('./main/Main.jsx'));
const Admin = React.lazy(() => import('./admin/Admin.jsx'));

import "./root.scss";
import styles from "./app.mod.scss";

const App = function() {
  return(
    <BrowserRouter>
      <div id='app' className={styles.wrapper}>
        <Switch>
          <Route exact path='/admin' component={Admin}/>
          <Route path='/' component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;