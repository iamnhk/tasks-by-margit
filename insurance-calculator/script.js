const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $("#form");
const result = $("#result");
const Customer = $("#name");
const age = $("#age");

// initialize global variable
let insuranceRiscScore = 0;
let basicRiscScore = 500;

// function to calculate score when increasing
const calIncreasedScore = (num, per) => {
  return num + (num / 100) * per;
};

// function to calculate score when decreasing
const calDecreasedScore = (num, per) => {
  return num - (num / 100) * per;
};

const handleSubmit = (event) => {
  event.preventDefault();
  let customerName = Customer.value;
  let customerAge = age.value;

  // risc score by age
  insuranceRiscScore =
    customerAge <= 18
      ? basicRiscScore
      : customerAge > 18 && customerAge <= 25
      ? calIncreasedScore(basicRiscScore, 10)
      : customerAge >= 26 && customerAge <= 35
      ? calIncreasedScore(basicRiscScore, 30)
      : customerAge >= 36 && customerAge <= 45
      ? calIncreasedScore(basicRiscScore, 60)
      : customerAge >= 46 && customerAge <= 55
      ? calIncreasedScore(basicRiscScore, 100)
      : customerAge >= 56 && customerAge <= 65
      ? calIncreasedScore(basicRiscScore, 150)
      : calIncreasedScore(basicRiscScore, 210);

  // risc score after health condition check
  let healthConditions = $$('input[name="health-conditions"]:checked');
  for (x of healthConditions) {
    insuranceRiscScore = calIncreasedScore(insuranceRiscScore, 1);
  }

  // risc score after good habit check
  let goodHabits = $$('input[name="good-habits"]:checked');
  for (x of goodHabits) {
    console.log(x);
    insuranceRiscScore = calDecreasedScore(insuranceRiscScore, 5);
  }

  // risc score after bad habit check
  let badHabits = $$('input[name="bad-habits"]:checked');
  for (x of badHabits) {
    insuranceRiscScore = calIncreasedScore(insuranceRiscScore, 5);
  }

  // display risc score
  result.innerHTML = `Hi, ${customerName}<br/>
  Your insurance risc score is:  ${insuranceRiscScore}
 `;
  $("#result").style["boxShadow"] = "0 0 5px #999999";
  $("#result").style["border"] = "1px solid #eee";

  form.reset();
};

form.addEventListener("submit", handleSubmit);
