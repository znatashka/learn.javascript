import BaseComponent from './base-component.js';

export default class MemoryButtons extends BaseComponent {
    constructor(options) {
        super(options);
        this._data = [];
        this._render();

        this._element.addEventListener('click', (event) => {
            if (event.target.closest('[data-label]')) {
                if (event.target.dataset.label === 'M+') {
                    this._write();
                } else if (event.target.dataset.label === 'M-') {
                    this._read();
                }
            }
        });
    }

    _render() {
        this._element.innerHTML = `
            <div class="calc__memory-buttons">
                <div class="calc__btn calc__memory-btn" data-label="M+"></div>
                <div class="calc__btn calc__memory-btn" data-label="M-"></div>
            </div>`;
    }

    _read() {
        if (this._data.length > 0) {
            this._onWriteValue(this._onReadValue().concat(this._data.pop()));
        }
    }

    _write() {
        const value = this._onReadValue();
        if (value) {
            this._data.push(value);
            this._onWriteValue('');
        }
    }
}