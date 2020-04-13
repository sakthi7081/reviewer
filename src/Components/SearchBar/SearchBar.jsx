import React from 'react';
import {StyledPaper,StyledInput} from './SearchBar.css';
import propTypes from 'prop-types'; 
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
import {SEARCH_MOVIE} from '../../Utilities/ActionTypes';
import {dispatchState} from '../../actions';
import InputAdornment from '@material-ui/core/InputAdornment';

function SearchBar({width,placeholder,dispatchState,search}){
        const handleChange = (event) => dispatchState(SEARCH_MOVIE,event.target.value);
        return (
            <StyledPaper width={width} >                            
                <StyledInput width={width-20} placeholder={placeholder}                 
                    startAdornment= 
                      {<InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>}                    
                value={search} onChange={handleChange}/>                
            </StyledPaper>
                
        )}

SearchBar.propTypes = {
        name : propTypes.string
}

const mapStateToProps = (state) => {       
    return {      
      search : state.home.search
    }
  };

export default connect(mapStateToProps,{dispatchState})(SearchBar);