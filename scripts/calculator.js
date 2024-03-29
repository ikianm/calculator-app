const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const screen = document.getElementById('screen');
const resultBtn = document.getElementById('result');
const resetBtn = document.querySelector('button[value="RESET"]');
const deleteBtn = document.querySelector('button[value="DEL"]');
let operatorFlag = false;
let operatorValue;
let a = 0;
let b = 0;
let result = 0;
let firstValue = '';
let secondtValue = '';

function inputHandler(e) {
  if (!operatorFlag) {
    firstValue += e.target.value;
    if (firstValue.charAt(0) === '.') {
      firstValue = '';
      alert('dot (.) can not take place at the beggining of your numbers!');
      return;
    }
    renderScreenHandler(firstValue);
    a = parseFloat(firstValue);
  } else {
    secondtValue += e.target.value;
    if (secondtValue.charAt(0) === '.') {
      secondtValue = '';
      alert('dot (.) can not take place at the beggining of your numbers!');
      return;
    }
    b = parseFloat(secondtValue);
    renderScreenHandler(firstValue, operatorValue, secondtValue);
  }
}

function operatorHandler(e) {
  if (operatorFlag) {
    return;
  }
  operatorFlag = true;
  operatorValue = e.target.value;
  renderScreenHandler(firstValue, operatorValue);
}

function renderScreenHandler(a, op = '', b = '') {
  screen.textContent = `${a} ${op} ${b}`;
}

function resetHandler() {
  screen.textContent = '0';
  a = 0;
  b = 0;
  operatorFlag = false;
  operatorValue = null;
  result = 0;
  firstValue = '';
  secondtValue = '';
}

function deleteHandler() {
  if (!operatorFlag) {
    firstValue = firstValue.slice(0, -1);
    a = parseFloat(firstValue);
    renderScreenHandler(firstValue);
  } else if (secondtValue === '' && operatorFlag) {
    renderScreenHandler(firstValue);
    operatorValue = null;
  } else {
    secondtValue = secondtValue.slice(0, -1);
    b = secondtValue;
    renderScreenHandler(firstValue, operatorValue, secondtValue);
  }
}

function resultHandler() {
  switch (operatorValue) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = a / b;
      break;
  }
  firstValue = result;
  a = parseFloat(result);
  b = 0;
  secondtValue = '';
  operatorFlag = false;
  renderScreenHandler(firstValue);
}

resultBtn.addEventListener('click', resultHandler);

resetBtn.addEventListener('click', resetHandler);

deleteBtn.addEventListener('click', deleteHandler);

operators.forEach(operator => {
  operator.addEventListener('click', operatorHandler);
});

numbers.forEach(number => {
  number.addEventListener('click', inputHandler);
});
