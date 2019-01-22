class PuzzleArea {
    constructor(element) {
        this._element = element;
        this._sizeOfArea = 4;
        this._element.classList.remove('game_over');
        this._render();
    }

    addClickListener({self, callback}) {
        this._element.addEventListener('click', (event) => {
            if (!this._element.classList.contains('game_over')) {
                callback.call(self, event);
            }
        })
    }

    arrayOfNumbers() {
        const numbers = [];
        [...Array(this._sizeOfArea).keys()].map((i) =>
            [...Array(this._sizeOfArea).keys()]
                .filter(j => this._isNotSixteen(i, j))
                .map(j => numbers.push((this._sizeOfArea * i) + (j + 1)))
        );
        return numbers;
    }

    areaMatrix() {
        const matrix = [];
        const table = this._element.querySelector('table');
        [...table.rows].forEach(row => {
            matrix.push(
                [...row.cells].map(cell => cell.dataset.number)
            );
        });
        return matrix;
    }

    updateEmptyItem(number) {
        const table = this._element.querySelector('table');
        [...table.rows].forEach(row => {
            const empties = [...row.cells].filter(cell => !cell.dataset.number);
            if (empties.length > 0) {
                empties[0].setAttribute('data-number', number);
                return false;
            }
        })
    }

    gameOver() {
        this._element.classList.add('game_over');
    }

    _render() {
        const randomNumber = this._randomNumber();
        this._element.innerHTML = `
                <table>
                    ${[...Array(4).keys()].map(() => `
                         <tr>
                             ${[...Array(4).keys()].map(() => `
                                  <td class="puzzle__item" ${this._dataNumberAttribute(randomNumber())}></td>
                             `).join('')}
                         </tr>
                    `).join('')}
                </table>
            `;
    }

    _isNotSixteen(i, j) {
        return !(i === (this._sizeOfArea - 1) && j === (this._sizeOfArea - 1));
    }

    _randomNumber() {
        const arrayOfNumbers = this.arrayOfNumbers();
        return function () {
            let index = Math.round(Math.random()) * (arrayOfNumbers.length - 1);
            let number = arrayOfNumbers[index];
            arrayOfNumbers.splice(index, 1);
            return number;
        }
    }

    _dataNumberAttribute(number) {
        if (number) {
            return `data-number="${number}"`;
        }
    }
}