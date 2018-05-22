import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
// import {saveDeckTitle} from '../utils/api'
// import {addDeck} from '../actions'

export default class AddDeck extends Component {

    state = {
        text: ''
    }

    // submitName = () => {
    //     const { text } = this.state

    //     saveDeckTitle(text)
    //     this.props.dispatch(addDeck(text))
    //     this.props.navigation.navigate('DeckView',{})
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>What is the new decks name?</Text>
                {/* <TextInput
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}></TextInput>
                <Button onPress={this.submitName} title='Submit'></Button> */}
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