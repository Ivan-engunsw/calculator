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

//calls the above functions based on the operator
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

// sets up the original content on the calculator display
const displayHistory = document.getElementById('history');
const answer = document.getElementById('answer');
displayHistory.textContent = '0';
answer.textContent = number1;

// fills the history section of the display with the buttons' text that were clicked.
function populateDisplay(e) {
    // updates the answer on the display when '=' is pressed
    if (e.target.innerText === '=') {
        if (checkValidInput(display)) {
            currentResult = operate(number1, number2, operator);
            answer.textContent = currentResult;
            display = '' + currentResult;
        }
    } else if (checkOperator(e.target.innerText) && checkValidInput(display)) {
        // updates the answer and history on display if an operator is clicked
        currentResult = operate(number1, number2, operator);
        answer.textContent = currentResult;
        display = currentResult + e.target.innerText;
        displayHistory.textContent = display;
    } else {
        if (checkExcessiveDots(e)) {
            return;
        }
        // adds to the history section of the display
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
    number1 = 0;
}

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', deleteDisplay);

function deleteDisplay() {
    display = display.substring(0, display.length - 1);
    if (display === '') {
        displayHistory.textContent = '0';
        number1 = 0;
    } else {
        displayHistory.textContent = display;
        number1 = parseFloat(display);
    }
}

function checkOperator(character) {
    return operatorRegex.test(character);
}

function checkValidInput(expression) {
    // checks for invalid devision. The * in regex is for 0 or more.
    if (expression.match(/\d*[÷][0]/)) {
        display = '';
        answer.textContent = 'You tried!';
        return false;
    }

    // when the expression has 'number operator number' format. The + in regex is for 1 or more.
    if (expression.match(/\d+[+×÷-]\d+/)) {
        // we adding 1 below to account for the beginning '-' if there is one
        let operatorIndex = expression.slice(1).search(operatorRegex) + 1;
        number1 = parseFloat(expression.slice(0, operatorIndex));
        operator = expression[operatorIndex];
        number2 = parseFloat(expression.slice(operatorIndex + 1));
        return true;   
    }
    
    //when expression has 'operator number' format so we use 0 as first number
    if (expression.match(/[+×÷-]\d+/)) {
        operator = expression[0];
        number2 = parseFloat(expression.slice(1));
        return true;
    }

    return false;
}

function checkExcessiveDots(e) {
    if (e.target.innerText === '.') {
        let operatorIndex = display.slice(1).search(operatorRegex) + 1;
        // if there is an operator, 0 because we added 1 at the end above
        if (operatorIndex != 0) {
            if (display.slice(operatorIndex + 1).search(/[.]/) != -1) {
                return true;
            }
        } else {
            if (display.slice(0).search(/[.]/) != -1) {
                return true;
            }
        }
    }
    return false;
}