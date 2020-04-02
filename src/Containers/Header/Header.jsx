import React from 'react';
// import propTypes from 'prop-types';
import {APP_NAME,SEARCH_PLACEHOLDER} from '../../Utilities/Constants';
import {Grid ,Toolbar,AppBar} from '@material-ui/core';
import {TextBox,HeaderBox,StyledGrid} from './Header.css';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../../Components/SearchBar/SearchBar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import PersonIcon from '@material-ui/icons/Person';
import LoginButton from '../../Components/LoginModal/LoginModal';
import MenuList from '../../Components/Menu/Menu';


const data = [ { Component :  <LoginButton/> },{ Component :  <label>{'sakthi'}</label> } ];

export default class Header extends React.Component{

    render(){

        return (
        <HeaderBox>
            <AppBar position='sticky' color='primary'>
                <Toolbar>  
                        <Hidden only="xs">                                           
                            <Grid item xs={2} >
                                <TextBox>{APP_NAME}</TextBox>
                            </Grid> 
                        </Hidden>
                        <Hidden only={['sm','md','lg','xl']}>                            
                            <Grid item xs={11}>
                                 <TextBox>{APP_NAME}</TextBox>
                            </Grid>
                        </Hidden>                                                          
                        <Hidden only="xs">
                            <Grid item xs={8}>
                                <SearchBar width={300} placeholder={SEARCH_PLACEHOLDER} />                            
                            </Grid>
                            
                            <Grid item xs={2}>
                                <StyledGrid>                                
                                    <LoginButton name={'Login/SignUp'} />
                                    {/* <MenuList menu={data} Icon={<PersonIcon/>}/> */}
                                </StyledGrid>
                            </Grid>
                        </Hidden>
                        <Hidden only={['sm','md','lg','xl']}>                            
                            <Grid item xs={1}>
                                <StyledGrid>
                                    <MenuList menu={[data[0]]} Icon={<MoreVertIcon/>}/>                                    
                                </StyledGrid>                                
                            </Grid>
                        </Hidden>               
                </Toolbar>
            </AppBar>  
        </HeaderBox>           
        )
    }

}

// Header.propTypes = {
    
// }