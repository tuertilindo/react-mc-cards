import React from 'react'
const objectAssign = require('object-assign')
const classnames = require('classnames')
export default class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      x: props.x || 0,
      y: props.y || 0,
      r: props.rotate || 0
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return false
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
      <div id={this.props.keyid} key={this.props.keyid} style={styles} className={classes}>
        <div style={imgstyle} className="img"></div>
        <this.props.extra {...this.props.cardData} />
      </div>
    )
  }

}
