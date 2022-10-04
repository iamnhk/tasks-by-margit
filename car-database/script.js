"use strict";
// initialize shorthands for query selector
const $ = document.querySelector.bind(document);

const form = $("#form"); //select the form element
const search = $("#search-button");
let cars = []; // array of Car objects

// class for car data
class Car {
  constructor(licenseNumber, owner, company, model, price, color) {
    this.licenseNumber = licenseNumber;
    this.owner = owner;
    this.company = company;
    this.model = model;
    this.price = price;
    this.color = color;
  }
}

// Add new row to the table
const createTableRow = (newCar) => {
  let row = `   <td>${newCar.licenseNumber}</td>
                <td>${newCar.owner}</td>
                <td>${newCar.company}</td>
                <td>${newCar.model}</td>
                <td>${newCar.price}</td>
                <td>${newCar.color}</td>`;

  $("#table").appendChild(document.createElement("tr")).innerHTML += row;
};

// Add new car info into object array
const addNewCar = (e) => {
  e.preventDefault();
  let licenseNumber = $("#license-number").value,
    owner = $("#car-owner").value,
    company = $("#car-company").value,
    model = $("#car-model").value,
    price = $("#car-price").value,
    color = $("#car-color").value;

  // create an instance of Car object
  let newCar = new Car(licenseNumber, owner, company, model, price, color);
  cars.push(newCar); // store the new car into the cars array
  createTableRow(newCar); // update the data table
};

const searchCar = (e) => {
  const searchText = $("#search").value; // grab the value from search input
  const resultText = $("#result"); // select the result display paragraph

  // Search the array with Array.find
  const result = cars.find(
    (car) => car.licenseNumber.toLowerCase() === searchText.toLowerCase()
  );

  // Set the search text
  result
    ? (resultText.innerHTML = `License number ${result.licenseNumber} is ${result.company} ${result.model} and it belongs to ${result.owner}.`)
    : (resultText.innerHTML = `There is no car with that license plate added to the system. Try again? `);
};

// event handler for the form
form.addEventListener("submit", addNewCar);
// event handler for car information search
search.addEventListener("click", searchCar);
