import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import AppHome from './screens/index';
import store from './store/index';
import { StripeProvider } from '@stripe/stripe-react-native';



export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };
  
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <StripeProvider
          publishableKey="pk_test_51HpQavLo9p3SVh7eOClO69TFk12K8XQAoDWwjoww6tPw8hsSJommJMfe2hMxtQef9DRArVwu1wrdeWTcXNtyjkOE00n0IgeqT4"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com." // required for Apple Pay
        >
          <Provider store={store}>
            <AppHome store={store} />
          </Provider>
        </StripeProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    });

    this.setState({ fontLoaded: true });
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = async () => {
    if (this.state.fontLoaded) {
      await SplashScreen.hideAsync();
      this.setState({ isLoadingComplete: true });
    }
  };
}