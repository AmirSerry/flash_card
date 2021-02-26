import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../utils/utils'



class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Deck'),
    }
  }

  handleQuiz = () => {
    const { title, navigation } = this.props
    clearNotification()
      .then(setNotification)

    navigation.navigate(
      'Question',
      {deckIndentify: title}
    )
  }

  render() {
    const { title, questions, navigation } = this.props
    return (
      <View>
        <Text>{title}</Text>
        <Text >{questions.length} cards</Text>
        <TouchableOpacity  onPress={() => navigation.navigate(
          'AddNewCard',
          {deckIndentify: title}
        )}>
          <Text >Add New Card</Text>
        </TouchableOpacity>
        {questions.length > 0
          ? (
              <TouchableOpacity onPress={this.handleQuiz}>
                <Text>Start Quiz</Text>
              </TouchableOpacity>
          )
          : null
        }
      </View>
    )
  }
}

function mapStateToProps ({ decks }, { navigation }) {
  const { title } = navigation.state.params
  return {
    title,
    questions: decks[title].questions
  }
}

export default connect(mapStateToProps)(Main)
