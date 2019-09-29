import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import formFieldsArr from "./fieldsData";

let successMsg = {
  show: true,
  type: "success",
  body: `The postcode, suburb and state entered are valid!`
};

let newFieldsArr = formFieldsArr.map(e => ({
  ...e,
  value: e.name === "postcode" ? "3000" : "some-value"
}));

describe("<App/>", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App />)));
  afterEach(() => wrapper.unmount());

  it("renders 2 input elements and 1 dropdown correctly", () => {
    expect(wrapper.find("Input").length).toBe(2);
    expect(wrapper.find("Dropdown").length).toBe(1);
  });

  it("doesn't allow user to submit form if any field is empty and shows correct error message", () => {
    let alertMsgPayload = {
      show: true,
      type: "error",
      body: "Provide values for all fields"
    };
    wrapper
      .find("Input")
      .first()
      .simulate("change", { target: { value: "3000" } });
    wrapper
      .find(".lawpath__form")
      .simulate("submit", { preventDefault: () => {} });

    expect(wrapper.find("AlertMessage").exists()).toBe(true);
    expect(wrapper.state().alert).toEqual(alertMsgPayload);
  });

  it("allows user to submit form and shows correct success message - Api call returns multiple values", done => {
    //creating a mock for fetch
    const resp = {
      json: () =>
        Promise.resolve({
          localities: {
            locality: [
              { name: "Melbourne", postcode: "3000" },
              { name: "Melbourne City", postcode: "3000" }
            ]
          }
        })
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(resp));

    wrapper.setState({ formFieldsArr: newFieldsArr });

    wrapper
      .find(".lawpath__form")
      .simulate("submit", { preventDefault: () => {} });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("AlertMessage").exists()).toBe(true);
      expect(wrapper.state().alert).toEqual(successMsg);
      done();
    }, 0);
  });

  it("allows user to submit form and shows correct success message - Api call returns only one value", done => {
    const resp = {
      json: () =>
        Promise.resolve({
          localities: {
            locality: { name: "Melbourne City", postcode: "3000" }
          }
        })
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(resp));

    wrapper.setState({ formFieldsArr: newFieldsArr });

    wrapper
      .find(".lawpath__form")
      .simulate("submit", { preventDefault: () => {} });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("AlertMessage").exists()).toBe(true);
      expect(wrapper.state().alert).toEqual(successMsg);
      done();
    }, 0);
  });

  it("shows correct message if Suburb doesnt exist in state - Api call successful but sends back empty resp", done => {
    let wrongSuburbMsg = {
      show: true,
      type: "error",
      body: `The suburb some-value does not exist in the state some-value`
    };
    const resp = {
      json: () =>
        Promise.resolve({
          localities: {
            locality: ""
          }
        })
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(resp));

    wrapper.setState({ formFieldsArr: newFieldsArr });

    wrapper
      .find(".lawpath__form")
      .simulate("submit", { preventDefault: () => {} });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("AlertMessage").exists()).toBe(true);
      expect(wrapper.state().alert).toEqual(wrongSuburbMsg);
      done();
    }, 0);
  });

  it("shows correct message if postcode is wrong - Postcode doesnt match suburb", done => {
    let wrongPostcodeMsg = {
      show: true,
      type: "error",
      body: `The postcode 3000 does not match the suburb some-value"`
    };

    const resp = {
      json: () =>
        Promise.resolve({
          localities: {
            locality: { name: "Melbourne City", postcode: "3001" }
          }
        })
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(resp));

    wrapper.setState({ formFieldsArr: newFieldsArr });

    wrapper
      .find(".lawpath__form")
      .simulate("submit", { preventDefault: () => {} });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("AlertMessage").exists()).toBe(true);
      expect(wrapper.state().alert).toEqual(wrongPostcodeMsg);
      done();
    }, 0);
  });

  it("shows correct error message if Api call fails", done => {
    let apiCallFailMsg = {
      show: true,
      type: "error",
      body: `Couldn't validate your data. Please check your internet connection and try again later`
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject("Ooooppsss"));

    wrapper.setState({ formFieldsArr: newFieldsArr });

    wrapper
      .find(".lawpath__form")
      .simulate("submit", { preventDefault: () => {} });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("AlertMessage").exists()).toBe(true);
      expect(wrapper.state().alert).toEqual(apiCallFailMsg);
      done();
    }, 0);
  });
});
