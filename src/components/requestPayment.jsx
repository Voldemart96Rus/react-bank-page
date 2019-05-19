import React, { Component } from "react";
import "../styles/requestPayment.css";
import firebase from "firebase/app";
import "firebase/database";

const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);
const phoneNumberRegex = new RegExp("\\d{3} \\d{3}-\\d{2}-\\d{2}");

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

class RequestPayment extends Component {
  constructor(props) {
    super(props);
    this.database = this.props.app
      .database()
      .ref()
      .child("requested-payments");

    const initialState = {
      TIN: null,
      BIC: null,
      accountNumber: null,
      taxOption: "без НДС",
      sum: null,
      phoneNumber: null,
      email: null,
      formErrors: {
        TIN: "",
        BIC: "",
        accountNumber: "",
        sum: "",
        phoneNumber: "",
        email: ""
      },
      inputAreasState: {
        TIN: false,
        BIC: false,
        accountNumber: false,
        sum: false,
        phoneNumber: false,
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
      TIN: this.state.TIN,
      BIC: this.state.BIC,
      accountNumber: this.state.accountNumber,
      taxOption: this.state.taxOption,
      sum: this.state.sum,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      isPaymentSafe: true
    };
    this.database.push().set(data);
    // firebase
    //   .database()
    //   .ref("requested-payments")
    //   .push()
    //   .set(data);

    this.setState(this.initialState);
    e.target.reset();
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let inputAreasState = { ...this.state.inputAreasState };
    let { isSubmitButtonEnable } = this.state;

    switch (name) {
      case "TIN": {
        if (10 <= value.length && value.length <= 12) {
          formErrors.TIN = "";
          inputAreasState.TIN = true;
          break;
        }
        formErrors.TIN = "Введите правильный ИНН";
        inputAreasState.TIN = false;
        break;
      }
      case "BIC": {
        if (value.length === 9) {
          formErrors.BIC = "";
          inputAreasState.BIC = true;
          break;
        }
        formErrors.BIC = "Введите правильный БИК";
        inputAreasState.BIC = false;
        break;
      }
      case "accountNumber": {
        if (value.length === 20) {
          formErrors.accountNumber = "";
          inputAreasState.accountNumber = true;
          break;
        }
        formErrors.accountNumber = "Введите 20 символов";
        inputAreasState.accountNumber = false;
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
          formErrors.sum = "Введите сумму от 1.000 до 75.000";
          inputAreasState.sum = false;
        }
        break;
      }
      case "phoneNumber": {
        if (phoneNumberRegex.test(value)) {
          formErrors.phoneNumber = "";
          inputAreasState.phoneNumber = true;
          break;
        }
        formErrors.phoneNumber =
          "Введите номер телефона в формате: 999 999-99-99";
        inputAreasState.phoneNumber = false;
        break;
      }
      case "email": {
        if (emailRegex.test(value)) {
          formErrors.email = "";
          inputAreasState.email = true;
          break;
        }
        formErrors.email = "Введите правильный email";
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

  handleClick = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ taxOption: value });
  };

  render() {
    const { formErrors } = this.state;
    const { companyName } = this.props;

    return (
      <div className="requestPayment">
        <p>
          Создайте платеж, а сотрудник {companyName} подпишет его у себя в
          интернет-банке
        </p>
        <form onSubmit={this.handleSubmit} noValidate>
          <ul className="dataList">
            <li className="dataElement">
              <label for="from">ИНН получателя</label>
              <div className="inputArea">
                <input
                  className={formErrors.TIN.length > 0 ? "error" : ""}
                  name="TIN"
                  noValidate
                  onChange={this.handleChange}
                  id="from"
                  type="text"
                  placeholder="ИНН или название плательщика"
                />
                {formErrors.TIN.length > 0 && (
                  <span className="errorMessage">{formErrors.TIN}</span>
                )}
              </div>
            </li>
            <li className="dataElement">
              <label for="BIC">БИК</label>
              <div className="inputArea">
                <input
                  className={formErrors.BIC.length > 0 ? "error" : ""}
                  name="BIC"
                  noValidate
                  onChange={this.handleChange}
                  id="BIC"
                  type="text"
                />
                {formErrors.BIC.length > 0 && (
                  <span className="errorMessage">{formErrors.BIC}</span>
                )}
              </div>
            </li>
            <li className="dataElement">
              <label for="accountNumber">Номер счета</label>
              <div className="inputArea extraInformationInput">
                <input
                  className={formErrors.accountNumber.length > 0 ? "error" : ""}
                  name="accountNumber"
                  noValidate
                  onChange={this.handleChange}
                  id="accountNumber"
                  type="text"
                />
                <label
                  className={
                    formErrors.accountNumber.length > 0 ? "escape" : ""
                  }
                  for="accountNumber"
                >
                  Назначение платежа
                </label>
                {formErrors.accountNumber.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.accountNumber}
                  </span>
                )}
              </div>
            </li>
            <li className="dataElement">
              <label for="tax">Налог</label>
              <div className="inputArea inputArea__tax">
                <div className="tax">{this.state.taxOption}</div>
                <div className="taxOptions">
                  <button
                    className={
                      this.state.taxOption === "НДС 18%"
                        ? "taxOption__chosen tax-1"
                        : "tax-1"
                    }
                    value="НДС 18%"
                    onClick={this.handleClick}
                  >
                    НДС 18%
                  </button>
                  <button
                    className={
                      this.state.taxOption === "НДС 10%"
                        ? "taxOption__chosen tax-2"
                        : "tax-2"
                    }
                    value="НДС 10%"
                    onClick={this.handleClick}
                  >
                    НДС 10%
                  </button>
                  <button
                    className={
                      this.state.taxOption === "без НДС"
                        ? "taxOption__chosen tax-3"
                        : "tax-3"
                    }
                    value="без НДС"
                    onClick={this.handleClick}
                  >
                    без НДС
                  </button>
                </div>
              </div>
            </li>
            <li className="dataElement">
              <label for="sum">Сколько</label>
              <div className="inputArea">
                <input
                  className={formErrors.sum.length > 0 ? "error" : ""}
                  name="sum"
                  noValidate
                  onChange={this.handleChange}
                  id="sum"
                  type="text"
                />
                {formErrors.sum.length > 0 && (
                  <span className="errorMessage">{formErrors.sum}</span>
                )}
              </div>
            </li>
            <li className="dataElement">
              <label for="phoneNumber">Номер телефона</label>
              <div className="inputArea extraInformationInput">
                <input
                  className={formErrors.phoneNumber.length > 0 ? "error" : ""}
                  name="phoneNumber"
                  noValidate
                  onChange={this.handleChange}
                  id="phoneNumber"
                  type="text"
                  placeholder="+ 7"
                />
                {formErrors.phoneNumber.length > 0 && (
                  <span className="errorMessage">{formErrors.phoneNumber}</span>
                )}
                <label for="phoneNumber">
                  Оставляя телефон, вы соглашаетесь на обработку персональных
                  данных
                </label>
              </div>
            </li>
            <li className="dataElement">
              <label for="email">Эл.почта</label>
              <div className="inputArea">
                <input
                  className={formErrors.email.length > 0 ? "error" : ""}
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                  id="email"
                  type="email"
                  placeholder="Для уведомлений об оплате"
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
            </li>
          </ul>
          {this.state.isSubmitButtonEnable ? (
            <input
              className="submitButton"
              type="submit"
              value="Создать платеж"
            />
          ) : (
            <input
              className="submitButton fakeSubmitButton"
              type="button"
              value="Создать платеж"
            />
          )}
          <input className="resetButton" type="reset" value="Очистить форму" />
        </form>
      </div>
    );
  }
}

export default RequestPayment;
