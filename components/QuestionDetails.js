import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


const QuestionDetails = ({ data, ref, handleSubmit }) => {
  return (
    <View>
      <Text >{data}</Text>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Show {ref}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default QuestionDetails
