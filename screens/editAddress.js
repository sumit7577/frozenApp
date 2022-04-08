import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nowTheme } from "../constants";
import { useSelector } from 'react-redux';
import { Button } from '../components';
import { addressLogo } from '../constants/Images';
import { Input } from '../components';

export default function EditAddress({navigation,route}) {
    const { user } = useSelector(state => state);
    const base = user.user.address.edges[route.params.id].node;
    const fullAddress = base.address1;
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <Image source={addressLogo} alt='Brand Image' style={{ height: 150, width: 150, resizeMode: "contain" }} />
                    <Text style={{ fontSize: 18, fontFamily: nowTheme.FONTFAMILY.BOLD }}>EDIT ADDRESS</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <View style={styles.blocks}>
                        <Text style={styles.text}>FIRST NAME</Text>
                        <Input value={user.user.firstName} editable={true} style={styles.inputs} />
                    </View>
                    <View style={styles.blocks}>
                        <Text style={styles.text}>LAST NAME</Text>
                        <Input value={user.user.lastName} editable={true} style={styles.inputs} />
                    </View>
                    <View style={styles.blocks}>
                        <Text style={styles.text}>COMPANY</Text>
                        <Input value={base.company? base.company: " "} editable={true} style={styles.inputs} />
                    </View>

                    <View style={styles.blocks}>
                        <Text style={styles.text}>ADDRESS 1</Text>
                        <Input value={fullAddress ?fullAddress :""} editable={true} style={styles.inputs} />
                    </View>
                </View>

                <Button full color={nowTheme.COLORS.WHITE} style={styles.buttons} onPress={()=>navigation.navigate("Profile")}>
                    <Text
                        style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                        size={14}
                        color={nowTheme.COLORS.WHITE}
                    >
                        SAVE
                    </Text>
                </Button>

            </View>
        </SafeAreaView>
    )
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    text: {
        fontSize: 14,
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
        borderWidth: 2,
        borderColor: nowTheme.COLORS.THEME,
        height: 50,
        width: width / 1.5,
        marginRight: 5,
        fontFamily:nowTheme.FONTFAMILY.REGULAR,
    },
    buttons:{
        backgroundColor:nowTheme.COLORS.THEME,
        alignItems:"center",
        marginLeft:"5%",
        marginTop:height/5,

    }
})