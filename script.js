let number1, number2, operator;

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
    } else if (operator === '*') {
        multiply(number1, number2);
    } else if (operator === '/') {
        divide(number1, number2);
    }
}

createButtons();

function createButtons() {
    const arr = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '.', '0', '=', '+'];
    const numberPad = document.getElementById('numberPad');
    for (let i = 0; i < 16; i++) {
        let button = document.createElement('button');
        numberPad.appendChild(button);
        button.textContent = arr[i];
    }
}

const buttons = numberPad.querySelectorAll('button');
buttons.forEach(setButtons);

function setButtons(button) {
    button.setAttribute('style', 'border-color: black; background-color: white; margin: 5px; font-weight: bold; font-size: 20px;');
    button.style.height = '75px';
    button.style.width = '127.5px';
}

