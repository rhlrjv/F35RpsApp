const {RPS, THROW} = require('../app/rps')

describe('RPS', () => {
    let roundObserverSpy, game

    beforeEach(() => {
        game = new RPS()
    })

    describe('P2 Wins scenarios', () => {
        beforeEach(() => {
            roundObserverSpy = jasmine.createSpyObj('observer', ['p2_wins'])
        })

        it('rock vs paper', () => {
            game.playRound(THROW.rock, THROW.paper, roundObserverSpy)
            expect(roundObserverSpy.p2_wins).toHaveBeenCalled()
        })

        it('paper vs scissors', () => {
            game.playRound(THROW.paper, THROW.scissors, roundObserverSpy)
            expect(roundObserverSpy.p2_wins).toHaveBeenCalled()
        })

        it('scissors vs rock', () => {
            game.playRound(THROW.scissors, THROW.rock, roundObserverSpy)
            expect(roundObserverSpy.p2_wins).toHaveBeenCalled()
        })
    })

    describe('P1 Wins scenarios', () => {
        beforeEach(() => {
            roundObserverSpy = jasmine.createSpyObj('observer', ['p1_wins'])
        })

        it('paper vs rock', () => {
            game.playRound(THROW.paper, THROW.rock, roundObserverSpy)
            expect(roundObserverSpy.p1_wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            game.playRound(THROW.scissors, THROW.paper, roundObserverSpy)
            expect(roundObserverSpy.p1_wins).toHaveBeenCalled()
        })

        it('rock vs scissors', () => {
            game.playRound(THROW.rock, THROW.scissors, roundObserverSpy)
            expect(roundObserverSpy.p1_wins).toHaveBeenCalled()
        })
    })

    describe('Tie scenarios', () => {
        beforeEach(() => {
            roundObserverSpy = jasmine.createSpyObj('observer', ['tie'])
        })

        it('rock vs rock', () => {
            game.playRound(THROW.rock, THROW.rock, roundObserverSpy)
            expect(roundObserverSpy.tie).toHaveBeenCalled()
        })

        it('paper vs paper', () => {
            game.playRound(THROW.paper, THROW.paper, roundObserverSpy)
            expect(roundObserverSpy.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', () => {
            game.playRound(THROW.scissors, THROW.scissors, roundObserverSpy)
            expect(roundObserverSpy.tie).toHaveBeenCalled()
        })
    })

    describe('Invalid scenarios', () => {
        let invalidThrow
        beforeEach(() => {
            roundObserverSpy = jasmine.createSpyObj('observer', ['invalid'])
            invalidThrow = Math.random().toString()
        })

        it('valid vs invalid', () => {
            game.playRound(THROW.rock, invalidThrow, roundObserverSpy)
            expect(roundObserverSpy.invalid).toHaveBeenCalled()
        })

        it('invalid vs valid', () => {
            game.playRound(invalidThrow, THROW.paper, roundObserverSpy)
            expect(roundObserverSpy.invalid).toHaveBeenCalled()
        })

        it('invalid vs invalid', () => {
            game.playRound(invalidThrow, invalidThrow, roundObserverSpy)
            expect(roundObserverSpy.invalid).toHaveBeenCalled()
        })
    })
})
