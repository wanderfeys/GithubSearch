import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StatusBar, SafeAreaView, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import SearchScreen from './src/screens/SearchScreen';
import store from './src/store/Store';
import {colors} from './src/utils/Colors';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const renderContent = () => {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <SearchScreen />
      </SafeAreaProvider>
    );
  };

  return (
    <Provider store={store}>
      {Platform.OS === 'ios' ? (
        <SafeAreaView>{renderContent()}</SafeAreaView>
      ) : (
        <>{renderContent()}</>
      )}
    </Provider>
  );
};

export default App;
