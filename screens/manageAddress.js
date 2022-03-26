import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import { StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { nowTheme } from '../constants';
import { Button } from '../components';
import { addressLogo } from '../constants/Images';

export default function ManageAddress(props) {
    const { navigation } = props;
    const { user } = useSelector(state => state);
    const editAddress = (index)=>{
        console.log(index);
    }
    return (
        <SafeAreaView>
            <Block style={styles.container}>
                <Block style={{ flex: 2, alignItems: "center" }}>
                    <Image source={addressLogo} alt="Brand Image" style={{ height: 150, width: 150, resizeMode: "contain" }} />
                    <Text style={{ fontSize: 18, fontFamily: nowTheme.FONTFAMILY.BOLD }}>MANAGE ADDRESSES</Text>
                </Block>
                <Block style={{ flex: 5, alignItems: "center" }}>
                    {user.user.address.map((value, index) => {
                        return (
                            <Block key={index} style={{ padding: 8, marginTop: 20 }}>
                                {index === 0 ? 
                                <Text style={{ marginLeft: 15, fontSize: 14,fontFamily: nowTheme.FONTFAMILY.BOLD }}>DEFAULT</Text> : 
                                <Text style={{ marginLeft: 15, fontSize: 14,fontFamily: nowTheme.FONTFAMILY.BOLD }}>OTHER ADDRESS</Text>}
                                <Text style={{ marginLeft: 15, fontSize: 12, maxWidth: 200, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{value}</Text>
                                <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{user.user.number}</Text>
                                <Button full border color={nowTheme.COLORS.WHITE} style={{ backgroundColor: nowTheme.COLORS.WHITE }} onPress={()=>{
                                    editAddress(index);
                                }}>
                                    <Text
                                        style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                        size={12}
                                        color={nowTheme.COLORS.THEME}
                                    >
                                        EDIT
                                    </Text>
                                </Button>
                            </Block>
                        )
                    })}
                </Block>

                <Button full border color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.THEME }} onPress={() => navigation.navigate("Profile")}>
                    <Text
                        style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                        size={12}
                        color={nowTheme.COLORS.WHITE}
                    >
                        CLOSE
                    </Text>
                </Button>
            </Block>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    }
});