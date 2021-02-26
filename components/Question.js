import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import QuestionDetails from './QuestionDetails'


class Question extends Component {
  state = {
    isQuestion: true,
    isLast: false,
    index: 0,
    result: 0,
  }

  handleSubmit = () => {
    this.setState((preState) => ({
      isQuestion: !preState.isQuestion
    }))
  }

  handleSelect = (isRight) => {
    const { index } = this.state
    const { questions } = this.props.deck
    if ( index + 1 === questions.length ) {
      this.setState((preState) => ({
        isLast: true,
        result: isRight ? preState.result + 1 : preState.result,
      }))
    } else {
      this.setState((preState) => ({
        isQuestion: true,
        index: preState.index + 1,
        result: isRight ? preState.result + 1 : preState.result,
      }))
    }
  }

  handleReset = () => {
    this.setState({
      isQuestion: true,
      isLast: false,
      index: 0,
      result: 0,
    })
  }

  render () {
    const { isQuestion, isLast, index, result } = this.state
    const { deck, navigation } = this.props
    const { questions } = deck
    return (
      <View>
        {!isLast
          ? (
              <View>
                <View>
                  <Text>{`${index + 1} / ${questions.length}`}</Text>
                </View>
                {isQuestion
                  ? <QuestionDetails data={questions[index].question} ref={'Answer'} handleSubmit={this.handleSubmit} />
                  : <QuestionDetails data={questions[index].answer} ref={'Question'} handleSubmit={this.handleSubmit} />
                }
                <View>
                  <TouchableOpacity  onPress={() => this.handleSelect(true)}>
                    <Text>Right</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.handleSelect(false)}>
                    <Text>Wrong</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          : (
              <View>
                <Text >{(result / questions.length * 100).toFixed(0)} %</Text>
                <Text>Right</Text>
                <TouchableOpacity onPress={this.handleReset}>
                  <Text>Restart</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Main') }>
                  <Text>Back</Text>
                </TouchableOpacity>
              </View>
            )
        }
      </View>
    )
  }
}

function mapStateToProps ({ decks }, props) {
  const { deckIndentify } = props.navigation.state.params
  return {
    deck: decks[deckIndentify]
  }
}

export default connect(mapStateToProps)(Question)