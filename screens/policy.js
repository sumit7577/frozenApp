import { StyleSheet,Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { Block } from 'galio-framework';
import { nowTheme } from '../constants';

export default function Policy() {
  return (
    <>
      <Block middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, marginTop: 30, marginBottom: -28 }}>
        <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD2, padding: 4, fontSize: 14 }}>Privacy Policy</Text>
      </Block>
      <WebView
        style={styles.container}
        source={{ uri: 'https://www.frozenbrothers.com/privacy-cookies-policy' }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})