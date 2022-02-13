import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOn4psTFpWwPUeAln3MPyW6lu999SkAzw",
  authDomain: "spoilerphobia-2cf02.firebaseapp.com",
  projectId: "spoilerphobia-2cf02",
  storageBucket: "spoilerphobia-2cf02.appspot.com",
  messagingSenderId: "1087577037695",
  appId: "1:1087577037695:web:aa89a824046bcc5993984a",
};

export const firebaseApp = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
