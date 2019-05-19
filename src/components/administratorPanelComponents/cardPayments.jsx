import React, { Component } from "react";
import "../../styles/administratorPanelStyles/cardPayments.css";
import "firebase/database";

class CardPayments extends Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;
    this.database = this.props.app
      .database()
      .ref()
      .child("card-payments");

    this.state = {
      records: [],
      recordsToShow: [],
      searchData: {
        id: "",
        cardNumber: "",
        data: "",
        cvc: "",
        sum: "",
        comment: "",
        email: "",
        isPaymentSafe: ""
      },
      tableHeaderInfo: [
        { columnName: "Номер карты", propName: "cardNumber" },
        { columnName: "ММ/ГГ", propName: "data" },
        { columnName: "CVC", propName: "cvc" },
        { columnName: "Сумма", propName: "sum" },
        { columnName: "Комментарий", propName: "comment" },
        { columnName: "Эл. почта", propName: "email" },
        { columnName: "Безопасность", propName: "isPaymentSafe" }
      ]
    };
  }

  componentWillMount() {
    const previousRecords = this.state.records;

    // DataSnapshot
    this.database.on("child_added", snap => {
      previousRecords.push({
        id: snap.key,
        cardNumber: snap.val().cardNumber,
        data: snap.val().data,
        cvc: snap.val().cvc,
        sum: snap.val().sum,
        comment: snap.val().comment ? snap.val().comment : "",
        email: snap.val().email,
        isPaymentSafe: snap.val().isPaymentSafe
      });

      this.setState({
        records: previousRecords,
        recordsToShow: previousRecords
      });
    });

    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousRecords.length; i++) {
        if (previousRecords[i].id === snap.key) {
          previousRecords.splice(i, 1);
        }
      }

      this.setState({
        records: previousRecords,
        recordsToShow: previousRecords
      });
    });

    this.database.on("child_changed", snap => {
      for (var i = 0; i < previousRecords.length; i++) {
        if (previousRecords[i].id === snap.key) {
          previousRecords[i] = {
            id: snap.key,
            cardNumber: snap.val().cardNumber,
            data: snap.val().data,
            cvc: snap.val().cvc,
            sum: snap.val().sum,
            comment: snap.val().comment ? snap.val().comment : "",
            email: snap.val().email,
            isPaymentSafe: snap.val().isPaymentSafe
          };
        }
      }

      this.setState({
        records: previousRecords,
        recordsToShow: previousRecords
      });
    });
  }

  handleSort(value) {
    let sortedRecords = this.state.records.sort(function(a, b) {
      if (typeof a[value] === "boolean") {
        if (!a[value] && b[value]) return -1;
        else if (a[value] === b[value]) return 0;
        return 1;
      }
      return a[value].localeCompare(b[value]);
    });
    this.setState({ records: sortedRecords });
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let previousSearchData = this.state.searchData;
    previousSearchData[name] = value;
    this.setState({ searchData: previousSearchData });

    let filteredRecordsToShow = this.state.records.filter(record => {
      let flag = true;
      Object.keys(this.state.searchData).forEach(key => {
        if (!String(record[key]).includes(this.state.searchData[key]))
          flag = false;
      });
      return flag;
    });

    this.setState({ recordsToShow: filteredRecordsToShow });
  };

  handlePaymentSecurity(paymentId) {
    const previousRecords = this.state.records;

    for (var i = 0; i < previousRecords.length; i++) {
      if (previousRecords[i].id === paymentId) {
        previousRecords[i].isPaymentSafe = !previousRecords[i].isPaymentSafe;

        const data = {
          cardNumber: previousRecords[i].cardNumber,
          data: previousRecords[i].data,
          cvc: previousRecords[i].cvc,
          sum: previousRecords[i].sum,
          comment: previousRecords[i].comment ? previousRecords[i].comment : "",
          email: previousRecords[i].email,
          isPaymentSafe: previousRecords[i].isPaymentSafe
        };

        this.app
          .database()
          .ref("card-payments/" + paymentId)
          .set(data);
      }
    }
  }

  render() {
    let tableHeader = this.state.tableHeaderInfo.map(el => {
      return (
        <th>
          <button onClick={() => this.handleSort(el.propName)}>
            {el.columnName}
          </button>
        </th>
      );
    });

    let tableSearch = this.state.tableHeaderInfo.map(el => {
      return (
        <th>
          <input
            className={el.propName}
            name={el.propName}
            onChange={this.handleChange}
            type="text"
            placeholder={
              el.columnName === "Безопасность" ? "true / false" : el.columnName
            }
          />
        </th>
      );
    });

    let records = this.state.recordsToShow.map(record => {
      return (
        <tr key={record.id} className={record.isPaymentSafe ? null : "danger"}>
          <td>{record.cardNumber}</td>
          <td>{record.data}</td>
          <td>{record.cvc}</td>
          <td>{record.sum}</td>
          <td>{record.comment}</td>
          <td>{record.email}</td>
          <td>
            {record.isPaymentSafe ? (
              <button
                className="paymentSecureButton paymentSecureButton__safe"
                onClick={() => this.handlePaymentSecurity(record.id)}
              >
                Отметить как небезопасный платеж
              </button>
            ) : (
              <button
                className="paymentSecureButton paymentSecureButton__unsafe"
                onClick={() => this.handlePaymentSecurity(record.id)}
              >
                Отметить как безопасный платеж
              </button>
            )}
          </td>
        </tr>
      );
    });
    return (
      <div className="cardPayments">
        <table className="cardPaymentsTable">
          <thead className="cardPaymentsTableHeader">
            <tr>
              {tableHeader}

              {/* <th>
                <button onClick={() => this.handleSort("cardNumber")}>
                  Номер карты
                </button>
              </th> */}

              {/* <th>Номер карты</th>
              <th>ММ/ГГ</th>
              <th>CVC</th>
              <th>Сумма</th>
              <th>Комментарий</th>
              <th>Эл. почта</th>
              <th>Безопасность</th> */}
            </tr>
            <tr>{tableSearch}</tr>
          </thead>

          <tbody>{records}</tbody>
        </table>
      </div>
    );
  }
}

export default CardPayments;
