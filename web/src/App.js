const React = require('react')
const ReactDOM = require('react-dom')
const {RPS} = require('rps')
const {PlayForm} = require('./PlayForm')

const rps = new RPS()

class App extends React.Component {
    render() {
        return <div>
            <PlayForm game={rps}/>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
)