export default class BaseComponent {
    constructor({element}) {
        this._element = element;
        this._events = [];
    }

    onClick(selector, callback) {
        this._element.addEventListener('click', event => {
            if (event.target.closest(selector)) {
                callback(event);
            }
        });
    }

    subscribe(eventName, callback) {
        const events = this._events[eventName] || [];
        events.push(callback);
        this._events[eventName] = events;
        return this;
    }

    emit(eventName, ...args) {
        (this._events[eventName] || [])
            .forEach(event => event(...args));
    }

    _render() {
        throw new Error('you must implement `_render` method');
    }
}
