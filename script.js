let number2, operator, currentResult;
let number1 = 0;
let display = '';
const operatorRegex = /[+×÷-]/;

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(number1, number2, operator) {
    if (operator === '+') {
        return add(number1, number2);
    } else if (operator === '-') {
        return subtract(number1, number2);
    } else if (operator === '×') {
        return multiply(number1, number2);
    } else if (operator === '÷') {
        return divide(number1, number2);
    }
}

createButtons();

// create buttons for the numpad
function createButtons() {
    const arr = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '.', '0', '=', '+'];
    const numberPad = document.getElementById('numberPad');
    for (let i = 0; i < 16; i++) {
        let button = document.createElement('button');
        numberPad.appendChild(button);
        button.textContent = arr[i];
        button.addEventListener('click', populateDisplay);
    }
}

const buttons = numberPad.querySelectorAll('button');
buttons.forEach(setButtons);

function setButtons(button) {
    button.setAttribute('style', 'border-color: black; background-color: white; margin: 5px; font-weight: bold; font-size: 20px;');
    button.style.height = '75px';
    button.style.width = '127.5px';
}

const displayHistory = document.getElementById('history');
const answer = document.getElementById('answer');
displayHistory.textContent = '0';
answer.textContent = number1;

// fills the history section of the display with the buttons' text that were clicked.
function populateDisplay(e) {
    if (e.target.innerText === '=') {
        if (checkValidInput(display)) {
            currentResult = operate(number1, number2, operator);
            answer.textContent = currentResult;
            display = '' + currentResult;
        }
    } else if (checkOperator(e.target.innerText) && checkValidInput(display)) {
        currentResult = operate(number1, number2, operator);
        answer.textContent = currentResult;
        display = currentResult + e.target.innerText;
        displayHistory.textContent = display;
    } else {
        display = display.concat(e.target.innerText);
        displayHistory.textContent = display;
    }
}

const clear = document.getElementById('clear');
clear.addEventListener('click', clearDisplay);

function clearDisplay() {
    displayHistory.textContent = '0';
    display = '';
    answer.textContent = '0';
}

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', deleteDisplay);

function deleteDisplay() {
    display = display.substring(0, display.length - 1);
    if (display === '') {
        displayHistory.textContent = '0';
    } else {
        displayHistory.textContent = display;
    }
}

function checkOperator(character) {
    return operatorRegex.test(character);
}

function checkValidInput(expression) {
    if (expression.match(/\d+[+×÷-]\d+/)) {
        const expressionArray = expression.split(operatorRegex);
        console.log(expressionArray);
        if (expressionArray.length === 2) {
            number1 = parseFloat(expressionArray[0]);
            operator = expression[expression.search(operatorRegex)];
            number2 = parseFloat(expressionArray[1]);
            return true;   
        }
    }

    if (expression.match(/[+×÷-]\d+/)) {
        operator = expression[0];
        number2 = parseFloat(expression.substring(1));
        return true;
    }

    return false;
}