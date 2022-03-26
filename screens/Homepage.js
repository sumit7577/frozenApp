import { Button } from '../components';
import { nowTheme } from '../constants';
import React from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeLogo } from '../constants/Images';


class Homepage extends React.Component {
    constructor(){
        super();
        this.navigateLogin = ()=>this.props.navigation.navigate("Login");
        this.navigateRegister = ()=>this.props.navigation.navigate("Register");
    }
    render() {
        return (
            <SafeAreaView>
                <View style={{ flexDirection: "column" }}>
                    <View style={styles.imageBlock}>
                        <Image style={{ width:"90%",resizeMode: 'contain'}}source={homeLogo} alt="brand image" />
                    </View>
                    <View style={styles.butttonBlock}>
                        <Button big color="white" style={{ borderColor: nowTheme.COLORS.THEME, borderWidth: 2 }} onPress={this.navigateLogin}>
                            <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={20}
                                color={nowTheme.COLORS.THEME}
                            >
                                LOG IN
                            </Text>
                        </Button>
                        <Button color="theme" big onPress={this.navigateRegister}>
                            <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                            >
                                REGISTER
                            </Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}


const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    imageBlock: {
        height: height / 1.17,
        width:width/1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    butttonBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }

});

export default Homepage;