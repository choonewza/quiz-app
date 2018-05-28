import {View, Text, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'

export default class Info extends Component {
    render() {
        const {onPress, style} = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <Text style={style}>{this.props.children}</Text>
            </TouchableOpacity>
        )
    }
}