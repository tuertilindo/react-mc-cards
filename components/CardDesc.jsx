import React from 'react'
const objectAssign = require('object-assign')
export default class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = objectAssign({}, props.cardData)
  }
  render () {
    return (
      <div>
        <h3>{this.state.text}</h3>
        <p>{this.state.title}</p>
      </div>
    )
  }
}
