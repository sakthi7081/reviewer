import React from 'react';
import {StyledPaper,StyledInput} from './SearchBar.css';
import propTypes from 'prop-types'; 
import IconButton  from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


export default function SearchBar({width,placeholder}){
        return (
            <StyledPaper width={width} >                            
                <StyledInput width={width-50} placeholder={placeholder} />
                <IconButton size="small" type="submit">
                    <SearchIcon />
                </IconButton>                        
            </StyledPaper>
                
        )}

SearchBar.propTypes = {
        name : propTypes.string
}