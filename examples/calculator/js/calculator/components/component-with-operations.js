import BaseComponent from "./base-component.js";

export default class ComponentWithOperations extends BaseComponent{
    constructor(options) {
        super(options);

        this._operations = {
            '+': {priority: 2, func: (a, b) => a + b},
            '-': {priority: 2, func: (a, b) => a - b},
            '*': {priority: 1, func: (a, b) => a * b},
            '/': {priority: 1, func: (a, b) => a / b}
        };
    }
}