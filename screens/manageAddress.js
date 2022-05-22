import React,{useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import { StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { nowTheme } from '../constants';
import { Button } from '../components';
import { addressLogo, Icons } from '../constants/Images';
import { addressDelete, getUser } from '../network/products';
import { connect } from 'react-redux';
import { updateUser } from '../store/user/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';

function ManageAddress(props) {
    const { navigation, updateUser, user } = props;
    const [response, setResponse] = useState(false);
    const editAddress = (index, addressId) => {
        navigation.navigate("Setting", {
            screen: "EditAddress",
            params: {
                id: index,
                addressId: addressId
            }

        })
    }

    const deleteAddress = async (addressId) => {
        setResponse(true);
        const response = await addressDelete(addressId, user.user.token);
        if (response.data.data.customerAddressDelete.customerUserErrors.length < 1) {
            setResponse(false);
            getUser(user.user.token).then(resp => {
                let base = resp.data.data;
                updateUser({
                    id: base.customer.id, firstName: base.customer.firstName, lastName: base.customer.lastName, address: base.customer.addresses, number: base.customer.phone,
                    email: base.customer.email, token: user.user.token, defaultAddress: base.customer.defaultAddress
                    , localization: user.user.localization
                });
            }).catch(error => {
                setResponse(false);
                console.log(error);
            })
            Alert.alert("Success!", "Address Successfully Deleted")
        }
        else {
            setResponse(false);
            Alert.alert("Server Error", "Can`t Delete The Address Now")
        }
    }
    return (
        <SafeAreaView>
            <Loader response={response} />
            <Block row space="between" style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }}>
                    <Image source={Icons.back} tintColor={nowTheme.COLORS.THEME} style={{ height: 15, width: 17, marginTop: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16, }}>MANAGE ADDRESS</Text>
                <TouchableOpacity>
                    <MaterialIcons name="add" size={26} style={{ alignSelf: "center", color: nowTheme.COLORS.THEME }} onPress={() => {
                        navigation.navigate("Setting", {
                            screen: "AddAddress"
                        })
                    }
                    } />
                </TouchableOpacity>
            </Block>
            <Block style={styles.container}>
                <Block style={{ flex: 1.3, alignItems: "center" }}>
                    <Image source={addressLogo} alt="Brand Image" style={{ height: 150, width: 150, resizeMode: "contain" }} />
                </Block>
                <Block style={{ flex: 5, alignItems: "center", marginBottom: "30%" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {user.user.address.edges.map((value, index) => {
                            let Name = value.node.firstName;
                            let fullAddress = value.node.address1 + " " + value.node.address2 + " " + value.node.city + " " + value.node.country + " " + value.node.zip;
                            return (
                                <Block key={index} style={{ padding: 8, marginBottom: 10, marginLeft: -10 }}>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 14, marginTop: 8, marginLeft: 15 }}>{Name}</Text>
                                    <Text style={{ marginLeft: 15, fontSize: 14, maxWidth: 350, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{fullAddress}</Text>
                                    <Text style={{ marginLeft: 15, fontSize: 14, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>{value.node.phone ? value.node.phone : ""}</Text>
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