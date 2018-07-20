const React = require('react')

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
        this.props.game.playRound(
            this.state.p1_throw,
            this.state.p2_throw,
            this)
    }

    onInputHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            <div className="result">{this.state.result}</div>
            <input name="p1_throw" onChange={this.onInputHandler.bind(this)}/>
            <input name="p2_throw" onChange={this.onInputHandler.bind(this)}/>
            <button onClick={this.onClickHandler.bind(this)}>Play!</button>
        </div>
    }
}

module.exports = {PlayForm}