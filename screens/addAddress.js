import { View, Text, Dimensions, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { addressLogo, Icons } from '../constants/Images';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Block } from 'galio-framework'
import { updateUser } from '../store/user/actions'
import { connect, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { nowTheme } from '../constants'
import * as Localization from 'expo-localization';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Input } from '../components';
import Checkbox from 'expo-checkbox';
import { Button } from '../components';
import { addressCreate,defaultAddressUpdate } from '../network/products';
import { getUser } from '../network/products';

function AddAddress(props) {
    const { navigation, updateUser, user } = props;
    const [locale, setLocale] = useState(() => {
        return Localization.locale;
    })
    const [isChecked, setChecked] = useState(false);
    const [firstName, setFirstName] = useState(() => {
        return "";
    });
    const [addressId,setAddressId] = useState(()=>{
        return null;
    })
    const [response, setResponse] = useState(false);
    const [lastName, setLastName] = useState(() => {
        return "";
    })
    const [company, setCompany] = useState(() => {
        return "";
    })
    const [address, setAddress] = useState(() => {
        return "";
    })
    const [country, setCountry] = useState(() => {
        return "";
    })
    const [provision, setProvision] = useState(() => {
        return "";
    })
    const [city, setCity] = useState(() => {
        return "";
    })
    const [zip, setZip] = useState(() => {
        return "";
    })

    const [phone, setPhone] = useState(() => {
        return "";
    })


    const AddAddress = async () => {
        setResponse(true);

        if (firstName != "" && lastName != "" && address != "" && country != "" && city != "" && zip != "" && phone != "" && provision != "") {
            const response = await addressCreate(user.user.token, address, "", city, company, country, firstName, lastName, phone, provision, zip);
            if (response.data.data.customerAddressCreate.customerUserErrors.length < 1) {
                setAddressId(()=>{
                    return response.data.data.customerAddressCreate.id;
                })
                getUser(user.user.token).then(res => {
                    const base = res.data.data;
                    updateUser({
                        id: base.customer.id, firstName: base.customer.firstName, lastName: base.customer.lastName, address: base.customer.addresses, number: base.customer.phone,
                        email: base.customer.email, token: user.user.token, defaultAddress: base.customer.defaultAddress
                        , localization: locale
                    });
                }).catch((error) => {
                    setResponse(false);
                    Alert.alert("Server Error", "Something Error Happened! Please Try Again Later")
                });
                setResponse(false);
                Alert.alert("Success", "Address Successfully Added")
            }
            else {
                setResponse(false);
                Alert.alert("Server Error", response.data.data.customerAddressCreate.customerUserErrors[0].message)
            }
            if (isChecked === true) {
                await defaultAddressUpdate(user.user.token,addressId);
                getUser(user.user.token).then(res => {
                    const base = res.data.data;
                    updateUser({
                        id: base.customer.id, firstName: base.customer.firstName, lastName: base.customer.lastName, address: base.customer.addresses, number: base.customer.phone,
                        email: base.customer.email, token: user.user.token, defaultAddress: base.customer.defaultAddress
                        , localization: locale
                    });
                }).catch((error) => {
                    Alert.alert("Server Error", "Something Error Happened! Please Try Again Later")
                });
            }

        }

        else {
            setResponse(false);
            Alert.alert("Form Error", "Please Fill All Form Fields")
        }
    }
    return (
        <SafeAreaView>
            <Block row style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <TouchableOpacity onPress={() => {
                    navigation.pop();
                }}>
                    <Image source={Icons.back} style={{ height: 15, width: 17, marginTop: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16, marginLeft: "25%" }}>ADD/EDIT ADDRESSES</Text>
            </Block>
            <Loader response={response} />
            <Block style={styles.container}>
                <Block style={{ alignItems: "center" }}>
                    <Image source={addressLogo} alt='Brand Image' style={{ height: 150, width: 150, resizeMode: "contain" }} />
                </Block>

                <Block flex row style={{ marginTop: 5, flex: 5 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Block style={styles.blocks}>
                            <Text style={styles.text}>FIRST NAME</Text>
                            <Input placeholder="Enter Name" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setFirstName(() => {
                                    return text;
                                })
                            }} />
                        </Block>
                        <Block style={styles.blocks}>
                            <Text style={styles.text}>LAST NAME</Text>
                            <Input placeholder="Enter Name" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setLastName(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>MOBILE NUMBER</Text>
                            <Input placeholder="Enter Mobile Number" keyboardType="numeric" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setPhone(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>COMPANY</Text>
                            <Input placeholder="Enter Company" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setCompany(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>ADDRESS</Text>
                            <Input placeholder="Enter Address" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setAddress(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>COUNTRY</Text>
                            <Input placeholder='Enter Country' editable={true} style={styles.inputs} onChangeText={(text) => {
                                setCountry(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>PROVISION</Text>
                            <Input placeholder='Enter Provision' editable={true} style={styles.inputs} onChangeText={(text) => {
                                setProvision(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>CITY</Text>
                            <Input placeholder="Enter City" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setCity(() => {
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>ZIP</Text>
                            <Input placeholder="Enter Zip" editable={true} style={styles.inputs} onChangeText={(text) => {
                                setZip(() => {
                                    return text;
                                })
                            }} />
                        </Block>
                        <Block row style={{ alignItems: "center", marginLeft: 5 }}>
                            <Text style={styles.text}>DEFAULT</Text>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? nowTheme.COLORS.THEME : undefined}
                            />
                        </Block>


                    </ScrollView>
                </Block>

                <Block style={{ flex: 2 }}>
                    <Button full color={nowTheme.COLORS.WHITE} style={styles.buttons} onPress={AddAddress}>
                        <Text
                            style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, color: nowTheme.COLORS.WHITE }}
                            size={14}
                        >
                            SAVE
                        </Text>
                    </Button>
                </Block>




            </Block>
        </SafeAreaView>
    )
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    text: {
        fontSize: 12,
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        marginLeft: 5,
    },
    blocks: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",

    },
    inputs: {
        borderWidth: 1,
        borderColor: nowTheme.COLORS.THEME,
        height: 50,
        width: width / 1.5,
        marginRight: 5,
        fontFamily: nowTheme.FONTFAMILY.REGULAR,
    },
    buttons: {
        backgroundColor: nowTheme.COLORS.THEME,
        alignItems: "center",
        marginLeft: "5%",
        marginTop: 8

    },
    checkbox: {
        marginLeft: "12%"
    }
})


export default connect(state => ({ user: state.user }), { updateUser })(AddAddress);