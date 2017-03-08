import React from 'react'
import ReactDOM from 'react-dom'
const objectAssign = require('object-assign')
const classnames = require('classnames')
export default class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {initialPosition: {
      x: 0,
      y: 0,
      r: props.rotate

    },
    x: 0,
    y: 0,
    r: props.rotate}
  }
  setInitialPosition () {
    var screen = document.getElementById('cards'),
      card = ReactDOM.findDOMNode(this)
    var initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: 0,
      r: this.props.rotate

    }

    this.setState({
      initialPosition: initialPosition,
      x: initialPosition.x,
      y: initialPosition.y,
      r: initialPosition.r
    })
  }
  componentDidMount () {
    this.setInitialPosition()
    window.addEventListener('resize', this.setInitialPosition)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.setInitialPosition)
  }

  render () {
    var initialTranslate = ''.concat(
      'translate3d(',
      this.state.x + 'px,',
      this.state.y + 'px,',
      '0px) rotate(',
      this.state.r + 'deg)'

    )

    var styles = objectAssign({}, {
      msTransform: initialTranslate,
      WebkitTransform: initialTranslate,
      transform: initialTranslate,
      zIndex: this.props.index

    }, this.props.style)
    var imgstyle = {backgroundImage: 'url("' + this.props.image + '")'}
    var me = this
    var classes = classnames(objectAssign({}, {
      card: true,
      animate: this.state.animation
    }, me.props.classes))
    return (
      <div key={this.props.cardId.toString()} style={styles} className={classes}>
        <div style={imgstyle} className="img"></div>
        <this.props.extra {...this.props.cardData} />
      </div>
    )
  }

}
