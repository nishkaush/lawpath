import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formFieldsArr: [
        {
          id: 1,
          name: "postcode",
          value: "",
          placeholder: "Postcode",
          type: "number"
        },
        {
          id: 2,
          name: "suburb",
          value: "",
          placeholder: "Suburb",
          type: "text"
        },
        {
          id: 3,
          name: "state",
          value: "",
          placeholder: "State",
          type: "text"
        }
      ]
    };

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
    // let payload = this.state.formFieldsArr.
    console.log(this.state.formFieldsArr);
  }
  render() {
    return (
      <div className="App">
        <h1>Hello LawPath</h1>
        <form
          className="lawpath__form"
          action=""
          onSubmit={this.handleFormSubmit}
        >
          {this.state.formFieldsArr.map(({ id, ...props }) => (
            <input
              key={id}
              {...props}
              onChange={this.handleInputChange.bind(this, id)}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
