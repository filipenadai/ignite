import React from 'react';
import { Home } from './src/pages/Home';
import { StatusBar } from 'react-native';

export function App() {
  return(
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
}