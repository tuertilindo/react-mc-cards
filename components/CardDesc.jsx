import React from 'react'
export default class Card extends React.Component {
  render () {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.title}</p>
      </div>
    )
  }
}
