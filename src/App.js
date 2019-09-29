import React from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Dropdown from "./components/Dropdown/Dropdown";
import formFieldsArr from "./fieldsData";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { formFieldsArr };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    console.log(this.state.formFieldsArr);
  }
  render() {
    return (
      <div className="App">
        <h1>Hello LawPath</h1>
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
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
