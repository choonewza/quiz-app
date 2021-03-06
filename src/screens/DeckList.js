import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React, { Component } from 'react'

import { getCardsLength } from '../utils/helpers'
import { getData, getDecks } from '../utils/api'
import { orange, white, blue } from '../utils/colors'
import { recieveDecks } from '../actions'
import ActionButton from '../components/ActionButton'

class DeckList extends Component {

    componentDidMount() {
        getDecks().then(decks => {
            // console.log('componentDidMount=>',decks)
            this
                .props
                .recieveAllDecks(decks)
        })
    }

    render() {
        const {decks} = this.props
        return (
            <ScrollView style={ styles.container }>
              { Object
                    .keys(decks)
                    .map((deck) => {
                        const {title, questions} = decks[deck]
                        return (
                            <View key={ deck } style={ styles.card }>
                              <Text style={ styles.cardText }>
                                { title }
                              </Text>
                              <Text style={ styles.cardText }>
                                { questions ? getCardsLength(questions) : null }
                              </Text>
                              <ActionButton styles={ actionBtnStyle } text={ 'View Deck' } color={ blue } onPress={ () => this.props.navigation.navigate('DeckView', {
                                                                                                                        entryId: deck
                                                                                                                    }) } />
                            </View>
                        )
                    }) }
            </ScrollView>
        )
    }
}

const actionBtnStyle = StyleSheet.create({
    iosBtn: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        width: 170
    },
    submitBtnText: {
        color: white,
        fontSize: 16,
        textAlign: 'center'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 5
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orange,
        margin: 8,
        height: 200,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    cardText: {
        color: white,
        fontSize: 30
    },
    cardBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapDispatchToProps(dispatch) {
    return {
        recieveAllDecks: (decks) => dispatch(recieveDecks(decks))
    }
}

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)