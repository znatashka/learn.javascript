import BaseComponent from './base-component.js';

export default class MemoryButtons extends BaseComponent {
    constructor(options) {
        super(options);
        this._data = [];
        this._render();

        this.onClick('[data-label]', (event) => {
            if (event.target.dataset.label === 'M+') {
                this.emit('save-to-memory', this._memorize.bind(this))
            } else if (event.target.dataset.label === 'M-') {
                this.emit('read-from-memory', this._data.pop())
            }
        })
    }

    _memorize(value) {
        this._data.push(value)
    }

    _render() {
        this._element.innerHTML = `
            <div class="calc__memory-buttons">
                <div class="calc__btn calc__memory-btn" data-label="M+"></div>
                <div class="calc__btn calc__memory-btn" data-label="M-"></div>
            </div>`;
    }
}