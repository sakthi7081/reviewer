import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import {StyledSearchBox,StyledButton,StyledAlert} from './HomePage.css';
import MovieCard,{MovieSkeleton} from '../../Components/MovieCard/MovieCard';
import {SEARCH_PLACEHOLDER} from '../../Utilities/Constants';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../../Components/SearchBar/SearchBar';
import AddIcon from '@material-ui/icons/Add';
import WarningModal from '../../Components/WarningModal/WarningModal';
import { connect } from "react-redux";
import AddMovie from '../AddMovie/AddMovie';

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
        const {movies,search,logged,loading} = this.props;
        return (
            <>
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
                {!logged && <WarningModal type={open}  handleModal={this.changeWarningModel}/>}
                {logged && <AddMovie open={open} close={this.changeWarningModel}/>}
              <Grid container direction={'row'} spacing={2}>                
                    {!loading &&
                         movies.filter(item =>
                            (item.name.toLowerCase()).includes(search.toLowerCase())
                          ).map(movie => 
                            <Grid key={movie._id} item xs={12}  sm={4} md={3} lg={3}>
                                 <MovieCard movie={movie}/> 
                            </Grid>
                    )}
                    {loading && [0,1,2,3].map(movie => 
                            <Grid key={movie} item xs={12}  sm={4} md={3} lg={3}>
                                 <MovieSkeleton/> 
                            </Grid>
                    )}
                    {!loading && movies.filter(item =>
                            (item.name.toLowerCase()).includes(search.toLowerCase())
                          ).length < 1 && <StyledAlert severity="info">No movies found</StyledAlert>}    
             </Grid>                        
            </>                                                                       
        );
    }
}

const mapStateToProps = (state) => {       
    return {
      movies : state.home.movies,
      logged : state.home.logged,
      loading : state.home.loading,
      search : state.home.search
    }
  };
  
  export default connect(mapStateToProps)(HomePage);