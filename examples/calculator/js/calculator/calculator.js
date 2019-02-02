import NumericButtons from './components/numeric-buttons.js';
import FunctionButtons from './components/function-buttons.js';
import MemoryButtons from './components/memory-buttons.js';
import EqualsButton from './components/equals-button.js';

export default class Calculator {
    constructor({element}) {
        this._element = element;
        this._render();

        this._textField = this._element.querySelector('[data-element="text-field"]');

        new NumericButtons({
            element: this._element.querySelector('[data-component="numeric-buttons"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        });

        new FunctionButtons({
            element: this._element.querySelector('[data-component="function-buttons"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        });

        new MemoryButtons({
            element: this._element.querySelector('[data-component="memory-buttons"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        });

        new EqualsButton({
            element: this._element.querySelector('[data-component="equal-button"]'),
            onWriteValue: this._writeValue.bind(this),
            onReadValue: this._readValue.bind(this)
        });

        this._element.addEventListener('click', (event) => {
            if (event.target.closest('[data-element="clear-button"]')) {
                this._writeValue('');
            }
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