import { Text,StyleSheet,Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block,Link } from 'galio-framework';
import { Button, Input } from '../components';
import { nowTheme } from '../constants';
import { updateUser } from '../store/user/actions';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('screen');
function CompleteRegistration(props) {
    const {updateUser} = props;
    const register = ()=>{
        updateUser({ firstName: 'test', lastName: 'test' });
    }
    return (
        <SafeAreaView>
            <Block style={styles.container}>
                <Block style={styles.headingBlock}>
                    <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: 'montserrat-regular' }}>REGISTER</Text>
                </Block>
                <Block style={{ marginTop: 10, }}>
                    <Input placeholder='Username' maxLength={50} style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55 }} />
                </Block>
                <Button full color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.THEME, marginLeft: 4 }} onPress={register}>
                    <Text
                        style={{ fontFamily: 'montserrat-bold' }}
                        size={14}
                        color={nowTheme.COLORS.WHITE}
                    >
                        SIGN UP
                    </Text>
                </Button>
                <Text style={{color:"black",fontFamily: 'montserrat-regular',marginLeft:4,marginTop:4}}>By signing up, you agree to Photo's Terms of Service and Privacy Policy.</Text>
            </Block>

        </SafeAreaView>
    )
};

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

export default connect(() => ({}), { updateUser })(CompleteRegistration);