import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import {StyledBox,StyledSearchBox,StyledButton} from './HomePage.css';
import MovieCard from '../../Components/MovieCard/MovieCard';
import {SEARCH_PLACEHOLDER} from '../../Utilities/Constants';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../../Components/SearchBar/SearchBar';
import AddIcon from '@material-ui/icons/Add';
import WarningModal from '../../Components/WarningModal/WarningModal';
import { connect } from "react-redux";
import {getAllMovies} from '../../actions';

class HomePage extends Component {
            
            constructor(props) {
                super(props);
                this.state = { open : false }
            }
            
            componentDidMount(){                
                this.props.getAllMovies();
            }

            changeWarningModel = () => {
                     this.setState((state) => ({
                         open : !state.open
                     }))
            }
            

    render() {
        const {open} = this.state;
        const {movies,logged} = this.props;
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
                {!logged && <WarningModal type={open}  handleModal={this.changeWarningModel}/>}
                {logged && open && <label>Add Movie</label>}
              <Grid container direction={'row'} spacing={2}>                
                    {
                         movies.map(movie => 
                            <Grid key={movie._id} item xs={12}  sm={4} md={3} lg={3}>
                                 <MovieCard movie={movie}/> 
                            </Grid>
                    )}                                                   
             </Grid>
                
            </StyledBox>
        );
    }
}

const mapStateToProps = (state) => {       
    return {
      movies : state.home.movies,
      logged : state.home.logged
    }
  };
  
  export default connect(mapStateToProps,{getAllMovies})(HomePage);