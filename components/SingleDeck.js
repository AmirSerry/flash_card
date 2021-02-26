import React from 'react'
import { View, Text } from 'react-native'

const SingleDeck = ({ title, num }) => {
  return (
    <View>
      <Text >{title}</Text>
      <Text>{num} cards</Text>
    </View>
  )
}



export default SingleDeck;