import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import {StyledBox,StyledSearchBox,StyledButton} from './HomePage.css';
import MovieCard from '../../Components/MovieCard/MovieCard';
import {SEARCH_PLACEHOLDER} from '../../Utilities/Constants';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../../Components/SearchBar/SearchBar';
import AddIcon from '@material-ui/icons/Add';
import WarningModal from '../../Components/WarningModal/WarningModal';

const Movies = [
     {
         id : 1,
         name : 'Bad Boys Returns',
         date : (new Date()).toLocaleDateString(),
         img : 'http://images.moviebuff.com/93a8e70b-707b-4c96-b56a-abdc71550d3f?w=500',
         language : 'English',
         description : 'After 25 years of being together, ‘bad boys’ Mike Lowrey and Marcus Burnett are at the crossroads of their exciting lives. Even as one of them wants out, events lead them to new adventures.'
     },
     {
        id : 2,
        name : 'Lucifier',
        date : (new Date()).toLocaleDateString(),
        img : '',
        language : 'Tamil',
        description : 'After 25 years of being together, ‘bad boys’ Mike Lowrey and Marcus Burnett are at the crossroads of their exciting lives. Even as one of them wants out, events lead them to new adventures.'
    },
    {
        id : 3,
        name : 'Uncle',
        date : (new Date()).toLocaleDateString(),
        img : 'http://images.moviebuff.com/ed96b9db-da5c-43d9-81fd-98b29a9c9adb?w=500',
        language : 'Malayalam',
        description : 'After 25 years of being together, ‘bad boys’ Mike Lowrey and Marcus Burnett are at the crossroads of their exciting lives. Even as one of them wants out, events lead them to new adventures.'
    },
    {
        id: 4,
        name : 'Aryaa',
        date : (new Date()).toLocaleDateString(),
        img : '',
        language : 'Telugu',
        description : 'After 25 years of being together, ‘bad boys’ Mike Lowrey and Marcus Burnett are at the crossroads of their exciting lives. Even as one of them wants out, events lead them to new adventures.'
    }
    
]

class HomePage extends Component {
            
            constructor(props) {
                super(props);
                this.state = { open : false }
            }
            
            changeWarningModel = () => {
                     this.setState((state) => ({
                         open : !state.open
                     }))
            }
            

    render() {
        const {open} = this.state;
        return (
            <StyledBox>
                <Hidden  only={['sm','md','lg','xl']}>                    
                    <StyledSearchBox>
                        <SearchBar width={300} placeholder={SEARCH_PLACEHOLDER} />                            
                    </StyledSearchBox>                                                                                                            
                </Hidden>
                <StyledButton
                    variant="contained"
                    color="primary"
                    size="small"                    
                    startIcon={<AddIcon />}
                    float ='right'
                    onClick = {this.changeWarningModel}
                >
                    Add Movie
                </StyledButton>
                <WarningModal type={open}  handleModal={this.changeWarningModel}/>
              <Grid container direction={'row'} spacing={2}>                
                    {
                         Movies.map(movie => 
                            <Grid item xs={12}  sm={4} md={3} lg={3} key={movie.id}>
                                 <MovieCard movie={movie}/> 
                            </Grid>
                    )}                                                   
             </Grid>
                
            </StyledBox>
        );
    }
}

export default HomePage;