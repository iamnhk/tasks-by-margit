# Insurance calculator

A program where user can check their risk score for insurance.
live demo: https://insurance-calculator-task.netlify.app

## Inputs

- Name (text input)
- Age (number input)
- Current health (checkboxes)
  - Hypertension, Blood sugar, Overweight
- Habits (checkboxes)
  - Smoking, Alcohol, Daily exercise, Drugs

## Specs

- Customer's name (text input)

- Age

  - Below the age of 18 years = 500

  - If older than 18, then increase:
    - 18-25 -> + 10%
    - 26-35 -> + 30%
    - 36-45 -> +60%
    - 46-55 -> +100%
    - 56-65 -> +150%
    - 66+ -> +210%

- Pre-existing conditions
  Hypertension | Blood sugar | Overweight - > Increase of 1% per condition

- Habits:
  - Good habits (Daily exercise) -> Reduce 5% for every good habit.
  - Bad habits (Smoking | Consumption of alcohol | Drugs) -> Increase 5% for every bad habit.

Based on users' choices, display on the page:
**Customers' name and risk score**
