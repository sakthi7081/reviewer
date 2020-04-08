import React  from 'react';
import Header from '../../Containers/Header/Header';
import HomePage from '../../Containers/HomePage/HomePage';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

function Mainpage({load}){
    return(
        <>        
        <Header />        
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>            
        </Router>        
        </>
    )
}

  
  export default Mainpage;