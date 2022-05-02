import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import React from 'react'
import { Block } from 'galio-framework'
import { Button } from '../components'
import Loader from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nowTheme } from '../constants';
import { Input } from '../components';
import { useState } from 'react';
import { resetPassword } from "../network/products";

export default function ForgetPassword() {
    const [text, setText] = useState(() => {
        return null;
    })
    const [respose, setResponse] = useState(() => {
        return false;
    })
    const onForget = () => {
        setResponse(() => {
            return true;
        })
        if (text === null) {
            Alert.alert("Email Error", "Please Enter your email address")
        }
        else {
            resetPassword(text).then(res => {
                setResponse(() => {
                    return false;
                })
                if (res.data.data.customerRecover.customerUserErrors.length > 0) {
                    Alert.alert("Email Error", res.data.data.customerRecover.customerUserErrors[0].message);

                }
                else {
                    Alert.alert("Success!", "Please See your email for password reset link");
                }
            }).catch(error => {
                Alert.alert("Server Error", "Something Error Happened!\nPlease try After Sometime");
                setResponse(() => {
                    return false;
                })
            })
        }
    }
    return (
        <SafeAreaView>
            <Loader response={respose} />
            <Block style={styles.container}>
                <Block style={styles.headingBlock}>
                    <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>Forgot password</Text>
                </Block>
                <Block style={{ marginTop: 10, }}>
                    <Input placeholder='Enter Email' maxLength={50} style={{ borderWidth: 1, borderColor: nowTheme.COLORS.THEME, height: 55 }} onChangeText={text => {
                        setText(() => {
                            return text;
                        })
                    }} />
                </Block>
                <Button full color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.THEME, marginLeft: 4 }} onPress={onForget}>
                    <Text
                        style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, color: nowTheme.COLORS.WHITE }}
                    >
                        FORGOT PASSWORD
                    </Text>
                </Button>
            </Block>

        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('screen');
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