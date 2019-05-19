import React, { Component } from "react";
import BankCardPayment from "./bankCardPayment";
import InternetBankPayment from "./internetBankPayment";
import "../styles/makePayment.css";

class MakePayment extends Component {
  state = {
    paymentOption: "BankCardPayment"
  };

  handlePaymentView(value) {
    this.setState({ paymentOption: value });
  }

  render() {
    return (
      <div className="makePayment">
        <button
          onClick={() => this.handlePaymentView("BankCardPayment")}
          className={`paymentOptionButton small ${
            this.state.paymentOption === "BankCardPayment"
              ? "activeButton"
              : null
          }`}
        >
          С карты любого банка
        </button>
        <button
          onClick={() => this.handlePaymentView("InternetBankPayment")}
          className={`paymentOptionButton small ${
            this.state.paymentOption === "InternetBankPayment"
              ? "activeButton"
              : null
          }`}
        >
          Из своего интернет-банка
        </button>

        {this.state.paymentOption === "BankCardPayment" ? (
          <BankCardPayment app={this.props.app} id="bankCardPayment" />
        ) : (
          <InternetBankPayment id="internetBankPayment" />
        )}
      </div>
    );
  }
}

export default MakePayment;
