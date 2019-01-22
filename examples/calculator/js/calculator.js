class Calculator {
    constructor(element) {
        this._inputField = new InputField();
        this._equalsButton = new EqualsButton();
        this._numericAndMemoryButtons = new NumericAndMemoryButtons();
        this._functionButtons = new FunctionButtons();

        element.innerHTML = this._render();
    }

    _render() {
        return `
            <div class="calc">
                ${this._inputField.render()}
                ${this._equalsButton.render()}
                
                <div class="buttons">
                    ${this._numericAndMemoryButtons.render()}                    
                    ${this._functionButtons.render()}
                </div>
            </div>
        `;
    }
}

class InputField {
    constructor() {

    }

    render() {
        return `<input class="calc__input-field" type="text" placeholder="0">`;
    }
}

class EqualsButton {
    constructor() {

    }

    render() {
        return `<div class="calc__btn btn__equals">=</div>`;
    }
}

class FunctionButtons {
    constructor() {
        this._functions = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        }
    }

    render() {
        return `
            <div class="calc__function-buttons">
                ${[...Object.keys(this._functions)].map(f => `<div class="calc__btn">${f}</div>`).join('')}
            </div>
        `;
    }
}

class NumericAndMemoryButtons {
    constructor() {
        this._labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'M+', 0, 'M-'];
    }

    render() {
        return `
            <div class="calc__numeric-buttons">
                ${this._labels.map(label => `<div class="calc__btn">${label}</div>`).join('')}
            </div>
        `;
    }
}