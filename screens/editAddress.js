import { Text, StyleSheet, Image, Dimensions, ScrollView,Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nowTheme } from "../constants";
import { useSelector } from 'react-redux';
import { Button } from '../components';
import { addressLogo } from '../constants/Images';
import { Input } from '../components';
import { Block } from 'galio-framework';
import Checkbox from 'expo-checkbox';
import { addressUpdate,defaultAddressUpdate } from '../network/products';
import Loader from '../components/Loader';

export default function EditAddress({ navigation, route }) {
    const { user } = useSelector(state => state);
    const base = user.user.address.edges[route.params.id].node;
    const fullAddress = base.address1;
    const [isChecked, setChecked] = useState(false);
    const [firstName, setFirstName] = useState(() => {
        return base.firstName;
    });
    const [response,setResponse] = useState(false);
    const [lastName, setLastName] = useState(() => {
        return base.lastName;
    })
    const [company, setCompany] = useState(() => {
        return base.company;
    })
    const [address, setAddress] = useState(() => {
        return fullAddress;
    })
    const [country, setCountry] = useState(() => {
        return base.country;
    })
    const [provision, setProvision] = useState(() => {
        return base.province;
    })
    const [city, setCity] = useState(() => {
        return base.city;
    })
    const [zip, setZip] = useState(() => {
        return base.zip;
    })

    const [phone,setPhone] = useState(()=>{
        return base.phone;
    })

    const updateAddress = async()=>{
        setResponse(true);
        if(isChecked === true){
            await defaultAddressUpdate(user.user.token,route.params.addressId);
        }
        if(firstName!= "" && lastName!="" && address!="" && country!="" && city!="" && zip!="" && phone!="" && provision!=""){
            const response = await addressUpdate(user.user.token,route.params.addressId,address,"",city,company,country,firstName,lastName,phone,provision,zip);
            if(response.data.data.customerAddressUpdate.customerUserErrors.length <1){
                setResponse(false);
                Alert.alert("Success","Address Successfully Updated")
            }else{
                setResponse(false);
                Alert.alert("Server Error",response.data.data.customerAddressUpdate.customerUserErrors[0].message)
            }
        }else{
            setResponse(false);
            Alert.alert("Form Error","Please Fill All Form Fields")
        }
        
        
    }
    return (
        <SafeAreaView>
            <Loader response={response} />
            <Block style={styles.container}>
                <Block style={{ alignItems: "center" }}>
                    <Image source={addressLogo} alt='Brand Image' style={{ height: 150, width: 150, resizeMode: "contain" }} />
                </Block>

                <Block flex row style={{ marginTop: 5, flex: 9 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Block style={styles.blocks}>
                            <Text style={styles.text}>FIRST NAME</Text>
                            <Input placeholder={base.firstName ?base.firstName :""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setFirstName(()=>{
                                    return text;
                                })
                            }} />
                        </Block>
                        <Block style={styles.blocks}>
                            <Text style={styles.text}>LAST NAME</Text>
                            <Input placeholder={base.lastName? base.lastName :""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setLastName(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>MOBILE NUMBER</Text>
                            <Input placeholder={base.phone ?base.phone : ""} keyboardType= "numeric" editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setPhone(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>COMPANY</Text>
                            <Input placeholder={base.company ? base.company : " "} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setCompany(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>ADDRESS</Text>
                            <Input placeholder={fullAddress ? fullAddress : ""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setAddress(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>COUNTRY</Text>
                            <Input placeholder={base.country ? base.country : ""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setCountry(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>PROVISION</Text>
                            <Input placeholder={base.province ? base.province : ""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setProvision(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>CITY</Text>
                            <Input placeholder={base.city ? base.city : ""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setCity(()=>{
                                    return text;
                                })
                            }} />
                        </Block>

                        <Block style={styles.blocks}>
                            <Text style={styles.text}>ZIP</Text>
                            <Input placeholder={base.zip ? base.zip : ""} editable={true} style={styles.inputs} onChangeText={(text)=>{
                                setZip(()=>{
                                    return text;
                                })
                            }} />
                        </Block>
                        <Block row style={{alignItems:"center",marginLeft:5}}>
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


                <Button full color={nowTheme.COLORS.WHITE} style={styles.buttons} onPress={updateAddress}>
                    <Text
                        style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, color: nowTheme.COLORS.WHITE }}
                        size={14}
                    >
                        SAVE
                    </Text>
                </Button>

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
    checkbox:{
        marginLeft:"12%"
    }
})