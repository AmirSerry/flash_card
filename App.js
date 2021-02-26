import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { View } from 'react-native'
import StackNavigator from './Nav/MainNavigator'
import { setNotification } from './utils/utils'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'


export default function App() {

  useEffect(() => {
    setNotification()
  });

  return (
    <Provider store={store}>
    <View style={{flex: 1}}>
    <StackNavigator/>
    </View>
  </Provider>
    
  );
}
const store = createStore(reducer, middleware)