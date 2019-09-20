import React, { Component, Fragment } from 'react'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasSearchResults: false
    }

    this.getSearchResults = this.getSearchResults.bind(this)
  }

  getSearchResults () {
    this.setState({
      hasSearchResults: true,
      results: 'microfrontends are cool'
    })
  }

  render () {
    return <Fragment>
      <h1>Welcome to the search page</h1>
      <button type='button' onClick={this.getSearchResults}>Search</button>
      {this.state.hasSearchResults &&
        <div>{this.state.results}</div>
      }
    </Fragment>
  }
}

export default App
