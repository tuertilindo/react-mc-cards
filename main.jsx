import React from 'react'
import ReactDOM from 'react-dom'
import Cards from './components/cards.jsx'
var onDiscard = (side) => {
  console.log(side)
}
ReactDOM.render((
  <Cards
    onDiscard={onDiscard}
    url="http://mascocitas.com/mcapi/web/index.php/cards"
    params={{
      method: 'GET',
      mode: 'cors'
    }}
    />
),
document.getElementById('root')
)
