import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './main/Main.jsx';
import Admin from './admin/Admin.jsx';

import "./root.scss";
import styles from "./app.mod.scss";

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div id='app' className={styles.app}>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/admin' component={Admin}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;