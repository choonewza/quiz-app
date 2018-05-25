import React, { Component } from 'react'
import {StyleSheet, Text, View, Platform} from 'react-native';
import ReactNative from 'react-native'
import { Constants } from 'expo'

export default class StatusBar extends Component {
  render() {
      const {backgroundColor} = this.props
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
          <ReactNative.StatusBar translucent backgroundColor={backgroundColor} {...this.props} />
      </View>
    )
  }
}
