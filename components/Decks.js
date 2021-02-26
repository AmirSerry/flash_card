import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity } from 'react-native'
import SingleDeck from './SingleDeck'
import { handleData, removeDecks } from '../actions'
import { connect } from 'react-redux'
import { removeDecksFromStorage } from '../utils/utils'



class Decks extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(handleData())
  }

  clear = () => {
    this.props.dispatch(removeDecks())
    removeDecksFromStorage()
    this.props.dispatch(handleData())
  }

  render () {

    const { decks, isInitial, navigation } = this.props

    return (
      <ScrollView>
        {decks && Object.keys(decks).map((key) => (
          <TouchableOpacity key={key} onPress={() => navigation.navigate(
            'Main',
            { title: key }
          )}>
            <SingleDeck
              title={decks[key].title}
              num={decks[key].questions ? decks[key].questions.length : 0}
            />
          </TouchableOpacity>
        ))}
        {!isInitial
          ? (
              <TouchableOpacity onPress={this.clear}>
                <Text>Clear</Text>
              </TouchableOpacity>
            )
          : null
        }
      </ScrollView>
    )
  }
}

function mapStateToProps ({ decks }) {
  return {
    decks,
    isInitial: decks && Object.keys(decks).length === 2,
  }
}

export default connect(mapStateToProps)(Decks)