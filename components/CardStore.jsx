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
    this.currid = 0
  }
  idfactory () {
    this.currid = this.currid + 1
    return this.currid
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
        c.keyid = this.idfactory()
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
    this.state.cards.pop()
    this.setState({
      cards: this.state.cards,
      discarded: {
        card: card,
        side: side
      }
    })
  }
}
