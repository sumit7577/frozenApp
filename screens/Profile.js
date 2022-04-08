import React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components';
import { nowTheme } from '../constants';
import { homeLogo } from "../constants/Images";
import { connect } from 'react-redux';
import { updateUser } from '../store/user/actions';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const Profile = (props) => {
  let user = useSelector(state => state.user.user);
  const baseAddr = user.address.edges[0].node;
  const fullName = user.firstName + " " + user.lastName;
  const fullAddress = user.firstName + " (Default)" + "\n" + baseAddr.address1 + baseAddr.address2 + baseAddr.city + "\n" + baseAddr.country + "\n" + baseAddr.zip
  const { updateUser } = props;
  const clearUser = async () => {
    updateUser(null);
    await AsyncStorage.clear();
  }
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center", height: "100%", padding: 8 }} >
        <View style={{ marginTop: 20, height: 150, width: 150, borderRadius: 150 / 2, overflow: "hidden", zIndex: 5 }}>
          <Image source={homeLogo} alt="Profile image" style={{ height: 150, width: 150, borderRadius: 150 / 2, resizeMode: "contain" }} />
        </View>

        <View style={{ flex: 2, alignItems: "center", marginLeft: 20, marginRight: 20 }}>
          <Text style={{ fontSize: 22, marginTop: 8, fontFamily: nowTheme.FONTFAMILY.BOLD, textAlign: "center" }}>{fullName ? fullName : "Username Not exists!"}</Text>
          <Text style={styles.text}>{user.email ? user.email : "Email not exists!"}</Text>
          <Text style={styles.text}>{user.address ? fullAddress : "Address Not exists!"}</Text>
          <Text style={{ fontSize: 15, marginTop: 8, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{user.number ? user.number : "Phone Number Not exists!"}</Text>
        </View>

        <View style={{ flex: 4, alignItems: "center" }}>
          <Button full border style={styles.button} onPress={() => props.navigation.navigate("ManageAddress")}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
              size={12}
              color={nowTheme.COLORS.THEME}
            >
              MANAGE ADDRESSES
            </Text>
          </Button>

          <Button full border color={nowTheme.COLORS.WHITE} style={styles.button}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
              size={12}
              color={nowTheme.COLORS.THEME}
            >
              PREVIOUS ORDERS
            </Text>
          </Button>

          <Button full border style={{ backgroundColor: nowTheme.COLORS.THEME, marginLeft: 4 }} onPress={() => props.navigation.navigate("Homepage")}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
              size={12}
              color={nowTheme.COLORS.WHITE}
            >
              CLOSE
            </Text>
          </Button>

          <Button full color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.BLACK, marginLeft: 4, marginTop: "25%" }} onPress={clearUser}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
              size={12}
              color={nowTheme.COLORS.WHITE}
            >
              LOGOUT
            </Text>
          </Button>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14, marginTop: 8, fontFamily: nowTheme.FONTFAMILY.BOLD, textAlign: "center"
  },
  button:{
    backgroundColor: nowTheme.COLORS.WHITE, marginLeft: 4
  }
})

export default connect(() => ({}), { updateUser })(Profile);
