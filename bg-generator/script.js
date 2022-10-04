"use strict";
// initialize shorthands for query selector
const $ = document.querySelector.bind(document);

const form = $("#bg-generator"); //select the form element

// trigger function for input changes
const setBackground = (e) => {
  // color pickers
  let firstColor = $("#first-color").value,
    secondColor = $("#second-color").value,
    direction = $('input[name="direction"]:checked')?.value; //optional chaining for null selection

  // Calculate linear gradient
  let gradient = `linear-gradient(${direction}, ${firstColor}, ${secondColor})`;

  //set background
  document.body.style.backgroundImage = gradient;

  //set color code text
  $("#bg-color-codes p").textContent = gradient + ";";
};
// event handler for the form
form.addEventListener("change", setBackground);
