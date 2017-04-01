import React from 'react'
import Reflux from 'Reflux'
import CardActions from './CardActions.jsx'
import CardStore from './CardStore.jsx'
import DraggableCard from './DraggableCard.jsx'
import Card from './Card.jsx'
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
    this.store = CardStore
    this.onDiscard = props.onDiscard
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.discarded || this.state.cards.length < 1) {
      return true
    }
    return false
  }
  render () {
    if (this.state.discarded && this.onDiscard instanceof Function) {
      var card = this.state.discarded
      this.state.discarded = null
      this.onDiscard(card)
    }
    var cardsre = null
    if (!this.state.error && this.state.cards) {
      var idescard = this.state.cards.length > 0 ? this.state.cards[this.state.cards.length - 1].keyid : 0
      cardsre = this.state.cards.map((c, index, coll) => {
        var props = {
          cardId: c.id,
          index: index,
          image: c.image,
          rotate: c.rotate,
          cardData: c,
          extra: this.state.extraComponent,
          idiscard: idescard,
          keyid: c.keyid
        }
        if (idescard === c.keyid) {
          return (<DraggableCard {...props} />)
        } else {
          return (<Card {...props} />)
        }
      }, this)
    }

    if (!cardsre || cardsre.length < this.state.minCount) {
      CardActions.NeedCards(this.props.url, this.props.params)
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
