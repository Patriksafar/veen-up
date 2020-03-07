import React from 'react';
import Container from '@material-ui/core/Container';
import {
  StoreProvider, ConnectFacebook, FacebookPageList,
} from './components';


export const App = () => (
  <StoreProvider>
    <Container className="App">
      <ConnectFacebook />
      <FacebookPageList />
    </Container>
  </StoreProvider>
);
