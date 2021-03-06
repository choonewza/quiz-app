import {Text, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'

export default class ActionButton extends Component {
  render() {
    const {onPress, styles, text, color} = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
        styles.iosBtn, {
          backgroundColor: color
        }
      ]}>
        <Text style={styles.submitBtnText}>{text}</Text>
      </TouchableOpacity>
    )
  }
}