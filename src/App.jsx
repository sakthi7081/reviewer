import React from 'react';
// import Loader from './Components/Loader/Loader';
import MainPage from './Components/MainPage/MainPage';
import {GlobalStyle} from './App.css';
// import {APP_NAME } from  './Utilities/Constants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main :'#424242'
    }
  }
});

function App() {
  return (
    <>  
          <GlobalStyle />
          <ThemeProvider theme={theme}>
              <MainPage />   
          </ThemeProvider>              
    </>  
  );
}

export default App;
