import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

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