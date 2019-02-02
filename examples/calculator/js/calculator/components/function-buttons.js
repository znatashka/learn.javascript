import ComponentWithOperations from "./component-with-operations.js";

export default class FunctionButtons extends ComponentWithOperations {
    constructor(options) {
        super(options);
        this._render();

        this._element.addEventListener('click', (event) => {
            if (event.target.closest('[data-label]')) {
                const value = this._onReadValue();
                const arrayOfValues = [...value];
                const lastItem = arrayOfValues[arrayOfValues.length - 1];

                if (this._operations.hasOwnProperty(String(lastItem))) {
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
                ${[...Object.keys(this._operations)].map(f => `<div class="calc__btn" data-label="${f}"></div>`).join('')}
            </div>
         `;
    }
}