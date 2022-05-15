import { Dimensions, Image, Text, Linking, Alert, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { nowTheme } from '../constants'
import { Block } from 'galio-framework'
import { addressLogo } from '../constants/Images'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get("screen")
export default function Contact() {
  const url = "https://frozenbrothers.com/help";
  const openUrl = async () => {
    const response = await Linking.canOpenURL(url);
    if (response) {
      await Linking.openURL(url);
    }
    else {
      Alert.alert("Device Error", "Cant Open the Url in your Device!")
    }
  }

  const openPhone = async () => {
    const response = await Linking.canOpenURL(url);
    if (response) {
      await Linking.openURL(`tel:01234 456 789`);
    }
    else {
      Alert.alert("Device Error", "Cant Open the Dialer in your Device!")
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE, height: "100%", width: "100%" }}>
      <Block middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
        <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, padding: 4 }}>CUSTOMER SERVICE</Text>
      </Block>
      <Block center >
        <Image source={addressLogo} style={{ height: height / 4, width: width / 1.8, resizeMode: "contain" }} />
        <Block center style={{ marginTop: 20 }}>
          <Text style={styles.text}>For more information see</Text>
          <TouchableOpacity onPress={openUrl}>
            <Text style={{ color: "blue", fontFamily: nowTheme.FONTFAMILY.REGULAR , fontSize: 14 }}>{url}</Text>
          </TouchableOpacity>
        </Block>
        <Block center style={{ marginTop: 20 }}>
          <Text style={styles.text}>Customer Service</Text>
          <TouchableOpacity onPress={openPhone}>
            <Text style={{ color:"blue", fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 14 }}>01234 456 789</Text>
          </TouchableOpacity>

        </Block>
      </Block>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: nowTheme.FONTFAMILY.BOLD,
    fontSize: 12,
    padding: 4
  }
})