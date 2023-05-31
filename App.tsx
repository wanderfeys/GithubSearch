import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SearchScreen from './src/screens/SearchScreen';
import store from './src/store/Store';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView, StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor="transparent" />
        <SearchScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
