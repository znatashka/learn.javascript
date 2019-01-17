(() => {
    'use strict';

    let sizeOfArea = 3;
    let gameInProcess = false;

    const utils = new Utils();
    const diagonals = new Diagonals();

    const cross = new Player('X');
    const zero = new Player('O');

    function Step(row, cell) {
        this.row = row;
        this.cell = cell;
    }

    function Player(symbol) {
        this.setUpLabel = (cell) => {
            if (cell.notEmpty()) {
                cell.emptyValue(() => {
                    cell.updateValue(symbol);
                });
            }
        };

        this.steps = () => {
            let steps = [];
            for (let i = 0; i < table.rows.length; i++) {
                let row = table.rows[i];
                for (let j = 0; j < row.cells.length; j++) {
                    let cell = row.cells[j];
                    if (cell.innerHTML === symbol) {
                        steps.push(new Step(i, j));
                    }
                }
            }
            return steps;
        };
    }

    function ClickEvent(event) {
        this.cell = (func) => {
            if (event.target.tagName === 'TD') {
                func.apply(this, arguments);
            }
        }
    }

    function Cell(cell) {
        this.notEmpty = () => {
            return Boolean(cell);
        };

        this.emptyValue = (func) => {
            if (!cell.innerHTML) {
                func.apply(this, arguments);
            }
        };

        this.updateValue = (value) => {
            cell.innerHTML = value;
        }
    }

    function RandomCell() {
        this.empty = () => {
            let empty = [];
            for (let i = 0; i < table.rows.length; i++) {
                let row = table.rows[i];
                for (let j = 0; j < row.cells.length; j++) {
                    new Cell(row.cells[j])
                        .emptyValue(() => {
                            empty.push(row.cells[j]);
                        })
                }
            }

            let cell;
            if (empty.length > 0) {
                cell = empty[Math.round(Math.random() * (empty.length - 1))];
            }
            return cell;
        }
    }

    function AI() {
        let findNexStepByRow = (steps) => {
            let maxCount = 0;
            let maxByRow;
            utils.groupBy(steps, 'row')
                .forEach(group => {
                    if (group.count > maxCount) {
                        maxByRow = group.value[0];
                        maxCount = group.count;
                    }
                });
            const cells = [];
            for (let i = 0; i < table.rows[maxByRow.row].cells.length; i++) {
                const tmp = table.rows[maxByRow.row].cells[i];
                new Cell(tmp)
                    .emptyValue(() => {
                        cells.push(tmp)
                    })
            }
            return [maxCount, cells[Math.round(Math.random() * (cells.length - 1))]];
        };

        let findNextStepByColumn = (steps) => {
            let maxCount = 0;
            let maxByCell;
            utils.groupBy(steps, 'cell')
                .forEach(group => {
                    if (group.count > maxCount) {
                        maxByCell = group.value[0];
                        maxCount = group.count;
                    }
                });
            const cells = [];
            for (let i = 0; i < table.rows.length; i++) {
                const tmp = table.rows[i].cells[maxByCell.cell];
                new Cell(tmp)
                    .emptyValue(() => {
                        cells.push(tmp)
                    })
            }
            return [maxCount, cells[Math.round(Math.random() * (cells.length - 1))]];
        };

        let findNextStepByDiagonal = (steps, diagonal) => {
            let byDiagonal = steps.filter(item => {
                return diagonal.filter(d => d.row === item.row && d.cell === item.cell).length > 0
            });
            let cells = [];
            for (let d of diagonal) {
                const tmp = table.rows[d.row].cells[d.cell];
                new Cell(tmp)
                    .emptyValue(() => {
                        cells.push(tmp)
                    })
            }

            return [byDiagonal.length, cells[Math.round(Math.random() * (cells.length - 1))]];
        };

        let allEquals = (array) => {
            const value = array[0];
            return array.filter(item => item !== value).length === 0;
        };

        this.nextStep = () => {
            if (new RandomCell().empty()) {
                let cell;
                const steps = cross.steps();

                const [maxByRow, cellByRow] = findNexStepByRow(steps);
                const [maxByColumn, cellByColumn] = findNextStepByColumn(steps);
                const [maxByMainDiag, cellByMainDiag] = findNextStepByDiagonal(steps, diagonals.main());
                const [maxByRevDiag, cellByRevDiag] = findNextStepByDiagonal(steps, diagonals.reverse());

                const arrayOfMax = [maxByRow, maxByColumn, maxByMainDiag, maxByRevDiag];
                const arrayOfCells = [cellByRow, cellByColumn, cellByMainDiag, cellByRevDiag];
                if (allEquals(arrayOfMax)) {
                    cell = arrayOfCells[Math.round(Math.random() * (arrayOfMax.length - 1))];
                } else {
                    let max = Math.max.apply(Math, arrayOfMax);
                    switch (max) {
                        case maxByRow:
                            cell = cellByRow;
                            break;
                        case maxByColumn:
                            cell = cellByColumn;
                            break;
                        case maxByMainDiag:
                            cell = cellByMainDiag;
                            break;
                        case maxByRevDiag:
                            cell = cellByRevDiag;
                            break;
                    }
                }

                return cell || new RandomCell().empty();
            }
        }
    }

    function Winner() {
        const byDiagonal = (steps, diagonal) => {
            return steps.filter(item => {
                return diagonal.filter(d => d.row === item.row && d.cell === item.cell).length > 0
            }).length === sizeOfArea
        };

        const byStraight = (steps, direction) => {
            const groups = utils.groupBy(steps, direction);
            for (const [, group] of groups.entries()) {
                if (group.count === sizeOfArea) {
                    return true;
                }
            }
            return false;
        };

        const winner = (player) => {
            const steps = player.steps();
            return byStraight(steps, 'row') ||
                byStraight(steps, 'cell') ||
                byDiagonal(steps, diagonals.main()) ||
                byDiagonal(steps, diagonals.reverse());
        };

        const draw = () => {
            return !new RandomCell().empty();
        };

        this.notFound = (func) => {
            if (winner(cross)) {
                table.classList.add('win');
                gameInProcess = false
            } else if (winner(zero)) {
                table.classList.add('loss');
                gameInProcess = false;
            } else if (draw()) {
                table.classList.add('draw');
                gameInProcess = false;
            } else {
                if (func) {
                    func.apply(this, arguments);
                    this.notFound();
                }
            }
        }
    }

    function Diagonals() {
        const main = [];
        const reverse = [];

        const create = () => {
            for (let i = 0; i < sizeOfArea; i++) {
                main.push({row: i, cell: i});
                reverse.push({row: i, cell: (sizeOfArea - 1 - i)});
            }
        };

        this.main = () => {
            if (main.length === 0) {
                create();
            }
            return main;
        };

        this.reverse = () => {
            if (main.length === 0) {
                create();
            }
            return reverse;
        }
    }

    function Utils() {
        this.groupBy = function (steps, key) {
            const output = new Map;
            steps.forEach(step => {
                let number = step[key];
                if (!output.has(number) ||
                    output.get(number).value.filter(item => item[key] === number).length === 0) {
                    output.set(number, {value: [step], count: 1});
                } else {
                    output.get(number).value.push(step);
                    output.get(number).count++;
                }
            });
            return output;
        };
    }

    function GameArea() {
        this.drawGrid = () => {
            for (let i = 0; i < sizeOfArea; i++) {
                let row = document.createElement('tr');
                for (let j = 0; j < sizeOfArea; j++) {
                    row.appendChild(
                        document.createElement('td')
                    )
                }
                table.appendChild(row);
            }
        };

        this.clear = () => {
            table.innerHTML = '';
            table.className = '';
        }
    }

    const game = document.querySelector('.game');
    const table = game.querySelector('table');
    const newGame = game.querySelector('.btn.new__game');
    const settings = document.querySelector('.game__settings');
    const start = settings.querySelector('.btn.start');
    const input = settings.querySelector('input');

    start.addEventListener('click', () => {
        let areaSize = +input.value;
        if (areaSize >= 3) {
            sizeOfArea = areaSize;
            new GameArea().drawGrid();
            settings.hidden = true;
            game.hidden = false;
            gameInProcess = true;
        } else {
            input.classList.add('wrong');
        }
    });

    input.addEventListener('input', () => {
        input.classList.remove('wrong')
    });

    newGame.addEventListener('click', () => {
        settings.hidden = false;
        game.hidden = true;
        new GameArea().clear();
    });

    table.addEventListener('click', (event) => {
        if (gameInProcess) {
            new ClickEvent(event)
                .cell(() => {
                    let cell = new Cell(event.target);
                    cell.emptyValue(() => {
                        cross.setUpLabel(cell);

                        setTimeout(
                            () => {
                                new Winner()
                                    .notFound(() => {
                                        zero.setUpLabel(
                                            new Cell(
                                                new AI().nextStep()
                                            )
                                        )
                                    });
                            },
                            500
                        )
                    });
                })
        }
    });
})();