import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import { Button, Input } from '../components';
import { nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

class Register extends React.Component {
    render() {
        const completeRegistration = () => navigation.navigate("Registration");
        const { navigation } = this.props;
        return (
            <SafeAreaView>
                <Block style={styles.container}>
                    <Block style={styles.headingBlock}>
                        <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>REGISTER</Text>
                    </Block>
                    <Block style={{ marginTop: 10, }}>
                        <Input placeholder='Email' maxLength={50} style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55 }} />
                    </Block>
                    <Block>
                        <Input secureTextEntry maxLength={40} placeholder='Password' style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55 }} />
                    </Block>
                    <Button full color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.THEME, marginLeft: 4 }} onPress={completeRegistration}>
                        <Text
                            style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                        >
                            NEXT
                        </Text>
                    </Button>
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

export default Register;
