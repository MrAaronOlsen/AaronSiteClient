import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";

import Logo from "./utils/Logo.js";
Logo.print();

ReactDOM.render(<App />, document.getElementById("root"));