import React, { Component } from "react";
import "../styles/bankCardPayment.css";
import "firebase/database";
// import axios from "axios";

const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);
const dataRegex = new RegExp("^\\d{2}/+\\d{2}$");

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class BankCardPayment extends Component {
  constructor(props) {
    super(props);

    // this.app = firebase.initializeApp(db_config);
    // this.database = this.app
    //   .database()
    //   .ref()
    //   .child("bankCardPayment");
    this.database = this.props.app
      .database()
      .ref()
      .child("card-payments");

    const initialState = {
      cardNumber: null,
      data: null,
      cvc: null,
      sum: null,
      comment: null,
      email: null,
      formErrors: {
        cardNumber: "",
        data: "",
        cvc: "",
        sum: "",
        comment: "",
        email: ""
      },
      inputAreasState: {
        cardNumber: false,
        data: false,
        cvc: false,
        sum: false,
        comment: true,
        email: false
      },
      isSubmitButtonEnable: false
    };

    this.initialState = { ...initialState };
    this.state = { ...initialState };
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      cardNumber: this.state.cardNumber,
      data: this.state.data,
      cvc: this.state.cvc,
      sum: this.state.sum,
      comment: this.state.comment ? this.state.comment : "",
      email: this.state.email,
      isPaymentSafe: true
    };
    this.database.push().set(data);

    this.setState(this.initialState);
    e.target.reset();

    // axios
    //   .post(
    //     `https://console.firebase.google.com/project/bank-page/database/firestore/data~2Fdata~2F6ay43OSYdS33LHN0fOG4`,
    //     "data"
    //   )
    //   .then(res => console.log(res.data));

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Account Number: ${this.state.cardNumber}
        Last Name: ${this.state.data}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let inputAreasState = { ...this.state.inputAreasState };
    let { isSubmitButtonEnable } = this.state;

    switch (name) {
      case "cardNumber": {
        if (value.length === 16) {
          formErrors.cardNumber = "";
          inputAreasState.cardNumber = true;
          break;
        }
        formErrors.cardNumber = "Введите 16 символов";
        inputAreasState.cardNumber = false;
        break;
      }
      case "data": {
        if (value.length === 5 && dataRegex.test(value)) {
          const [month, year] = value.split("/").map(el => parseInt(el));
          if (1 <= month && month <= 12 && (17 <= year && year <= 35)) {
            formErrors.data = "";
            inputAreasState.data = true;
          }
          break;
        }
        formErrors.data = "Введите дату в формате: ММ/ГГ";
        inputAreasState.data = false;
        break;
      }
      case "cvc": {
        if (value.length === 3) {
          formErrors.cvc = "";
          inputAreasState.cvc = true;
          break;
        }
        formErrors.cvc = "CVC состоит из 3 символов";
        inputAreasState.cvc = false;
        break;
      }
      case "sum": {
        if (
          /^\d+$/.test(value) &&
          typeof parseInt(value) != NaN &&
          (1000 <= parseInt(value) && parseInt(value) <= 75000)
        ) {
          formErrors.sum = "";
          inputAreasState.sum = true;
        } else {
          formErrors.sum = "error";
          inputAreasState.sum = false;
        }
        break;
      }
      case "comment": {
        if (value.length <= 150) {
          formErrors.comment = "";
          inputAreasState.comment = true;
          break;
        }
        formErrors.comment = "error";
        inputAreasState.comment = false;
        break;
      }
      case "email": {
        if (emailRegex.test(value)) {
          formErrors.email = "";
          inputAreasState.email = true;
          break;
        }
        formErrors.email = "error";
        inputAreasState.email = false;
        break;
      }
      default:
        break;
    }

    isSubmitButtonEnable =
      Object.keys(inputAreasState).filter(
        flag => inputAreasState[flag] === false
      ).length === 0;
    this.setState(
      { formErrors, inputAreasState, isSubmitButtonEnable, [name]: value },
      () => console.log(this.state)
    );
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="bankCardPayment">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="cardData">
            <div className="row cardLabels">
              <img className="cardLabel" src="/images/visa.svg" alt="Visa" />
              <img
                className="cardLabel"
                src="/images/mastercard.svg"
                alt="Mastercard"
              />
              <img
                className="cardLabel"
                src="/images/maestro.svg"
                alt="Maestro"
              />
            </div>
            <div className="row firstRow">
              <input
                className={
                  formErrors.cardNumber.length > 0
                    ? "cardDataElement cardNumber error"
                    : "cardDataElement cardNumber"
                }
                name="cardNumber"
                noValidate
                onChange={this.handleChange}
                type="text"
                placeholder="Номер карты"
              />
              {formErrors.cardNumber.length > 0 && (
                <span className="errorMessage">{formErrors.cardNumber}</span>
              )}
            </div>
            <div className="row secondRow">
              <input
                className={
                  formErrors.data.length > 0
                    ? "cardDataElement data error"
                    : "cardDataElement data"
                }
                name="data"
                noValidate
                onChange={this.handleChange}
                type="text"
                placeholder="ММ/ГГ"
              />
              <input
                className={
                  formErrors.cvc.length > 0
                    ? "cardDataElement cvc error"
                    : "cardDataElement cvc"
                }
                name="cvc"
                noValidate
                onChange={this.handleChange}
                type="text"
                placeholder="CVC"
              />
            </div>
            <div className="errors">
              {formErrors.data.length > 0 && (
                <span className="errorMessage">{formErrors.data}</span>
              )}
              {formErrors.cvc.length > 0 && (
                <span className="errorMessage">{formErrors.cvc}</span>
              )}
            </div>
          </div>
          <div className="paymentData">
            <ul className="dataList">
              <li className="dataElement">
                <label for="sum boldText">Сумма</label>
                <input
                  className={formErrors.sum.length > 0 ? "error" : ""}
                  name="sum"
                  noValidate
                  onChange={this.handleChange}
                  id="sum"
                  type="text"
                  placeholder="От 1.000 до 75.000"
                />
              </li>
              <li className="dataElement">
                <label for="comment boldText">Комментарий</label>
                <input
                  className={formErrors.comment.length > 0 ? "error" : ""}
                  name="comment"
                  noValidate
                  onChange={this.handleChange}
                  id="comment"
                  type="text"
                  placeholder="До 150 символов"
                />
              </li>
              <li className="dataElement">
                <label for="email boldText">Ваша эл.почта</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : ""}
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                  id="email"
                  type="email"
                  placeholder="Для квитанций об оплате"
                />
              </li>
            </ul>

            {this.state.isSubmitButtonEnable ? (
              <input className="submitButton" type="submit" value="Заплатить" />
            ) : (
              <input
                className="submitButton fakeSubmitButton"
                type="button"
                value="Заплатить"
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default BankCardPayment;
