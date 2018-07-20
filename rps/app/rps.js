function PlayRoundRequest(throw1, throw2, roundObserver) {
    this.run = () => {
        if (invalid()) {
            roundObserver.invalid()
        } else if (tie()) {
            roundObserver.tie()
        } else if (p1Wins()) {
            roundObserver.p1_wins()
        } else {
            roundObserver.p2_wins()
        }
    }

    const invalid = () => {
        return !VALID_THROWS.includes(throw1) ||
            !VALID_THROWS.includes(throw2)
    }

    const tie = () => {
        return throw1 === throw2
    }

    const p1Wins = () => {
        return throw1 === THROW.rock && throw2 === THROW.scissors ||
            throw1 === THROW.scissors && throw2 === THROW.paper ||
            throw1 === THROW.paper && throw2 === THROW.rock
    }

    const VALID_THROWS = [THROW.rock, THROW.paper, THROW.scissors]
}

function RPS() {
    this.playRound = (throw1, throw2, roundObserver) => {
        new PlayRoundRequest(throw1, throw2, roundObserver).run()
    }
}

const THROW = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
}

module.exports = {RPS, THROW}