import {connect} from 'react-redux'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import React, {Component} from 'react'

import {addDeck} from '../actions'
import {orange, white} from '../utils/colors'
import {saveDeckTitle} from '../utils/api'
import SubmitButton from '../components/SubmitButton'

class AddDeck extends Component {

    state = {
        text: ''
    }

    submitName = () => {
        const {text} = this.state

        if (this.state.text) {
            saveDeckTitle(text)
            this
                .props
                .dispatch(addDeck(text))
            this
                .props
                .navigation
                .navigate('DeckView', {entryId: text})
            this.setState({text: ''})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the new decks name?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}></TextInput>

                <SubmitButton styles={styles} onPress={() => this.submitName()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 200,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 50,
        borderRadius: 8
    },
    title: {
        fontSize: 30,
        color: '#333',
        textAlign: 'center'
    },
    submitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        backgroundColor: orange,
        borderRadius: 7,
        overflow: 'hidden'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
});

export default connect()(AddDeck)