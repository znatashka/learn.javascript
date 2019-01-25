export default class BaseComponent {
    constructor({element, onWriteValue, onReadValue}) {
        this._element = element;
        this._onWriteValue = onWriteValue;
        this._onReadValue = onReadValue;

        this._operations = {
            '+': {priority: 2, func: (a, b) => a + b},
            '-': {priority: 2, func: (a, b) => a - b},
            '*': {priority: 1, func: (a, b) => a * b},
            '/': {priority: 1, func: (a, b) => a / b}
        };
        this._operationsKeys = [...Object.keys(this._operations)];
    }

    _render() {
        throw new Error('you must implement `_render` method');
    }
}
