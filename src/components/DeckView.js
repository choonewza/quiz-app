import {connect} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'
import React, {Component} from 'react'

import {purple, white, red, orange} from '../utils/colors'
import {getData} from '../utils/api'
import ActionButton from './ActionButton'
import {getCardsLength} from '../utils/helpers'

class DeckView extends Component {
    render() {
        const deck = this.props.navigation.state.params.entryId
        const {decks} = this.props
        const questions = decks[deck].questions 
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.mainText}>
                        {decks[deck].title}
                    </Text>
                    <Text style={styles.subText}>
                        {questions ? getCardsLength(questions) : null}
                    </Text>

                    <ActionButton
                        styles={actionBtnStyle}
                        text={'Add Card'}
                        color={purple}
                        onPress={() => this.props.navigation.navigate('AddCard', {entryId: deck})}/>
                    <ActionButton
                        styles={actionBtnStyle}
                        text={'Start Quiz'}
                        color={red}
                        onPress={() => this.props.navigation.navigate('Quiz', {entryId: deck})}/>
                </View>
            </View>
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
        fontSize: 22,
        textAlign: 'center'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: orange,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    mainText: {
        color: white,
        fontSize: 40
    },
    subText: {
        color: white,
        fontSize: 30,
        marginBottom: 160
    }
});

function mapStateToProps({decks}) {
    return {decks}
}

export default connect(mapStateToProps)(DeckView)