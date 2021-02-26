import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveDeck } from '../utils/utils'
import { addNewDeck } from '../actions'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'


class AddNewDeck extends Component {
  state = {
    title: '',
    showValidation: false,
  }
  submit = () => {
    const { title } = this.state
    const deck = {
      title: title,
      questions: [],
    }

    if (title !== '') {
      this.props.dispatch(addNewDeck(deck))
      saveDeck(title)
      this.setState({
        title: ''
      })
      this.props.navigation.navigate('Main', {title: title})
    } else {
      this.setState({
        showValidation: true
      })
    }
  }
  handleChange = (title) => {
    this.setState({
      title,
      showValidation: false,
    })
  }
  render () {
    const { title, showValidation } = this.state

    return (
      <KeyboardAvoidingView>
        <Text>Enter the title </Text>
        <View> 
          <TextInput
            value={title}
            placeholder="Enter title "
            onChangeText={this.handleChange}
          />
        </View>
        {showValidation
          ? <Text >Please Enter Title</Text>
          : null
        }
        <TouchableOpacity  onPress={this.submit}>
          <Text>New Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddNewDeck)