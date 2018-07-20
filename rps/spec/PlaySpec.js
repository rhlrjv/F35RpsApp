const {RPS} = require('../app/rps')

describe("RPS", () => {
    let observerSpy, request;

    beforeEach(() => {
        request = new RPS();
    });

    describe("P2 Wins scenarios", () => {
        beforeEach(() => {
            observerSpy = jasmine.createSpyObj('observer', ['p2_wins']);
        });

        it("rock vs paper", () => {
            request.playGame('rock', 'paper', observerSpy);
            expect(observerSpy.p2_wins).toHaveBeenCalled();
        });

        it("paper vs scissors", () => {
            request.playGame('paper', 'scissors', observerSpy);
            expect(observerSpy.p2_wins).toHaveBeenCalled();
        });

        it("scissors vs rock", () => {
            request.playGame('scissors', 'rock', observerSpy);
            expect(observerSpy.p2_wins).toHaveBeenCalled();
        });
    });

    describe("P1 Wins scenarios", () => {
        beforeEach(() => {
            observerSpy = jasmine.createSpyObj('observer', ['p1_wins']);
        });

        it("paper vs rock", () => {
            request.playGame('paper', 'rock', observerSpy);
            expect(observerSpy.p1_wins).toHaveBeenCalled();
        });

        it("scissors vs paper", () => {
            request.playGame('scissors', 'paper', observerSpy);
            expect(observerSpy.p1_wins).toHaveBeenCalled();
        });

        it("rock vs scissors", () => {
            request.playGame('rock', 'scissors', observerSpy);
            expect(observerSpy.p1_wins).toHaveBeenCalled();
        });
    });

    describe("Tie scenarios", () => {
        beforeEach(() => {
            observerSpy = jasmine.createSpyObj('observer', ['tie']);
        });

        it("rock vs rock", () => {
            request.playGame('rock', 'rock', observerSpy);
            expect(observerSpy.tie).toHaveBeenCalled();
        });

        it("paper vs paper", () => {
            request.playGame('paper', 'paper', observerSpy);
            expect(observerSpy.tie).toHaveBeenCalled();
        });

        it("scissors vs scissors", () => {
            request.playGame('scissors', 'scissors', observerSpy);
            expect(observerSpy.tie).toHaveBeenCalled();
        });
    });

    describe("Invalid scenarios", () => {
        let invalidShape;
        beforeEach(() => {
            observerSpy = jasmine.createSpyObj('observer', ['invalid']);
            invalidShape = Math.random().toString()
        });

        it("valid vs invalid", () => {
            request.playGame('rock', invalidShape, observerSpy);
            expect(observerSpy.invalid).toHaveBeenCalled();
        });

        it("invalid vs valid", () => {
            request.playGame(invalidShape, 'paper', observerSpy);
            expect(observerSpy.invalid).toHaveBeenCalled();
        });

        it("invalid vs invalid", () => {
            request.playGame(invalidShape, invalidShape, observerSpy);
            expect(observerSpy.invalid).toHaveBeenCalled();
        })
    });
});
