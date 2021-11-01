import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import sinon from "sinon";
import DynamicInput from "../src/components/DynamicInput";

let di;
let addRowBtn;

const makeTestTable = items => {
  for (let i = 0; i < items.length; i++) {
    addRowBtn.simulate("click");
  }
  
  items.forEach((e, i) => {
    const input = di.find(".row-input").hostNodes().at(i);
    input.simulate("change", { target: { value: e } });
  });
};

describe("DynamicInput", () => {
  beforeEach(() => {
    di = mount(<DynamicInput />);
    addRowBtn = di.find(".add-row").hostNodes();
  });
  afterEach(() => {
    di.unmount();
    di = null;
    addRowBtn = null;
  });
  
  it('should have an "add-row" button', () => {
    expect(addRowBtn.exists()).toBe(true);
    expect(addRowBtn).toHaveLength(1);
  });
  
  it('should have no rows before "add-row" is clicked', () => {
    [
      ".row-input", 
      ".row-delete", 
      ".row-up", 
      ".row-down"
    ].forEach(e => expect(di.find(e).hostNodes().exists()).toBe(false));
  });
  
  it('should add a row on pushing the "add-row" button', () => {
    addRowBtn.simulate("click");
    [
      ".row-input", 
      ".row-delete", 
      ".row-up", 
      ".row-down"
    ].forEach(e => expect(di.find(e).hostNodes()).toHaveLength(1));
  });
  
  it('should change focus to the new row on clicking the "add-row" button', () => {
    addRowBtn.simulate("click");
    expect(document.activeElement.value).toEqual("");
  });
  
  it('should be able to add multiple rows', () => {
    for (let i = 1; i < 5; i++) {
      addRowBtn.simulate("click");
      [
        ".row-input", 
        ".row-delete", 
        ".row-up", 
        ".row-down"
      ].forEach(e => expect(di.find(e).hostNodes()).toHaveLength(i));
    }
  });
  
  it('should be able to add text to the input fields', () => {
    const items = [
      "apples",
      "pears",
      "watermelon",
      "cantaloupe"
    ];
    makeTestTable(items);
    
    items.forEach((e, i) => {
      const input = di.find(".row-input").hostNodes().at(i);
      expect(input.instance().value).toEqual(e);
    });
  });
  
  it('should be able to change the text of an input field', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    const input = di.find(".row-input").hostNodes().at(3);
    input.simulate("change", { target: { value: "bananas" } });
    expect(input.instance().value).toEqual("bananas");
    expect(document.activeElement.value).toEqual("bananas");
  });
  
  it('should be able to move a row up', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    di.find(".row-up").hostNodes().at(3).simulate("click");
    
    [
      "apples",
      "pears",
      "cantaloupe",
      "watermelon",
    ].forEach((e, i) => {
      expect(di.find(".row-input").hostNodes().at(i).instance().value).toEqual(e);
    });
  });
  
  it('should focus the correct input element after moving a row up', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    di.find(".row-up").hostNodes().at(3).simulate("click");
    expect(document.activeElement.value).toEqual("cantaloupe");
  });
  
  it('should be able to move a row down', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    di.find(".row-down").hostNodes().at(0).simulate("click");
    [
      "pears",
      "apples",
      "watermelon",
      "cantaloupe",
    ].forEach((e, i) => {
      expect(di.find(".row-input").hostNodes().at(i).instance().value).toEqual(e);
    });
  });
  
  it('should focus the correct input element after moving a row down', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    di.find(".row-down").hostNodes().at(0).simulate("click");
    expect(document.activeElement.value).toEqual("apples");
  });
  
  it('should work when an input field is moved down but is already at the bottom', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    di.find(".row-down").hostNodes().at(3).simulate("click");
    [
      "apples",
      "pears",
      "watermelon",
      "cantaloupe",
    ].forEach((e, i) => {
      expect(di.find(".row-input").hostNodes().at(i).instance().value).toEqual(e);
    });
  });
  
  it('should focus the last input element after moving a row down that is already at the bottom', () => {
    makeTestTable(["apples", "pears", "watermelon", "cantaloupe"]);
    di.find(".row-down").hostNodes().at(3).simulate("click");
    expect(document.activeElement.value).toEqual("cantaloupe");
  });
  
  it('should work when an input field is moved up but is already at the top', () => {
    makeTestTable(["apples", "pears"]);
    di.find(".row-up").hostNodes().at(0).simulate("click");
    [
      "apples",
      "pears",
    ].forEach((e, i) => {
      expect(di.find(".row-input").hostNodes().at(i).instance().value).toEqual(e);
    });
  });
  
  it('should focus the 0-th input element after moving a row up which is already at the top', () => {
    makeTestTable(["apples", "pears"]);
    di.find(".row-up").hostNodes().at(0).simulate("click");
    expect(document.activeElement.value).toEqual("apples");
  });
  
  it('should work when the bottom row is deleted', () => {
    makeTestTable(["apples", "pears"]);
    di.find(".row-delete").hostNodes().at(1).simulate("click");
    expect(di.find(".row-input").hostNodes()).toHaveLength(1);
    expect(di.find(".row-input").hostNodes().at(0).instance().value).toEqual("apples");
  });
  
  it('should focus the last input element after deleting the bottom row', () => {
    makeTestTable(["apples", "pears", "bananas", "grapefruit"]);
    di.find(".row-delete").hostNodes().at(3).simulate("click");
    expect(document.activeElement.value).toEqual("bananas");
  });
  
  it('should work when a middle row is deleted', () => {
    makeTestTable(["pears", "apples", "bananas"]);
    di.find(".row-delete").hostNodes().at(1).simulate("click");
    expect(di.find(".row-input").hostNodes().at(0).instance().value).toEqual("pears");
    expect(di.find(".row-input").hostNodes().at(1).instance().value).toEqual("bananas");
  });
  
  it('should focus the correct input element after deleting a middle row', () => {
    makeTestTable(["pears", "apples", "bananas"]);
    di.find(".row-delete").hostNodes().at(1).simulate("click");
    expect(document.activeElement.value).toEqual("bananas");
  });
  
  it('should work when the remaining rows are deleted', () => {
    makeTestTable(["pears", "apples"]);
    di.find(".row-delete").hostNodes().at(0).simulate("click");
    expect(di.find(".row-input").hostNodes().at(0).instance().value).toEqual("apples");
    di.find(".row-delete").hostNodes().at(0).simulate("click");
    expect(di.find(".row-input").hostNodes().length).toBe(0);
    expect(di.find(".row-delete").hostNodes().length).toBe(0);
    expect(di.find(".row-up").hostNodes().length).toBe(0);
    expect(di.find(".row-down").hostNodes().length).toBe(0);
  });
  
  it('should not focus anything after all rows are deleted', () => {
    makeTestTable(["pears", "apples"]);
    di.find(".row-delete").hostNodes().at(0).simulate("click");
    expect(di.find(".row-input").hostNodes().at(0).instance().value).toEqual("apples");
    di.find(".row-delete").hostNodes().at(0).simulate("click");
    expect(di.find(".row-input").hostNodes().length).toBe(0);
    expect(di.find(".row-delete").hostNodes().length).toBe(0);
    expect(di.find(".row-up").hostNodes().length).toBe(0);
    expect(di.find(".row-down").hostNodes().length).toBe(0);
    expect(document.activeElement.value).toEqual(undefined);
  });
  
  it('should work when a row is re-added, modified and deleted after clearing the list', () => {
    expect(di.find(".row-input").hostNodes().length).toBe(0);
    addRowBtn.simulate("click");
    expect(di.find(".row-input").hostNodes().length).toBe(1);
    expect(di.find(".row-delete").hostNodes().length).toBe(1);
    expect(di.find(".row-up").hostNodes().length).toBe(1);
    expect(di.find(".row-down").hostNodes().length).toBe(1);
    const input = di.find(".row-input").hostNodes().at(0);
    input.simulate("change", { target: { value: "cucumber" } });
    expect(input.instance().value).toEqual("cucumber");
    di.find(".row-up").hostNodes().at(0).simulate("click");
    di.find(".row-down").hostNodes().at(0).simulate("click");
    expect(input.instance().value).toEqual("cucumber");
    expect(document.activeElement.value).toEqual("cucumber");
    di.find(".row-delete").hostNodes().at(0).simulate("click");
    expect(di.find(".row-input").hostNodes().length).toBe(0);
  });
});
