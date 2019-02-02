import BaseComponent from './base-component.js';

export default class NumericButtons extends BaseComponent {
    constructor(options) {
        super(options);
        this._render();

        this.onClick('[data-label]', (event) => {
            this.emit('write_number', event.target.dataset.label)
        })
    }

    _render() {
        this._element.innerHTML = `
           <div>
              <div class="calc__btn" data-label="1"></div>
              <div class="calc__btn" data-label="2"></div>
              <div class="calc__btn" data-label="3"></div>
              <div class="calc__btn" data-label="4"></div>
              <div class="calc__btn" data-label="5"></div>
              <div class="calc__btn" data-label="6"></div>
              <div class="calc__btn" data-label="7"></div>
              <div class="calc__btn" data-label="8"></div>
              <div class="calc__btn" data-label="9"></div>
              <div class="calc__btn" data-label="0"></div>
           </div>`;
    }
}