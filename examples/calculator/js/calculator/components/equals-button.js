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
        const expression = [...this._onReadValue()]
            .map(s => this._operationsKeys.includes(s) ? ` ${s} ` : s)
            .join('')
            .split(' ');

        this._onWriteValue(
            this._rpn(expression)
        );
    }

    _rpn(expression) {
        const stack = [];
        const output = [];
        const result = [];

        expression.forEach(part => {
            if (this._operationsKeys.includes(part)) {
                if (stack.length === 0) {
                    stack.push(part);
                } else {
                    const last = stack[stack.length - 1];
                    if (this._operations[last].priority < this._operations[part].priority) {
                        output.push(stack.pop());
                    }
                    stack.push(part);
                }
            } else {
                output.push(part);
            }
        });

        while (stack.length > 0) {
            output.push(stack.pop());
        }

        output.forEach(part => {
            if (this._operationsKeys.includes(part)) {
                const b = +result.pop();
                const a = +result.pop();
                result.push(
                    this._operations[part].func(a, b)
                );
            } else {
                result.push(part);
            }
        });
        return result.pop();
    }

    _render() {
        this._element.innerHTML = `<div class="calc__btn calc__equals-btn" data-label="="></div>`;
    }
}