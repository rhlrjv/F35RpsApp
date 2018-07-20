const ReactDOM = require('react-dom');
const React = require('react');

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

    it('should display invalid when RPS returns invalid', () => {
        const alwaysInvalidGameStub = {
            play: (t1, t2, roundObserver) => roundObserver.invalid()
        }
        renderPlayForm(alwaysInvalidGameStub)

        play()

        expect(domFixture.innerText).toContain('Invalid!')
    })
})


class PlayForm extends React.Component {
    render(){
        return <button>Play!</button>
    }
}