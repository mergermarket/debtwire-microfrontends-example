import React, { Component, Fragment } from 'react'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showBody: false
    }

    this.showBody = this.showBody.bind(this)
  }

  showBody () {
    this.setState({
      showBody: true
    })
  }

  render () {
    return <Fragment>
      <h1>Welcome to the intel page</h1>
      <p>Intel headline: {this.props.headline}</p>
      <button type='button' onClick={this.showBody}>Show intel body</button>
      {this.state.showBody &&
        <p>Intel body: {this.props.body}</p>
      }
    </Fragment>
  }
}

export default App
