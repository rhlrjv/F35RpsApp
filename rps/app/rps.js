function PlayRoundRequest(p1, p2, observer) {
    this.run = () => {
        if (invalid()) {
            observer.invalid()
        } else if (draw()) {
            observer.tie()
        } else if (p1Wins()) {
            observer.p1_wins();
        } else {
            observer.p2_wins();
        }
    };

    const invalid = () => {
        return !VALID_SHAPES.includes(p1) ||
            !VALID_SHAPES.includes(p2)
    };

    const draw = () => {
        return p1 === p2
    };

    const p1Wins = () => {
        return p1 === THROW.rock && p2 === THROW.scissors ||
            p1 === THROW.scissors && p2 === THROW.paper ||
            p1 === THROW.paper && p2 === THROW.rock
    };

    const THROW = {
        rock: 'rock',
        paper: 'paper',
        scissors: 'scissors'
    };

    const VALID_SHAPES = [THROW.rock, THROW.paper, THROW.scissors]
}
function RPS() {
    this.playGame = (p1, p2, observer) => {
        new PlayRoundRequest(p1, p2, observer).run()
    }
}

module.exports = { RPS }