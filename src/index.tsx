import React from 'react';
import { RootNavigationContainer } from './navigation';
import { ThemeProvider } from './component/theme-provider';
import { AuthUserProvider } from '../src/provider/auth';
import { Text } from 'react-native';
import { Box } from './component';
// import { ExamProvider } from './provider/exam-provider';

const App = () => {
  return (
    // <AuthUserProvider>
      <ThemeProvider>
        <RootNavigationContainer />
      </ThemeProvider>
    // </AuthUserProvider>
  );
};

export default App;
