import {applyMiddleware, createStore} from 'redux'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import {Provider} from 'react-redux'
import {StyleSheet, Text, View, Platform} from 'react-native';
import logger from 'redux-logger';
import React from 'react';

import {purple, white} from './src/utils/colors'
import AddCard from './src/components/AddCard'
import AddDeck from './src/components/AddDeck'
import DeckList from './src/components/DeckList'
import DeckView from './src/components/DeckView'
import reducer from './src/reducers'

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
  }
})


const store = createStore(reducer, applyMiddleware(logger))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
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
