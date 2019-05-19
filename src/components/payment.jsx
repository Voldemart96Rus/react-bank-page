import React, { Component } from "react";
import MakePayment from "./makePayment";
import RequestPayment from "./requestPayment";
import "../styles/payment.css";
import { db_config } from "../config/config";
import firebase from "firebase/app";
import "firebase/database";

class Payment extends Component {
  constructor(props) {
    super(props);

    // this.app = firebase.initializeApp(db_config);
    // this.database = this.app
    //   .database()
    //   .ref()
    //   .child("bankCardPayment");

    this.state = {
      paymentOption: "MakePayment"
    };
  }

  handlePaymentView(value) {
    this.setState({ paymentOption: value });
  }

  render() {
    const { companyName } = this.props;
    return (
      <div className="payment pageBlock withShadow">
        <button
          onClick={() => this.handlePaymentView("MakePayment")}
          className={`paymentOptionButton ${
            this.state.paymentOption === "MakePayment" ? "activeButton" : null
          }`}
        >
          Заплатить
        </button>
        <button
          onClick={() => this.handlePaymentView("RequestPayment")}
          className={`paymentOptionButton ${
            this.state.paymentOption === "RequestPayment"
              ? "activeButton"
              : null
          }`}
        >
          Запросить платёж
        </button>

        {this.state.paymentOption === "MakePayment" ? (
          <MakePayment
            app={this.props.app}
            handlePaymentView={this.handlePaymentView}
          />
        ) : (
          <RequestPayment app={this.props.app} companyName={companyName} />
        )}
      </div>
    );
  }
}

export default Payment;
