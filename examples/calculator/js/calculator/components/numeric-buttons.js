import BaseComponent from './base-component.js';

export default class NumericButtons extends BaseComponent {
    constructor(options) {
        super(options);
        this._render();

        this._element.addEventListener('click', (event) => {
            if (event.target.closest('.calc__btn[data-label]')) {
                this._onWriteValue(this._onReadValue().concat(event.target.dataset.label));
            }
        });
    }

    _render() {
        this._element.innerHTML = `
           <div>
              ${[...Array(9).keys()].map((_, i) => `<div class="calc__btn" data-label="${i + 1}"></div>`).join('')}
              <div class="calc__btn" data-label="0"></div>
           </div>`;
    }
}