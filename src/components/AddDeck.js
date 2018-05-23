import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {connect} from 'react-redux'
import {addDeck} from '../actions'

class AddDeck extends Component {

    state = {
        text: ''
    }

    submitName = () => {
        const {text} = this.state

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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the new decks name?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}></TextInput>
                <Button style={styles.submitBtn} onPress={this.submitName} title='Submit'></Button>
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
        color: '#333'
    },
    submitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        borderRadius: 7,
        overflow: 'hidden'
    }
});

export default connect()(AddDeck)