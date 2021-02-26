import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addNewCard } from '../actions'
import { addNewDeckCard } from '../utils/utils'


class AddNewCard extends Component{

  state = {
    question: '',
    answer: '',
  }
  handleSubmit = () => {
    const { dispatch, navigation } = this.props
    const { question, answer } = this.state
    const { deckIndentify } = navigation.state.params
    const card = {
      question,
      answer
    }

    dispatch(addNewCard(card, deckIndentify))

    addNewDeckCard(card, deckIndentify)
    
    navigation.navigate('Main')
  }
  render () {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView>
        <View>
          <Text>Question</Text>
        </View>
        <View >
          <TextInput
            value={question}
            onChangeText={(question) => this.setState({ question: question})}
          />
        </View>
        <View >
          <Text>Answer</Text>
        </View>
        <View >
          <TextInput
            value={answer}
            onChangeText={(answer) => this.setState({ answer: answer})}
          />
        </View>
        {question === '' || answer === ''
          ? (
            <Text>Enter both Question and Answer</Text>
          )
          : (
            <TouchableOpacity onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
          )}
      </KeyboardAvoidingView>
    )
  }

}

function mapStateToProps ({ decks }, props) {
  const { deckIndentify } = props.navigation.state.params
  return {
    title: deckIndentify 
  }
}

export default connect(mapStateToProps)(AddNewCard)
