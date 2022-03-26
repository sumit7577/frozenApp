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

class AppHome extends React.Component {
    async componentDidMount() {
        const { updateUser } = this.props;
        const user = await AsyncStorage.getItem('user');
        if (user)
            updateUser(JSON.parse(user));
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <Loader />
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