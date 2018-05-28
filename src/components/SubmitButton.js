import {Text, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'

export default class SubmitButton extends Component {
    render() {
        const {onPress, styles} = this.props
        return (
            <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
                <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
        )
    }
}