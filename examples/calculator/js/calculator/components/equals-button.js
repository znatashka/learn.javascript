import ComponentWithOperations from "./component-with-operations.js";

export default class EqualsButton extends ComponentWithOperations {
    constructor(options) {
        super(options);
        this._render();

        this.onClick('[data-component="equal-button"]',
            () => this.emit('calculate', this._reversePolishNotation.bind(this)))
    }

    _reversePolishNotation(expression) {
        const stack = [];
        const output = [];
        const result = [];

        expression.forEach(part => {
            if (this._operations.hasOwnProperty(part)) {
                if (stack.length > 0) {
                    const last = stack[stack.length - 1];
                    if (this._operations[last].priority < this._operations[part].priority) {
                        output.push(stack.pop());
                    }
                }
                stack.push(part);
            } else {
                output.push(part);
            }
        });

        while (stack.length > 0) {
            output.push(stack.pop());
        }

        output.forEach(part => {
            if (this._operations.hasOwnProperty(part)) {
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