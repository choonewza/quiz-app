import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import React from 'react';

import { purple, white } from './src/utils/colors'
import AddDeck from './src/components/AddDeck'
import DeckList from './src/components/DeckList'
import DeckView from './src/components/DeckView'

import { Provider } from 'react-redux'
import reducer from './src/reducers'
import { createStore } from 'redux'

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={ 30 } color={ tintColor } />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={ 30 } color={ tintColor } />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,
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
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={ styles.container }>
          <MainNavigator/>
        </View>
      </Provider>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'ios' ? 0 : 25,
    flex: 1,
  },
});
