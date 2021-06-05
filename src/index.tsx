import React from 'react';
import { RootNavigationContainer } from './navigation';
import { ThemeProvider } from './component/theme-provider';
import { AuthUserProvider } from '../src/provider/auth';
// import { ApolloClientProvider } from './graphql';
// import { ExamProvider } from './provider/exam-provider';

const App = () => {
  return (
    // <ApolloClientProvider>
      <AuthUserProvider>
        <ThemeProvider>
          <RootNavigationContainer />
        </ThemeProvider>
      </AuthUserProvider>
    // </ApolloClientProvider>
  );
};

export default App;
