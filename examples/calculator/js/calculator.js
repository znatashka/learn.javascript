class Calculator {
    constructor(element) {
        this._element = element;
        this._element.innerHTML = this._html();

        this._element.addEventListener('click', event => {
            new ClearButtonClick({element: this._element, event: event}).action();
            new CalcButtonClick({element: this._element, event: event}).action();
            new EqualsButtonClick({element: this._element, event: event}).action();
        });
    }

    _html() {
        return `
            <div class="calc">
                <input class="calc__input-field" type="text" placeholder="0">
                <span class="calc__clear-btn"></span>
                <div class="btn calc__equals-btn" data-label="="></div>
                
                <div class="buttons">
                    <div class="calc__numeric-buttons">
                        ${[...Array(9).keys()].map((_, i) => `<div class="btn calc__btn" data-label="${i + 1}"></div>`).join('')}
                        <div class="btn calc__memory-btn" data-label="M+"></div>
                        <div class="btn calc__btn" data-label="0"></div>
                        <div class="btn calc__memory-btn" data-label="M-"></div>
                    </div>                 
                    
                    <div class="calc__function-buttons">
                        ${[...'+-*/'].map(f => `<div class="btn calc__btn" data-label="${f}"></div>`).join('')}
                    </div>
                    </div>
                </div>`;
    }
}

class BaseClick {
    constructor({element, event}) {
        this._element = element;
        this._event = event;
    }

    action() {
        throw new Error('Do nothing!')
    }
}

class ClearButtonClick extends BaseClick {
    constructor(options) {
        super(options);
    }

    action() {
        if (this._event.target.classList.contains('calc__clear-btn')) {
            this._element.querySelector('.calc__input-field').value = '';
        }
    }
}

class CalcButtonClick extends BaseClick {
    constructor(options) {
        super(options);
    }

    action() {
        if (this._event.target.classList.contains('calc__btn')) {
            this._element.querySelector('.calc__input-field').value =
                this._element.querySelector('.calc__input-field').value.concat(this._event.target.dataset.label);
        }
    }
}

class EqualsButtonClick extends BaseClick {
    constructor(options) {
        super(options);
    }

    action() {
        if (this._event.target.classList.contains('calc__equals-btn')) {
            const expression = this._element.querySelector('.calc__input-field').value;
            console.log(expression.split(''))
        }
    }
}