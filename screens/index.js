import React from 'react';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Screens from '../navigation/Screens';
import AuthNavigator from '../navigation/AuthNavigator';
import { nowTheme } from '../constants';
import { updateUser } from '../store/user/actions';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import { navigationRef } from '../navigation/RootNavigation';
import { getUser } from '../network/products';
import * as Localization from 'expo-localization';

class AppHome extends React.Component {
    constructor(){
        super();
        this.state={
            localize: Localization.locale,
            response:false,
        }
    }
    async componentDidMount() {
        this.setState({response:true})
        const { updateUser } = this.props;
        const user = await AsyncStorage.getItem('user');
        if (user !== null || user !== undefined)
            getUser(user).then(res => {
                if (res.data.data.customer != null) {
                    this.setState({response:false})
                    const base = res.data.data;
                    updateUser({
                        id: base.customer.id, firstName: base.customer.firstName, lastName: base.customer.lastName, address: base.customer.addresses, number: base.customer.phone,
                        email: base.customer.email, token: user, defaultAddress: base.customer.defaultAddress,localization: this.state.localize,tags:base.customer.tags
                    })
                }
                else{
                    this.setState({response:false})
                }
            }).catch(error => {
                this.setState({response:false})
                console.log(error);
            })
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <Loader response={this.state.response}/>
                <Notification />
                <NavigationContainer ref={navigationRef}>
                    <GalioProvider theme={nowTheme}>
                        <Block flex>
                            {user.isLoggedIn ? <Screens /> : <AuthNavigator />}
                        </Block>
                    </GalioProvider>
                </NavigationContainer>
            </>
        );
    }
}

export default connect(state => ({ user: state.user }), { updateUser })(AppHome);