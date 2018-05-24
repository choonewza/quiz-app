import React, {Component} from 'react'
import {Text, TouchableOpacity} from 'react-native'

export default class SubmitButton extends Component {
    render() {
        const {onPress, style, text, color} = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <Text style={style}>{text}</Text>
            </TouchableOpacity>
        )
    }
}