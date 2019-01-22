class GameEngine {
    constructor(puzzleArea) {
        this._puzzleArea = puzzleArea;
        this._puzzleArea.addClickListener({self: this, callback: this._handleClick});
    }

    _handleClick(event) {
        const target = event.target;
        if (target.classList.contains('puzzle__item') && target.dataset.number) {
            this._makeStep(target);
            this._isGameOver()
        }
    }

    _makeStep(element) {
        const areaMatrix = this._puzzleArea.areaMatrix();

        if (this._nearWithEmptyItem(element, areaMatrix)) {
            this._puzzleArea.updateEmptyItem(
                element.dataset.number
            );
            element.removeAttribute('data-number');
        }
    }

    _nearWithEmptyItem(element, areaMatrix) {
        let near = false;
        areaMatrix.forEach((row, ri) => row.forEach((cell, ci) => {
            if (!cell) {
                this._nearestMatrixCoords(ri, ci).forEach(([ri, ci]) => {
                    if (areaMatrix[ri] &&
                        areaMatrix[ri][ci] &&
                        areaMatrix[ri][ci] === element.dataset.number) {
                        near = true;
                        return false;
                    }
                })
            }
        }));
        return near;
    }

    _nearestMatrixCoords(ri, ci) {
        return [
            [ri - 1, ci],
            [ri, ci - 1],
            [ri, ci + 1],
            [ri + 1, ci]
        ];
    }

    _isGameOver() {
        const areaMatrix = this._puzzleArea.areaMatrix();
        const arrayOfNumbers = this._puzzleArea.arrayOfNumbers();

        if (this._isEquals(areaMatrix, arrayOfNumbers)) {
            this._puzzleArea.gameOver();
        }
    }

    _isEquals(matrix, array) {
        let equals = true;
        const arrayFromMatrix = [];
        matrix.forEach(row => row.forEach(cell => arrayFromMatrix.push(cell)));

        arrayFromMatrix
            .filter(value => !!value)
            .map(value => +value)
            .forEach((value, i) => {
                if (value !== array[i]) {
                    equals = false;
                    return false;
                }
            });

        return equals;
    }
}