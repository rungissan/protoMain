import React from 'react';

import { Platform, StatusBar, StyleSheet, View} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { colors } from './themes/base-theme';
import _ from 'lodash';
import Sentry from 'sentry-expo';



import store, { rehydrate } from './store';
import AppNavigator from './navigation/AppNavigator';
import env from '../config';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    // Remove this once Sentry is correctly setup.
    Sentry.enableInExpoDevelopment = true;
    Sentry.config(env.sentry.sentry_dns).install();
    console.disableYellowBox = true;
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          style={{ backgroundColor: ()=>{props => props.theme.modalBackground}}}
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading} />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <ThemeProvider theme={colors}>
            <Provider {...store}>
              <AppNavigator />
            </Provider>
          </ThemeProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    setTimeout(()=>{ }, 5000);

    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
      //  'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
      rehydrate(),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
