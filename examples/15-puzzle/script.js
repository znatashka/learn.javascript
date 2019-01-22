let newGame = function () {
    new GameEngine(
        new PuzzleArea(
            document.querySelector('.puzzle')
        )
    );
};

newGame();

document.querySelector('.btn__new-game').addEventListener('click', () => newGame());