export default class BaseComponent {
    constructor({element, onWriteValue, onReadValue}) {
        this._element = element;
        this._onWriteValue = onWriteValue;
        this._onReadValue = onReadValue;
    }

    _render() {
        throw new Error('you must implement `_render` method');
    }
}
