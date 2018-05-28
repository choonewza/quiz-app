import {applyMiddleware, createStore} from 'redux'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import {Provider} from 'react-redux'
import {StyleSheet, Text, View, Platform} from 'react-native';
import logger from 'redux-logger';
import React from 'react';

import { setLocalNotification, clearLocalNotification } from './src/utils/helpers'
import {purple, white} from './src/utils/colors'
import AddCard from './src/screens/AddCard'
import AddDeck from './src/screens/AddDeck'
import DeckList from './src/screens/DeckList'
import DeckView from './src/screens/DeckView'
import Quiz from './src/screens/Quiz'
import reducer from './src/reducers'
import StatusBar from './src/components/StatusBar'

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck Info',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
})

const store = createStore(reducer, applyMiddleware(logger))

export default class App extends React.Component {

  componentDidMount(){
    console.log('---App.componentDidMount---')
    // clearLocalNotification();
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'ios' ? 0 : 25,
    flex: 1
  }
});
