import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  if (!isFontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
  <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor="#5636D3" />
        <Routes />
      </AuthProvider>
  </ThemeProvider>
  );
}
