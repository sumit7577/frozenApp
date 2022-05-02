import { StyleSheet } from 'react-native';
import React from 'react'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function Condition() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.frozenbrothers.com/terms-of-use' }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})