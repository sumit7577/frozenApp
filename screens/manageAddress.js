import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { nowTheme } from '../constants';
import { Button } from '../components';
import { addressLogo } from '../constants/Images';

export default function ManageAddress(props) {
    const { navigation } = props;
    const { user } = useSelector(state => state);
    const editAddress = (index,addressId) => {
        navigation.navigate("Favourites", {
            screen: "EditAddress",
            params: {
                id: index,
                addressId:addressId
            }

        })
    }
    return (
        <SafeAreaView>
            <Block style={styles.container}>
                <Block style={{ flex: 2, alignItems: "center" }}>
                    <Image source={addressLogo} alt="Brand Image" style={{ height: 150, width: 150, resizeMode: "contain" }} />
                    <Text style={{ fontSize: 18, fontFamily: nowTheme.FONTFAMILY.BOLD }}>MANAGE ADDRESSES</Text>
                </Block>
                <Block style={{ flex: 5, alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {user.user.address.edges.map((value, index) => {
                            let fullAddress = value.node.address1 + value.node.address2 + "\n" + value.node.city + "\n" + value.node.country + "\n" + value.node.zip;
                            return (
                                <Block key={index} style={{ padding: 8, marginTop: 20 }}>
                                    {index === 0 ?
                                        <Text style={styles.text}>DEFAULT</Text> :
                                        <Text style={styles.text}>OTHER ADDRESS</Text>}
                                    <Text style={{ marginLeft: 15, fontSize: 12, maxWidth: 200, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{fullAddress}</Text>
                                    <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{user.user.number ? user.user.number : ""}</Text>
                                    <Button full border style={{ backgroundColor: nowTheme.COLORS.WHITE }} onPress={() => {
                                        editAddress(index,value.node.id);
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
                    </ScrollView>
                </Block>

                <Button full border style={{ backgroundColor: nowTheme.COLORS.THEME }} onPress={() => navigation.pop()}>
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
    },
    text: {
        marginLeft: 15, fontSize: 14, fontFamily: nowTheme.FONTFAMILY.BOLD
    }
});