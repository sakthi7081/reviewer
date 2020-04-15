import React  from 'react';
import Header from '../../Containers/Header/Header';
import HomePage from '../../Containers/HomePage/HomePage';
import {StyledBox} from '../../Containers/HomePage/HomePage.css';
import Movie from '../../Containers/Movie/Movie';
import { HashRouter as Router, Route,Switch } from 'react-router-dom';

function Mainpage(){
    return(
        <>        
            <Header />  
            <StyledBox >
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/:movie" component={Movie} />   
                    </Switch>            
                </Router>        
            </StyledBox>              
        </>
    )
}

  
  export default Mainpage;