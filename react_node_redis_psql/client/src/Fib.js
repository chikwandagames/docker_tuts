import React, { Component } from 'react'
import axios from 'axios'

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  }

  componentDidMount() {
    this.fetchValues()
    this.fetchIndexs()
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current')
    this.setState({ values: values.data })
  }

  async fetchIndexs() {
    const seenIndexes = await axios.get('/api/values/all')
    this.setState({ seenIndexes: seenIndexes.data })
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({number}) => number ).join(', ')
  }

  // Data from redis
  renderValues() {
    const entries = []

    for (let i in this.state.values) {
      entries.push(
        <div key={i}>
          For index {i} I calculated {this.state.values[i]}
        </div>
      )
    }
    return entries
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('/api/values', {
      index: this.state.index
    })

    this.setState({ index: '' })
  }

  render() {
    return ( 
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="">Enter your index</label>
          <input type="text"
            value={this.state.index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button>Submit</button>

          <h3>Seen indexes:</h3>
          {this.renderSeenIndexes()}
          <h3>Calculated values:</h3>
          {this.renderValues}
        </form>
      </div> 
    )
  }
}
