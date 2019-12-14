import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";

import Authentication from 'auth/Authentication.js';
window.logIn = Authentication.logIn;

import Logo from "./utils/Logo.js";
Logo.print();

ReactDOM.render(<App />, document.getElementById("root"));