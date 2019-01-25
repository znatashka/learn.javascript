import BaseComponent from './base-component.js';

export default class FunctionButtons extends BaseComponent {
    constructor(options) {
        super(options);
        this._render();

        this._element.addEventListener('click', (event) => {
            if (event.target.closest('.calc__btn[data-label]')) {
                const value = this._onReadValue();
                const arrayOfValues = [...value];
                const lastItem = arrayOfValues[arrayOfValues.length - 1];

                if (this._operationsKeys.includes(lastItem)) {
                    arrayOfValues.pop();
                    arrayOfValues.push(...event.target.dataset.label);
                    this._onWriteValue(arrayOfValues.join(''));
                } else {
                    this._onWriteValue(value.concat(event.target.dataset.label));
                }
            }
        });
    }

    _render() {
        this._element.innerHTML = `
            <div class="calc__function-buttons">
                ${this._operationsKeys.map(f => `<div class="calc__btn" data-label="${f}"></div>`).join('')}
            </div>`;
    }
}