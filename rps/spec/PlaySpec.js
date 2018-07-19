describe("RPS", () => {
    it("rock vs paper", function () {
        // given inputs are rock , paper, observer
        const observer = jasmine.createSpyObj('observer', ['p2_wins']);

        // when I call play
        new RPS().play('rock', 'paper', observer);

        // then observer.p2 wins was called
        expect(observer.p2_wins).toHaveBeenCalled();

    });

});


class RPS {
    play(p1, p2, observer) {
        observer.p2_wins();
    }
}