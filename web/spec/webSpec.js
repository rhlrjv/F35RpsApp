const ReactDOM = require('react-dom')
const ReactTestUtils = require('react-dom/test-utils')
const React = require('react')
const {PlayForm} = require('../src/PlayForm')

describe('PlayForm', () => {
    let domFixture

    beforeEach(function () {
        domFixture = document.createElement('div')
        document.body.appendChild(domFixture)
    })

    afterEach(function () {
        domFixture.remove()
    })

    function renderPlayForm(game) {
        ReactDOM.render(
            <PlayForm game={game}></PlayForm>,
            domFixture
        )
    }

    function play() {
        domFixture.querySelector('button').click()
    }

    function getResultText() {
        return domFixture.querySelector('.result').innerText
    }

    function inputUserThrow(selector, value) {
        const input = domFixture.querySelector('[name="' + selector + '"]')
        input.value = value
        ReactTestUtils.Simulate.change(input)
    }

    it('should display invalid when RPS returns invalid', () => {
        const alwaysInvalidGameStub = {
            playRound: (t1, t2, roundObserver) => roundObserver.invalid()
        }
        renderPlayForm(alwaysInvalidGameStub)

        expect(getResultText()).not.toBe('Invalid!')
        play()
        expect(getResultText()).toBe('Invalid!')
    })

    it('should display tie when RPS returns tie', () => {
        const alwaysTieGameStub = {
            playRound: (t1, t2, roundObserver) => roundObserver.tie()
        }
        renderPlayForm(alwaysTieGameStub)

        expect(getResultText()).not.toBe('Tie!')
        play()
        expect(getResultText()).toBe('Tie!')
    })

    it('should display p1_wins when RPS returns p1_wins', () => {
        const alwaysP1WinsGameStub = {
            playRound: (t1, t2, roundObserver) => roundObserver.p1_wins()
        }
        renderPlayForm(alwaysP1WinsGameStub)

        expect(getResultText()).not.toBe('Player 1 Wins!')
        play()
        expect(getResultText()).toBe('Player 1 Wins!')
    })

    it('should display p2_wins when RPS returns p2_wins', () => {
        const alwaysP2WinsGameStub = {
            playRound: (t1, t2, roundObserver) => roundObserver.p2_wins()
        }
        renderPlayForm(alwaysP2WinsGameStub)

        expect(getResultText()).not.toBe('Player 2 Wins!')
        play()
        expect(getResultText()).toBe('Player 2 Wins!')
    })

    it('should pass user inputs to RPS', function () {
        const p1_throw = Math.random().toString();
        const p2_throw = Math.random().toString();

        const gameSpy = jasmine.createSpyObj('game', ['playRound'])
        renderPlayForm(gameSpy)

        inputUserThrow('p1_throw', p1_throw)
        inputUserThrow('p2_throw', p2_throw)
        play()

        expect(gameSpy.playRound).toHaveBeenCalledWith(p1_throw, p2_throw, jasmine.any(Object))
    })
})