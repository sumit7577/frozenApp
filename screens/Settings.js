import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import nowTheme from "../constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { updateUser } from "../store/user/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, padding: 4 }}>SETTINGS</Text>
      </Block>
      <Block style={styles.container}>
        <Block style={styles.boxes} row middle>
          <MaterialCommunityIcons style={styles.icons} size={35} name="account-circle-outline" />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Favourites", {
              screen: "Profile"
            });
          }}>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>

        </Block>
        <Block style={styles.boxes} row middle>
          <FontAwesome style={styles.icons} size={30} name="address-book-o" />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Favourites", {
              screen: "ManageAddress"
            })
          }}>
            <Text style={styles.text}>Manage Addresses</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <MaterialCommunityIcons style={styles.icons} size={35} name="account-circle-outline" />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Favourites", {
              screen: "Contact"
            })
          }}>
            <Text style={styles.text}>Contact Us</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <MaterialCommunityIcons style={styles.icons} size={35} name="account-circle-outline" />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Favourites", {
              screen: "Condition"
            })
          }}>
            <Text style={styles.text}>Terms & Condition</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <MaterialCommunityIcons style={styles.icons} size={35} name="account-circle-outline" />
          <TouchableOpacity onPress={() => {
            navigation.navigate("Favourites", {
              screen: "Policy"
            })
          }}>
            <Text style={styles.text}>Privacy Policy</Text>
          </TouchableOpacity>

        </Block>

        <Block style={styles.boxes} row middle>
          <MaterialCommunityIcons style={styles.icons} size={35} name="logout" />
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
    fontFamily: nowTheme.FONTFAMILY.REGULAR,
    fontSize: 16,
    paddingLeft: 12,
  },
  icons: {
    color: nowTheme.COLORS.THEME,
  }
});
