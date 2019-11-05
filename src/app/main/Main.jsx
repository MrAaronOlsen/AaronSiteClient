import React, { Component} from "react";
import Header from './header/Header.jsx'

import "./main.scss";

export default class Main extends Component {
  render(){
    return(
      <div className='main'>
        <Header />
      </div>
    );
  }
}