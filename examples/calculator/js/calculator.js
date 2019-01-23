class Base {
    constructor(element) {
        this._element = element;
    }

    render() {
        throw new Error('You have to implement the method `render`!');
    }
}

class Calculator extends Base {
    constructor(element) {
        super(element);
        this._inputField = new InputField(element);
        this._equalsButton = new EqualsButton(element);
        this._numericAndMemoryButtons = new NumericAndMemoryButtons(element, this._inputField);
        this._functionButtons = new FunctionButtons(element);
        this._element.innerHTML = this.render();
    }

    render() {
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

class InputField extends Base {
    constructor(element) {
        super(element);
    }

    render() {
        return `<input class="calc__input-field" type="text" placeholder="0"><span></span></input>`;
    }

    element() {
        return this._element.querySelector('.calc__input-field');
    }
}

class EqualsButton extends Base {
    constructor(element) {
        super(element);
    }

    render() {
        return `<div class="calc__btn btn__equals">=</div>`;
    }
}

class FunctionButtons extends Base {
    constructor(element) {
        super(element);
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
                ${
            [...Object.keys(this._functions)]
                .map(f => `<div class="calc__btn">${f}</div>`).join('')
            }
            </div>
        `;
    }
}

class NumericAndMemoryButtons extends Base {
    constructor(element, inputField) {
        super(element);
        this._inputField = inputField;
        this._labels = {
            '#1': () => this._inputFieldAppend(1),
            '#2': () => this._inputFieldAppend(2),
            '#3': () => this._inputFieldAppend(3),
            '#4': () => this._inputFieldAppend(4),
            '#5': () => this._inputFieldAppend(5),
            '#6': () => this._inputFieldAppend(6),
            '#7': () => this._inputFieldAppend(7),
            '#8': () => this._inputFieldAppend(8),
            '#9': () => this._inputFieldAppend(9),
            '#M+': () => this._putToMemory(),
            '#0': () => this._inputFieldAppend(0),
            '#M-': () => this._getFromMemory()
        };
        this._element.addEventListener('click', (event) => {
            if (event.target.classList.contains('calc__btn')) {
                this._labels['#'.concat(event.target.innerText)]();
            }
        });
    }

    render() {
        return `
            <div class="calc__numeric-buttons">
                ${
            [...Object.keys(this._labels)]
                .map(label =>
                    `<div class="calc__btn">${label.split('#')[1]}</div>`).join('')
            }
            </div>
        `;
    }

    _inputFieldAppend(part) {
        this._inputField.element().value = this._inputField.element().value.concat(part)
    }

    _putToMemory() {

    }

    _getFromMemory() {

    }
}