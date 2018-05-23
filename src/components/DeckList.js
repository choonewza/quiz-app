import React, {Component} from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import {getData, getDecks} from '../utils/api'
import {connect} from 'react-redux'
import {recieveDecks} from '../actions'

class DeckList extends Component {

  componentDidMount() {
    getDecks().then(decks => {
      console.log('componentDidMount=>',decks)
      this
        .props
        .recieveAllDecks(decks)
    })
  }

  render() {
    // const {decks} = this.props
    const decks = getData()
    return (
      <View style={styles.container}>
        {Object
          .keys(decks)
          .map((deck) => {
            const {title, questions} = decks[deck]
            return (
              <View key={deck}>
                <Text>
                  {title}
                </Text>
                <Text>
                  {questions.length}
                </Text>
                <Button
                  onPress={() => this.props.navigation.navigate('DeckView', {entryId: deck})}
                  title="view deck"></Button>
              </View>
            )
          })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapDispatchToProps(dispatch) {
  return {
    recieveAllDecks: (decks) => dispatch(recieveDecks(decks))
  }
}

function mapStateToProps(decks) {
  console.log("DeckList-mapStateToProps()=>",decks)
  return decks
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)