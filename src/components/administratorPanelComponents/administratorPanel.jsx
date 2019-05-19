import React, { Component } from "react";
import CardPayments from "./cardPayments";
import RequestedPayments from "./requestedPayments";
import "../../styles/administratorPanelStyles/administratorPanel.css";
import { db_config } from "../../config/config";
import firebase from "firebase/app";
import "firebase/database";

class AdministratorPanel extends Component {
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(db_config);
    this.state = {
      viewOption: "CardPayments"
    };
  }

  handleView(value) {
    this.setState({ viewOption: value });
  }
  render() {
    return (
      <div className="administratorPanel">
        <button
          onClick={() => this.handleView("CardPayments")}
          className={`viewOptionButton ${
            this.state.viewOption === "CardPayments" ? "activeButton" : null
          }`}
        >
          Платежи с карты
        </button>
        <button
          onClick={() => this.handleView("RequestedPayments")}
          className={`viewOptionButton ${
            this.state.viewOption === "RequestedPayments"
              ? "activeButton"
              : null
          }`}
        >
          Запрошенные платежи
        </button>

        {this.state.viewOption === "CardPayments" ? (
          <CardPayments app={this.app} />
        ) : (
          <RequestedPayments app={this.app} />
        )}
      </div>
    );
  }
}

export default AdministratorPanel;
