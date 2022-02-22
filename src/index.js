import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOn4psTFpWwPUeAln3MPyW6lu999SkAzw",
  authDomain: "spoilerphobia-2cf02.firebaseapp.com",
  projectId: "spoilerphobia-2cf02",
  storageBucket: "spoilerphobia-2cf02.appspot.com",
  messagingSenderId: "1087577037695",
  appId: "1:1087577037695:web:aa89a824046bcc5993984a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const apiKey = "1fc19e2dfd89d668063919143edc6e68";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
