import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Block, Text, Link } from 'galio-framework';
import { connect } from 'react-redux';
import { Button, Input } from '../components';
import { nowTheme } from '../constants';
import { updateUser } from '../store/user/actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
      else {
        updateUser({ firstName: this.state.username, lastName: 'test', address: ["RAY TEST (DEFAULT) 55", "TEST ROAD BIRMINGHAM, ENG B12 5TR UNITED KINGDOM"], number: "+44790337333" });
      }


    }

    return (
      <SafeAreaView>
        <Block style={styles.container}>
          <Block style={styles.headingBlock}>
            <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>Log in</Text>
          </Block>
          <Block style={{ marginTop: 10, }}>
            <Input placeholder='Username' maxLength={50} style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55 }} onChangeText={text => {
              this.setState({ username: text })
            }} />
          </Block>
          <Block>
            <Input secureTextEntry maxLength={40} placeholder='Password' style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55 }} onChangeText={text => {
              this.setState({ password: text })
            }} />
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
          <Link style={{ color: "black", textAlign: "right", marginRight: 5 }} onPress={() => navigation.navigate("Register")}>Forgotten Password</Link>
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

export default connect(() => ({}), { updateUser })(Login);