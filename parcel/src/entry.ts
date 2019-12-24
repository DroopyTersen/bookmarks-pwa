import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initFirebase } from "./firebase/firebase";

declare global {
  interface Window {
    firebase: any;
  }
}

initFirebase().then((currentUser) => {
  console.log("Firebase inited", currentUser);
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
});
