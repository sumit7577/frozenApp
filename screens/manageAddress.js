import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import { StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { nowTheme } from '../constants';
import { Button } from '../components';
import { addressLogo } from '../constants/Images';
import { addressDelete, getUser } from '../network/products';
import { connect } from 'react-redux';
import { updateUser } from '../store/user/actions';

function ManageAddress(props) {
    const { navigation, updateUser, user } = props;
    const editAddress = (index, addressId) => {
        navigation.navigate("Favourites", {
            screen: "EditAddress",
            params: {
                id: index,
                addressId: addressId
            }

        })
    }

    const deleteAddress = async (addressId) => {
        const response = await addressDelete(addressId, user.user.token);
        if (response.data.data.customerAddressDelete.customerUserErrors.length < 1) {
            getUser(user.user.token).then(resp => {
                let base = resp.data.data;
                updateUser({
                    id: base.customer.id, firstName: base.customer.firstName, lastName: base.customer.lastName, address: base.customer.addresses, number: base.customer.phone,
                    email: base.customer.email, token: user.user.token, defaultAddress: base.customer.defaultAddress
                    , localization: user.user.localization
                });
            }).catch(error => {
                console.log(error);
            })
            Alert.alert("Success!", "Address Successfully Deleted")
        }
        else {
            Alert.alert("Server Error", "Can`t Delete The Address Now")
        }
    }
    return (
        <SafeAreaView>
            <Block style={styles.container}>
                <Block style={{ flex: 1.3, alignItems: "center" }}>
                    <Image source={addressLogo} alt="Brand Image" style={{ height: 150, width: 150, resizeMode: "contain" }} />
                </Block>
                <Block style={{ flex: 5, alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {user.user.address.edges.map((value, index) => {
                            let Name = value.node.firstName;
                            let fullAddress = value.node.address1 + " " + value.node.address2 + " " + value.node.city + " " + value.node.country + " " + value.node.zip;
                            return (
                                <Block key={index} style={{ padding: 8, marginBottom: 10, marginLeft: -10 }}>
                                    {value.node.id === user.user.defaultAddress.id ?
                                        <Text style={styles.text}>DEFAULT</Text> :
                                        <Text style={styles.text}>OTHER ADDRESS</Text>}
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12, marginTop: 8, marginLeft: 15 }}>{Name}</Text>
                                    <Text style={{ marginLeft: 15, fontSize: 12, maxWidth: 350, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{fullAddress}</Text>
                                    <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{value.node.phone ? value.node.phone : ""}</Text>
                                    <Block row>
                                        <Button border style={{ backgroundColor: nowTheme.COLORS.WHITE, width: 80, height: 40 }} onPress={() => {
                                            editAddress(index, value.node.id);
                                        }}>
                                            <Text
                                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                                size={12}
                                                color={nowTheme.COLORS.THEME}
                                            >
                                                EDIT
                                            </Text>
                                        </Button>

                                        <Button style={{ backgroundColor: nowTheme.COLORS.THEME, width: 80, height: 40 }} onPress={() => {
                                            deleteAddress(value.node.id);
                                        }}>
                                            <Text
                                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                                size={12}
                                                color={nowTheme.COLORS.WHITE}
                                            >
                                                DELETE
                                            </Text>
                                        </Button>
                                    </Block>

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
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        marginLeft: 15, fontSize: 14, fontFamily: nowTheme.FONTFAMILY.BOLD
    }
});

export default connect(state => ({ user: state.user }), { updateUser })(ManageAddress);