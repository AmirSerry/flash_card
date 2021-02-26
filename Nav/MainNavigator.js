import React from 'react'
import {createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from "react-navigation";
import Main from '../components/Main'
import AddNewCard from '../components/AddNewCard'
import Question from '../components/Question'
import Decks from '../components/Decks'
import AddNewDeck from '../components/AddNewDeck'


const Tab = createBottomTabNavigator({
  Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    AddNewDeck: {
      screen: AddNewDeck,
      navigationOptions: {
        tabBarLabel: 'Add New Deck'
      }
    },
  },{
    initialRouteName: 'Decks',
    backBehavior: 'Decks',
  })


const MainNavigator = createStackNavigator({
    Tab: {
      screen: Tab,
      navigationOptions: {
        title: 'Home',
        headerTintColor: 'black'
      }
    },
    Main: {
      screen: Main
    },
    AddNewCard: {
      screen: AddNewCard,
      navigationOptions: {
        title: 'Add New Card',
        headerTintColor: 'black'
      }
    },
    Question: {
      screen: Question,
      navigationOptions: {
        title: 'Question',
        headerTintColor: 'black'
      }
    }
  });
  
  const StackNavigator = createAppContainer(MainNavigator);

  export default StackNavigator;
  
