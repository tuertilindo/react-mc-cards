import ReactDOM from 'react-dom'
import CardActions from './CardActions.jsx'
import Card from './Card.jsx'
import Hammer from 'hammerjs'
export default class DraggableCard extends Card {
  constructor (props) {
    super(props)
    this.panHandlers = {
      panstart: () => {
        if (this.props.idiscard !== this.props.keyid) {
          return
        }
        this.setState({
          animation: false,
          startPosition: {
            x: this.state.x,
            y: this.state.y,
            r: this.state.r
          }
        })
      },
      panend: (ev) => {
        var screen = document.getElementById('cards')
        var card = ReactDOM.findDOMNode(this)
        var xoff = screen.offsetWidth / 4
        var yoff = screen.offsetHeight / 4
        if (this.state.x < -xoff) {
          card.addEventListener('webkitTransitionEnd', () => { CardActions.SlideLeft(this.props) }, false)
          card.addEventListener('transitionend', () => { CardActions.SlideLeft(this.props) }, false)
          this.discard('left')
        } else if ((this.state.x + (card.offsetWidth - xoff)) > screen.offsetWidth) {
          card.addEventListener('webkitTransitionEnd', () => {
            this.resetPosition()
            CardActions.SlideRight(this.props)
          }, false)
          card.addEventListener('transitionend', () => {
            this.resetPosition()
            CardActions.SlideRight(this.props)
          }, false)
          this.discard('right')
        } else if ((this.state.y + (card.offsetHeight - yoff)) > screen.offsetHeight) {
          card.addEventListener('webkitTransitionEnd', () => { CardActions.SlideBottom(this.props) }, false)
          card.addEventListener('transitionend', () => { CardActions.SlideBottom(this.props) }, false)
          this.discard('bottom')
        } else if ((this.state.y + yoff) < 0) {
          card.addEventListener('webkitTransitionEnd', () => { CardActions.SlideTop(this.props) }, false)
          card.addEventListener('transitionend', () => { CardActions.SlideTop(this.props) }, false)
          this.discard('top')
        } else {
          this.resetPosition()
        }
      },
      panmove: (ev) => {
        if (this.props.idiscard !== this.props.keyid) {
          return
        }
        this.setState(this.calculatePosition(
          ev.deltaX, ev.deltaY
        ))
      },
      pancancel: (ev) => {
        console.log(ev.type)
      }
    }
  }
  resetPosition () {
    this.setState(
      {
        x: this.state.initialPosition.x,
        y: this.state.initialPosition.y,
        r: this.state.initialPosition.r,
        startPosition: this.state.initialPosition,
        animation: true
      }
    )
  }
  discard (side) {
    var x = this.state.x
    var y = this.state.y
    var r = this.state.r
    if (side === 'top') {
      y = y - 120
    } else if (side === 'right') {
      x = x + 120
      y = y + 120
      r = r + 32
    } else if (side === 'bottom') {
      y = y + 120
    } else if (side === 'left') {
      x = x - 120
      y = y + 120
      r = r - 32
    }
    var endPosi = {
      x: x,
      y: y,
      r: r
    }
    this.setState(
      {
        x: endPosi.x,
        y: endPosi.y,
        r: endPosi.r,
        startPosition: {
          x: this.state.x,
          y: this.state.y,
          r: this.state.r
        },
        animation: true
      }
    )
  }
  calculatePosition (deltaX, deltaY) {
    return {
      x: (this.state.initialPosition.x + deltaX),
      y: (this.state.initialPosition.y + deltaY),
      r: (0.05 * deltaX)
    }
  }
  handleSwipe (ev) {
    console.log(ev.type)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.idiscard === nextProps.keyid
  }
  componentDidMount () {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this))
    this.hammer.add(new Hammer.Pan({threshold: 0}))

    var events = [
      ['panstart panend pancancel panmove', (ev) => {
        ev.preventDefault()
        this.panHandlers[ev.type].call(this, ev)
        return false
      }],
      ['swipestart swipeend swipecancel swipemove',
      this.handleSwipe]
    ]

    events.forEach((data) => {
      if (data[0] && data[1]) {
        this.hammer.on(data[0], data[1])
      }
    }, this)
  }
  componentWillUnmount () {
    this.hammer.stop()
    this.hammer.destroy()
    this.hammer = null

    window.removeEventListener('resize', this.resetPosition)
  }
}
