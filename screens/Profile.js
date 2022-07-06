import React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'galio-framework';
import { Button } from '../components';
import { nowTheme } from '../constants';
import { connect } from 'react-redux';
import { updateUser } from '../store/user/actions';
import { useSelector } from 'react-redux';
import { Block } from 'galio-framework';
import { Icons } from '../constants/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const Profile = (props) => {
  let user = useSelector(state => state.user.user);
  const baseAddr = user?.defaultAddress;
  const fullName = user.firstName;
  const fullAddress = baseAddr.firstName + " (Default)" + "\n" + baseAddr?.address1 + baseAddr?.address2 + " " + baseAddr?.city + " " + baseAddr?.country + " " + baseAddr?.zip
  return (
    <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE }}>
      <Block row style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
        <TouchableOpacity onPress={() => {
          props.navigation.pop()
        }}>
          <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 10 }} />
        </TouchableOpacity>
        <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16, marginLeft: "40%" }}>Profile</Text>
      </Block>
      <View style={{ alignItems: "center", height: "100%", padding: 8 }} >
        <View style={{ marginTop: 20, height: 150, width: 150, borderRadius: 150 / 2, overflow: "hidden", zIndex: 5 }}>
          <Image source={Icons.profiePic} alt="Profile image" style={{ height: 150, width: 150, borderRadius: 150 / 2, resizeMode: "contain" }} />
        </View>

        <View style={{ flex: 2, alignItems: "center", marginLeft: 10, marginRight: 10 }}>
          <Text style={{ fontSize: 40, marginTop: 8, fontFamily: nowTheme.FONTFAMILY.BOLD2, textAlign: "center" }}>{fullName ? fullName : "Username Not exists!"}</Text>
          <Text style={styles.text}>{user.email ? user.email : "Email not exists!"}</Text>
          <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, textAlign: "center",fontSize:18}}>{user.address ? fullAddress : "Address Not exists!"}</Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{baseAddr.phone ? baseAddr.phone : "Phone Number Not exists!"}</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17, margin: 8, fontFamily: nowTheme.FONTFAMILY.BOLD, textAlign: "center"
  },
  button: {
    backgroundColor: nowTheme.COLORS.WHITE, marginLeft: 4
  }
})

export default connect(() => ({}), { updateUser })(Profile);
