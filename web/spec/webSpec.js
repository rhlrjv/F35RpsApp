const ReactDOM = require('react-dom')
const ReactTestUtils = require('react-dom/test-utils')
const React = require('react')

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

    it('should display invalid when RPS returns invalid', () => {
        const alwaysInvalidGameStub = {
            play: (t1, t2, roundObserver) => roundObserver.invalid()
        }
        renderPlayForm(alwaysInvalidGameStub)

        expect(getResultText()).not.toBe('Invalid!')
        play()
        expect(getResultText()).toBe('Invalid!')
    })

    it('should display tie when RPS returns tie', () => {
        const alwaysTieGameStub = {
            play: (t1, t2, roundObserver) => roundObserver.tie()
        }
        renderPlayForm(alwaysTieGameStub)

        expect(getResultText()).not.toBe('Tie!')
        play()
        expect(getResultText()).toBe('Tie!')
    })
    
    it('should display p1_wins when RPS returns p1_wins', () => {
        const alwaysP1WinsGameStub = {
            play: (t1, t2, roundObserver) => roundObserver.p1_wins()
        }
        renderPlayForm(alwaysP1WinsGameStub)

        expect(getResultText()).not.toBe('Player 1 Wins!')
        play()
        expect(getResultText()).toBe('Player 1 Wins!')
    })
    
    it('should display p2_wins when RPS returns p2_wins', () => {
        const alwaysP2WinsGameStub = {
            play: (t1, t2, roundObserver) => roundObserver.p2_wins()
        }
        renderPlayForm(alwaysP2WinsGameStub)

        expect(getResultText()).not.toBe('Player 2 Wins!')
        play()
        expect(getResultText()).toBe('Player 2 Wins!')
    })

    it('should pass user inputs to RPS', function () {
        const gameSpy = jasmine.createSpyObj('game', ['play'])

        // setup
        renderPlayForm(gameSpy)

        let input;
        input = domFixture.querySelector('[name="p1_throw"]')
        input.value = 'rock'
        ReactTestUtils.Simulate.change(input)

        input = domFixture.querySelector('[name="p2_throw"]')
        input.value = 'sailboat'
        ReactTestUtils.Simulate.change(input)

        // action
        play()

        // assertion
        expect(gameSpy.play).toHaveBeenCalledWith('rock', 'sailboat', jasmine.any(Object))
    })
})
// Test code ends

// Production code begins

class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    tie() {
        this.setState({result: 'Tie!'})
    }

    invalid() {
        this.setState({result: 'Invalid!'})
    }

    p1_wins() {
        this.setState({result: 'Player 1 Wins!'})
    }

    p2_wins() {
        this.setState({result: 'Player 2 Wins!'})
    }

    onClickHandler() {
        this.props.game.play('foo', 'bar', this)
    }

    render() {
        return <div>
            <div className="result">{this.state.result}</div>
            <input name="p1_throw"/>
            <input name="p2_throw"/>
            <button onClick={this.onClickHandler.bind(this)}>Play!</button>
        </div>
    }
}