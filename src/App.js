import React from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Dropdown from "./components/Dropdown/Dropdown";
import formFieldsArr from "./fieldsData";
import AlertMessage from "./components/AlertMessage/AlertMessage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formFieldsArr,
      isLoading: false,
      alert: { show: false, type: "", body: "" }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setupAlertMessage = this.setupAlertMessage.bind(this);
  }

  setupAlertMessage(payload) {
    this.setState({ alert: payload });
  }

  handleInputChange(id, event) {
    let foundFieldObj = { ...this.state.formFieldsArr.find(e => e.id === id) };
    let foundFieldInd = id - 1;
    foundFieldObj.value = event.target.value;
    this.setState(state => {
      state.formFieldsArr[foundFieldInd] = foundFieldObj;
      return state;
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let isFormValid = this.state.formFieldsArr.every(e => e.value);
    if (!isFormValid)
      return this.setupAlertMessage({
        show: true,
        type: "error",
        body: "Provide values for all fields"
      });
    let payload = {};
    this.state.formFieldsArr.forEach(e => (payload[e.name] = e.value));
    this.callApi(payload);
  }

  async callApi({ state, suburb, postcode }) {
    this.setState({ isLoading: true });
    let url = `https://digitalapi.auspost.com.au/postcode/search.json?q=${suburb}&state=${state}`;
    try {
      let resp = await fetch(url, {
        headers: { "auth-key": "872608e3-4530-4c6a-a369-052accb03ca8" }
      });
      let data = await resp.json();
      this.setState({ isLoading: false });
      return this.afterApiSuccess(data, { state, suburb, postcode });
    } catch (error) {
      this.setState({ isLoading: false });
      this.afterApiFail(error);
    }
  }

  afterApiSuccess({ localities }, { state, suburb, postcode }) {
    if (localities && localities.locality)
      return this.checkPostcodeValidity(localities.locality, suburb, postcode);
    this.setupAlertMessage({
      show: true,
      type: "error",
      body: `The suburb ${suburb} does not exist in the state ${state}`
    });
  }

  checkPostcodeValidity(locality, suburb, postcode) {
    let isValid = this.checkPostcode(locality, postcode);
    isValid
      ? this.setupAlertMessage({
          show: true,
          type: "success",
          body: `The postcode, suburb and state entered are valid!`
        })
      : this.setupAlertMessage({
          show: true,
          type: "error",
          body: `The postcode ${postcode} does not match the suburb ${suburb}"`
        });
  }

  checkPostcode(locality, postcode) {
    //1. check if locality is an object or array
    //2. check if it contains the right postcode
    if (Array.isArray(locality)) {
      return locality.some(e => e.postcode === postcode);
    }
    return locality.postcode === postcode;
  }

  afterApiFail(err) {
    console.log("error", err);
    this.setupAlertMessage({
      show: true,
      type: "error",
      body: `Couldn't validate your data. Please check your internet connection and try again later`
    });
  }

  render() {
    const showAlert = this.state.alert.show ? (
      <AlertMessage {...this.state.alert} close={this.setupAlertMessage} />
    ) : null;
    return (
      <div className="App">
        <h1>Hello LawPath</h1>
        {showAlert}
        <form className="lawpath__form" onSubmit={this.handleFormSubmit}>
          {this.state.formFieldsArr.map(({ elementType, ...props }) =>
            elementType === "input" ? (
              <Input
                key={props.id}
                {...props}
                change={this.handleInputChange}
              />
            ) : (
              <Dropdown
                key={props.id}
                {...props}
                change={this.handleInputChange}
              />
            )
          )}
          <button disabled={this.state.isLoading}>
            {this.state.isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    );
  }
}

export default App;
