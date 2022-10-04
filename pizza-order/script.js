"use strict";
// initialize shorthands for query selector
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $("#order");

function onSubmit(e) {
  e.preventDefault();
  let customerName = $("#customer-name").value,
    price = +$('input[name="pizza-size"]:checked').value.split(":")[1],
    pizzaSize = $('input[name="pizza-size"]:checked').value.split(":")[0],
    deliveryType = $("#delivery-type").value,
    toppings = [...$$('input[name="toppings"]:checked')].map(
      (topping) => topping.value
    );

  //calculate price if there is more toppings than 4
  if (toppings.length > 4) price += 0.5 * (toppings.length - 4);

  //calculate price if delivery method is home delivery
  if ($("#delivery-type").value == "home") price += 5;

  //
  $("#result").innerHTML = `Thank you for the order,${customerName}.<br/>
  You have ordered pizza for ${pizzaSize}. We will add toppings: ${toppings.join(
    ", "
  )}and delivery method is: ${deliveryType}. Total price is:${price} €`;

  $("#result").style["boxShadow"] = "0 0 5px #999999";
  $("#result").style["border"] = "1px solid #eee";
}

// event handler for the form
form.addEventListener("submit", onSubmit);
