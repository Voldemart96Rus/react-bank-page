import React, { Component } from "react";
import MainPage from "./components/mainPage";
import "./App.css";
import { db_config } from "./config/config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(db_config);
    this.database = this.app
      .database()
      .ref()
      .child("card-payments");
    this.database = this.app
      .database()
      .ref()
      .child("requested-payments");

    // this.database.push().set({ test: "test" });
  }

  render() {
    return (
      <div className="sitePageWrapper">
        <div className="sitePage">
          <button />
          <MainPage app={this.app} />
        </div>
      </div>
    );
  }
}

export default App;
