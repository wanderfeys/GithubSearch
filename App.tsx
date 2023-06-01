import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import SearchScreen from './src/screens/SearchScreen';
import store from './src/store/Store';
import {colors} from './src/utils/Colors';
import {Provider as ReduxProvider} from 'react-redux';
import {StyledSafeAreaView} from './src/components/StyledComponents';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <StyledSafeAreaView>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          <SearchScreen />
        </StyledSafeAreaView>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;
