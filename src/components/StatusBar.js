import { Constants } from 'expo'
import {StyleSheet, Text, View, Platform} from 'react-native';
import React, { Component } from 'react'
import ReactNative from 'react-native'

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
