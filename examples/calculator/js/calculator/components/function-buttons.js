import ComponentWithOperations from "./component-with-operations.js";

export default class FunctionButtons extends ComponentWithOperations {
    constructor(options) {
        super(options);
        this._render();

        this.onClick('[data-label]',
            event => this.emit('write-operation', event.target.dataset.label))
    }

    _render() {
        this._element.innerHTML = `
            <div class="calc__function-buttons">
                ${[...Object.keys(this._operations)].map(f => `<div class="calc__btn" data-label="${f}"></div>`).join('')}
            </div>
         `;
    }
}