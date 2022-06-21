import { StyleSheet,Text,Image } from 'react-native';
import React from 'react'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { Block } from 'galio-framework';
import { nowTheme } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '../constants/Images';

export default function TermCondition(props) {
  return (
    <>
      <Block row style={{ padding: 4, margin:8,marginTop:23,marginBottom:-25 }}>
        <TouchableOpacity onPress={() => {
          props.navigation.pop()
        }}>
          <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 10 }} />
        </TouchableOpacity>
      </Block>
      <WebView
        style={styles.container}
        source={{ uri: 'https://www.frozenstore.com/pages/terms-conditions-of-sale' }}
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