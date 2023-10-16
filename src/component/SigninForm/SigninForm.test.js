import React from "react";
import { mount } from "enzyme";
import SigninForm from "./index.js";

describe("SigninForm Component", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<SigninForm />);
    expect(wrapper).toBeDefined();
  });

  it("handles form submission successfully", () => {
    const wrapper = mount(<SigninForm />);
    wrapper.find('input[name="lastname"]').simulate("change", {
      target: { name: "lastname", value: "Doe" },
    });
    wrapper.find('input[name="firstname"]').simulate("change", {
      target: { name: "firstname", value: "John" },
    });
    wrapper.find('input[name="email"]').simulate("change", {
      target: { name: "email", value: "john.doe@example.com" },
    });
    wrapper.find('input[name="phone"]').simulate("change", {
      target: { name: "phone", value: "0123456789" },
    });
    wrapper.find('input[name="password"]').simulate("change", {
      target: { name: "password", value: "securepassword" },
    });
    wrapper.find('input[name="confirmPassword"]').simulate("change", {
      target: { name: "confirmPassword", value: "securepassword" },
    });
    wrapper.find('input[name="category"]').simulate("change", {
      target: { name: "category", value: "Licorne" },
    });
    wrapper.find("form").simulate("submit");
  });

  it("displays an error message for an invalid email", () => {
    const wrapper = mount(<SigninForm />);
    wrapper.find('input[name="email"]').simulate("change", {
      target: { name: "email", value: "invalidemail" },
    });
    wrapper.find("form").simulate("submit");
  });
});
