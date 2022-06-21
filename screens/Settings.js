import React from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import nowTheme from "../constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/user/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icons } from "../constants/Images";

export default function Settings(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const clearUser = async () => {
    dispatch(updateUser(null));
    await AsyncStorage.clear();
  }
  return (
    <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE, height: "100%" }}>
      <Block middle style={{ borderBottomWidth: 1, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
        <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4,fontSize:16 }}>SETTINGS</Text>
      </Block>
      <Block style={styles.container}>
        <Block style={styles.boxes} row middle>
          <Image source={Icons.profile} style={{ height: 30, width: 30 }} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Setting", {
              screen: "Profile"
            });
          }}>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>

        </Block>
        <Block style={styles.boxes} row middle>
          <Image source={Icons.address} style={{ height: 30, width: 30 }} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Setting", {
              screen: "ManageAddress"
            })
          }}>
            <Text style={styles.text}>Manage Addresses</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <Image source={Icons.contactUs} style={{ height: 30, width: 30 }} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Setting", {
              screen: "Contact"
            })
          }}>
            <Text style={styles.text}>Contact Us</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <Image source={Icons.condition} style={{ height: 30, width: 30 }} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Setting", {
              screen: "Condition"
            })
          }}>
            <Text style={styles.text}>Terms & Condition</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <Image source={Icons.privacy} style={{ height: 30, width: 30 }} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Setting", {
              screen: "Policy"
            })
          }}>
            <Text style={styles.text}>Privacy Policy</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <Image source={Icons.logout} style={{ height: 30, width: 30 }} />
          <TouchableOpacity onPress={clearUser}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>

        </Block>
      </Block>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  boxes: {
    justifyContent: "flex-start",
    margin: 8,
    borderBottomWidth: 1,
    borderColor: nowTheme.COLORS.MUTED,
    paddingBottom: 8,
  },
  text: {
    fontFamily: nowTheme.FONTFAMILY.BOLD2,
    fontSize: 16,
    paddingLeft: 12,
  },
  icons: {
    color: nowTheme.COLORS.THEME,
  }
});
