import { Dimensions, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { nowTheme } from '../constants'
import { Block } from 'galio-framework'
import { addressLogo } from '../constants/Images'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icons } from '../constants/Images'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import Loader from '../components/Loader';


const { height, width } = Dimensions.get("screen")
export default function Contact(props) {
  const [response, setResponse] = useState(() => {
    return true;
  });
  /*const openUrl = async () => {
    const response = await Linking.canOpenURL(url);
    if (response) {
      await Linking.openURL(url);
    }
    else {
      Alert.alert("Device Error", "Cant Open the Url in your Device!")
    }
  }*/

  /*const openPhone = async () => {
    const response = await Linking.canOpenURL(url);
    if (response) {
      await Linking.openURL(`tel:01234 456 789`);
    }
    else {
      Alert.alert("Device Error", "Cant Open the Dialer in your Device!")
    }
  }*/
  return (
    <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE, height: "100%", width: "100%" }}>
      <Loader response={response} />
      <Block row style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
        <TouchableOpacity onPress={() => {
          props.navigation.pop()
        }}>
          <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 10 }} />
        </TouchableOpacity>
      </Block>
      <WebView
        style={styles.container}
        source={{ uri: 'https://www.frozenstore.com/pages/contact-us' }}
        onLoadEnd={() => {
          setResponse(() => {
            return false;
          })
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: nowTheme.FONTFAMILY.BOLD,
    fontSize: 12,
    padding: 4
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})