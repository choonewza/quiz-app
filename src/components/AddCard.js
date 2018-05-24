import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'
import React, {Component} from 'react'

import {addCard} from '../actions'
import {addCardToDeck} from '../utils/api'
import {orange, white} from '../utils/colors'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
        correctAnswer: ''
    }
    submitCard = (deck) => {
        const {question, answer, correctAnswer} = this.state

        this
            .props
            .dispatch(addCard({question, answer, correctAnswer, deck}))
        addCardToDeck(deck, {question, answer, correctAnswer})
        this.setState({question: '', answer: '', correctAnswer: ''})
        this
            .props
            .navigation
            .dispatch(NavigationActions.back({key: null}))
    }
    render() {
        const deckName = this.props.navigation.state.params.entryId
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>
                    <Text style={styles.title}>What is the question?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(question) => this.setState({question})}
                        value={this.state.question}></TextInput>

                    <Text style={styles.title}>What is the answer?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(answer) => this.setState({answer})}
                        value={this.state.answer}></TextInput>

                    <Text style={styles.title}>Is this true or false?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(correctAnswer) => this.setState({correctAnswer})}
                        value={this.state.correctAnswer}></TextInput>

                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.submitCard(deckName)}>
                        <Text style={styles.submitBtnText}>Submit!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        color: '#333'
    },
    submitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        backgroundColor: orange,
        borderRadius: 7,
        overflow: 'hidden'
    },
    input: {
        width: 250,
        height: 40,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 20,
        borderRadius: 7
    }
});

export default connect()(AddCard)