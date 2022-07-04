import React from 'react';
import { StyleSheet, Dimensions, Alert, } from 'react-native';
import { Block, Text, Link } from 'galio-framework';
import { connect } from 'react-redux';
import { Button, Input } from '../components';
import { nowTheme } from '../constants';
import { updateUser } from '../store/user/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser, creatToken } from "../network/products";
import * as Localization from 'expo-localization';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      value: {},
      show: false,
      localize: Localization.locale,
      response: false
    }

  }
  render() {
    const { navigation } = this.props;
    const { updateUser } = this.props;
    const onLogin = () => {
      if (this.state.username === "" || this.state.password === "") {
        Alert.alert(
          "Invalid Login",
          "Pleas Enter Username and Password",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK" }
          ]
        );
      }

      else {
        this.setState({ response: true });
        creatToken(this.state.username, this.state.password).then(response => {
          this.setState({ value: response.data.data })
          if (this.state.value.customerAccessTokenCreate.customerAccessToken === null || !this.state.value.customerAccessTokenCreate.customerAccessToken) {
            this.setState({ response: false });
            Alert.alert(
              "Invalid Login",
              "Username or Password Incorrect",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { text: "OK" }
              ]
            );
          }
          else {
            getUser(this.state.value.customerAccessTokenCreate.customerAccessToken.accessToken).then(data => {
              if (data.data.data.customer === undefined) {
                this.setState({ response: false });
                Alert.alert(
                  "Server Error",
                  "Oops! Something Wrong",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK" }
                  ]
                );
              }
              else {
                this.setState({ response: false });
                const base = data.data.data;
                const setUser = async () => {
                  try {
                    await AsyncStorage.setItem("user", this.state.value.customerAccessTokenCreate.customerAccessToken.accessToken);
                  } catch (e) {
                    console.log(e);
                  }
                }
                setUser();
                updateUser({
                  id: base.customer.id, firstName: base.customer.firstName, lastName: base.customer.lastName, address: base.customer.addresses, number: base.customer.phone,
                  email: base.customer.email, token: this.state.value.customerAccessTokenCreate.customerAccessToken.accessToken, defaultAddress: base.customer.defaultAddress
                  , localization: this.state.localize,
                  tags: base.customer.tags
                });
              }
            }).catch(error => {
              console.log(error);
            })

          }
        }).catch(error => {
          console.log(error);
        })
      }

    }

    return (
      <SafeAreaView>
        <Loader response={this.state.response} />
        <Block style={styles.container}>
          <Block style={styles.headingBlock}>
            <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: nowTheme.FONTFAMILY.REGULAR2 }}>Log in</Text>
          </Block>
          <Block style={{ marginTop: 10, }}>
            <Input placeholder='Username' maxLength={50} style={{ borderWidth: 1, borderColor: nowTheme.COLORS.THEME, height: 55 }} onChangeText={text => {
              this.setState({ username: text })
            }} />
          </Block>
          <Block row style={{ borderWidth: 1, borderColor: nowTheme.COLORS.THEME, height: 55, backgroundColor: nowTheme.COLORS.WHITE, borderRadius: 8, alignItems: "center" }}>
            {this.state.show ? <Input maxLength={40} placeholder='Password' style={{ borderWidth: 0, width: width / 1.2 }} onChangeText={text => {
              this.setState({ password: text })
            }} /> :
              <Input secureTextEntry maxLength={40} placeholder='Password' style={{ borderWidth: 0, width: width / 1.2 }} onChangeText={text => {
                this.setState({ password: text })
              }} />}
            <TouchableOpacity onPress={() => {
              this.setState({ show: !this.state.show });
            }}>
              {this.state.show ? <Ionicons name="ios-eye-outline" size={22} /> : <Ionicons name="ios-eye-off-outline" size={22} />}
            </TouchableOpacity>
          </Block>
          <Button full color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.THEME, marginLeft: 4 }} onPress={onLogin}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
              size={14}
              color={nowTheme.COLORS.WHITE}
            >
              LOG IN
            </Text>
          </Button>
          <Block>
            <Link style={{ color: "black", textAlign: "right", marginRight: 5, fontSize: 16 }} onPress={() => navigation.navigate("ForgetPassword")}>Forgotten Password</Link>
          </Block>

        </Block>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: height / 14,
    marginLeft: 15,
    marginRight: 15,
  },
  headingBlock: {
    marginBottom: 10,
    marginLeft: 5,
  }
});

export default connect((state) => ({}), { updateUser })(Login);
