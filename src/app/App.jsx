import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Main from './main/Main.jsx';
import EditBlog from './admin/EditBlog.jsx';

import "./app.scss";

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div className='app'>
          <Switch>
            <Route exact path='/' component={EditBlog}/>
            <Route exact path='/blog' component={Main}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(App);