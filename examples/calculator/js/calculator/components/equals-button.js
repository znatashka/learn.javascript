import BaseComponent from './base-component.js';

export default class EqualsButton extends BaseComponent {
    constructor(options) {
        super(options);
        this._render();

        this._element.addEventListener('click', (event) => {
            if (event.target.closest('.calc__equals-btn')) {
                this._calculate();
            }
        });
    }

    _calculate() {
        let expression = this._onReadValue();
        console.log('calculating an expression: ', expression);

        expression = [...expression]
            .map(s => this._operationsKeys.includes(s) ? ` ${s} ` : s)
            .join('')
            .split(' ');

        // todo https://habr.com/ru/post/282379/
        console.log(expression);
    }

    _render() {
        this._element.innerHTML = `<div class="calc__btn calc__equals-btn" data-label="="></div>`;
    }
}