import React from 'react'
import Reflux from 'Reflux'
import CardActions from './CardActions.jsx'
import Card from './Card.jsx'
import DraggableCard from './DraggableCard.jsx'
import CardDesc from './CardDesc.jsx'
const objectAssign = require('object-assign')
export default class Cards extends Reflux.Component {

  constructor (props) {
    super(props)
    this.state = objectAssign({
      error: false,
      cards: [],
      extraComponent: CardDesc,
      minCount: 5
    }, props)
    this.store = props.store
    this.onDiscard = props.onDiscard
  }
  render () {
    if (this.state.discarded && this.onDiscard instanceof Function) {
      this.onDiscard(this.state.discarded)
    }
    this.state.discarded = null
    var cardsre = null
    if (!this.state.error && this.state.cards) {
      cardsre = this.state.cards.map((c, index, coll) => {
        var props = {
          cardId: c.id,
          index: index,
          image: c.image
        }
        if (index === (coll.length - 1)) {
          return (<DraggableCard {...props}>
            {React.createElement(this.state.extraComponent, {cardData: c})}
          </DraggableCard>)
        } else {
          return (<Card {...props}>
            {React.createElement(this.state.extraComponent, {cardData: c})}
          </Card>)
        }
      }, this)
    }
    if (!cardsre || cardsre.length < this.state.minCount) {
      CardActions.NeedCards()
    }

    return (
      <div >
        <div id="cards">
          {cardsre}
        </div>
      </div>
    )
  }

}
