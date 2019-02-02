import NumericButtons from './components/numeric-buttons.js';
import FunctionButtons from './components/function-buttons.js';
import MemoryButtons from './components/memory-buttons.js';
import EqualsButton from './components/equals-button.js';
import ComponentWithOperations from "./components/component-with-operations.js";

export default class Calculator extends ComponentWithOperations {
    constructor(options) {
        super(options);
        this._render();

        this._textField = this._element.querySelector('[data-element="text-field"]');

        this._initNumericButtons();
        this._initFunctionButtons();
        this._initMemoryButtons();
        this._initEqualsButton();

        this.onClick('[data-element="clear-button"]', this._writeValue(''))
    }

    _initEqualsButton() {
        new EqualsButton({
            element: this._element.querySelector('[data-component="equal-button"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        }).subscribe('calculate', calculate => {
            const expression = [...this._readValue()]
                .map(s => this._operations.hasOwnProperty(String(s)) ? ` ${s} ` : s)
                .join('')
                .split(' ');

            this._writeValue(
                calculate(expression)
            );
        })
    }

    _initMemoryButtons() {
        new MemoryButtons({
            element: this._element.querySelector('[data-component="memory-buttons"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        }).subscribe('save-to-memory', memorize => {
            const value = this._readValue();
            if (value) {
                memorize(value);
                this._writeValue('');
            }
        }).subscribe('read-from-memory', value => {
            if (value) {
                this._writeValue(this._readValue().concat(value));
            }
        })
    }

    _initFunctionButtons() {
        new FunctionButtons({
            element: this._element.querySelector('[data-component="function-buttons"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        }).subscribe('write-operation', value => {
            const arrayOfValues = [...this._readValue()];
            const lastItem = arrayOfValues[arrayOfValues.length - 1];

            if (this._operations.hasOwnProperty(String(lastItem))) {
                arrayOfValues.pop();
                arrayOfValues.push(value);
                this._writeValue(arrayOfValues.join(''));
            } else {
                this._writeValue(this._readValue().concat(value));
            }
        })
    }

    _initNumericButtons() {
        new NumericButtons({
            element: this._element.querySelector('[data-component="numeric-buttons"]')
        }).subscribe('write_number', value => {
            this._writeValue(
                this._readValue().concat(value)
            );
        });
    }

    _readValue() {
        return this._textField.value;
    }

    _writeValue(value) {
        this._textField.value = value
    }

    _render() {
        this._element.innerHTML = `
            <div class="calc">
                <input class="calc__input-field" data-element="text-field" type="text" placeholder="0" readonly>
                
                <span class="calc__clear-btn" data-element="clear-button"></span>
                
                <div data-component="equal-button"></div> 
                
                <div class="buttons">
                    <div data-component="numeric-buttons"></div> 
                    <div data-component="function-buttons"></div>
                    <div data-component="memory-buttons"></div>
                 </div>
             </div>`;
    }
}