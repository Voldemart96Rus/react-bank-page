import React, { Component } from "react";
import "../styles/internetBankPayment.css";

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

class InternetBankPayment extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      TIN: null,
      BIC: null,
      accountNumber: null,
      taxOption: "без НДС",
      sum: null,
      formErrors: {
        TIN: "",
        BIC: "",
        accountNumber: "",
        sum: ""
      },
      inputAreasState: {
        TIN: false,
        BIC: false,
        accountNumber: false,
        sum: false
      },
      isSubmitButtonEnable: false
    };

    this.initialState = { ...initialState };
    this.state = { ...initialState };
  }

  handleSubmit = e => {
    e.preventDefault();
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

    return (
      <div className="internetBankPayment">
        <p>Сформируйте платеж и загрузите его в свой банк для подписи</p>
        <form onSubmit={this.handleSubmit} noValidate>
          <ul className="dataList">
            <li className="dataElement">
              <label for="from">От кого</label>
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
              <div className="inputArea accountNumberInput">
                <input
                  className={formErrors.accountNumber.length > 0 ? "error" : ""}
                  name="accountNumber"
                  noValidate
                  onChange={this.handleChange}
                  id="accountNumber"
                  type="text"
                />
                <label for="accountNumber">Назначение платежа</label>
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
          </ul>

          {this.state.isSubmitButtonEnable ? (
            <input
              className="submitButton"
              type="submit"
              value="Получить файл для интернет-банка"
            />
          ) : (
            <input
              className="submitButton fakeSubmitButton"
              type="button"
              value="Получить файл для интернет-банка"
            />
          )}
          <input className="resetButton" type="reset" value="Очистить форму" />
        </form>
      </div>
    );
  }
}

export default InternetBankPayment;
