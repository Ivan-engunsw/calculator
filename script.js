let number2, operator;
let number1 = 0;
let display = '0';

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
        add(number1, number2);
    } else if (operator === '-') {
        subtract(number1, number2);
    } else if (operator === '×') {
        multiply(number1, number2);
    } else if (operator === '÷') {
        divide(number1, number2);
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
displayHistory.textContent = display;
answer.textContent = number1;

// fills the history section of the display with the buttons' text that were clicked.
function populateDisplay(e) {
    if (e.target.innerText === '=') {
        operate(number1, number2, operator);
    } else if (checkOperator(e.target.innerText)) {
        //make another function that checks if there is enough input for operating
    }
    display = display.concat(e.target.innerText);
    displayHistory.textContent = display;
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
        display = '0';
    }
    displayHistory.textContent = display;
}

function checkOperator(character) {
    return ((character === '+') || (character === '-') || (character === '×') || (character === '÷'));
}