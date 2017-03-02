import Reflux from 'Reflux'
import CardActions from './CardActions.jsx'
import 'whatwg-fetch'
export default class CardStore extends Reflux.Store {
  constructor () {
    super()
    this.state = {
      status: 400,
      error: null,
      data: null,
      cards: [],
      barajando: false
    }
    this.listenables = CardActions
  }
  NeedCards (url, params) {
    if (this.state.barajando) {
      return false
    }
    this.state.barajando = true
    fetch(url, params)
    .then((response) => {
      this.status = response.status
      return response.json()
    }).then((data) => {
      this.state.barajando = false
      data.map((c) => {
        c.rotate = ((Math.random() * 10) - (Math.random() * 10))
      })
      var baraja = this.state.cards
      if (baraja) {
        baraja = data.concat(baraja)
      }
      this.setState({
        status: this.status,
        cards: baraja,
        error: this.status !== 200
      })
    }).catch((ex) => {
      this.state.barajando = false
      this.setState({
        status: 400,
        error: true
      })
    })
  }
  SlideLeft (card) {
    this.discard(card, 'left')
  }
  SlideRight (card) {
    this.discard(card, 'right')
  }
  SlideTop (card) {
    this.discard(card, 'top')
  }
  SlideBottom (card) {
    this.discard(card, 'bottom')
  }
  discard (card, side) {
    var cards = this.state.cards.filter((c) => {
      return c.id !== card.cardId
    })
    this.setState({
      cards: cards,
      discarded: {
        card: card,
        side: side
      }
    })
  }
}
