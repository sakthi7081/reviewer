import React from 'react';
import MainPage from './Components/MainPage/MainPage';
import {GlobalStyle} from './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import initializeStore from './initializeStore';

const theme = createMuiTheme({
  palette: {
    primary: {
      main :'#424242'
    }
  }
});

const store = initializeStore();

function App() {
  return (
    <>
     <Provider store={store}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
              <MainPage />   
          </ThemeProvider>              
     </Provider>
    </>  
  );
}

export default App;
