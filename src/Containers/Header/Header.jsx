import React from 'react';
// import propTypes from 'prop-types';
import {APP_NAME,SEARCH_PLACEHOLDER} from '../../Utilities/Constants';
import {Grid ,Toolbar,AppBar} from '@material-ui/core';
import {TextBox,HeaderBox,StyledGrid,StyledButton} from './Header.css';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../../Components/SearchBar/SearchBar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import LoginButton from '../../Components/LoginModal/LoginModal';
import MenuList from '../../Components/Menu/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import {logout} from '../../actions';

const mapStateToProps = (state) => {       
    return {
      logged : state.home.logged,
      user: state.home.user
    }
  };

const Users = ({user}) => {return <label>{user.username}</label> };

 const User = connect(mapStateToProps)(Users);

const logoutUser = ({logout}) => {return <StyledButton startIcon={<ExitToAppIcon />} onClick={logout}>Logout</StyledButton>}

const Logout = connect(mapStateToProps,{logout})(logoutUser);

const LoggedUsers = [ { Component :  <Logout /> },
               { Component :  <User /> } ];

const LoginUsers = [ { Component :  <LoginButton /> } ];               

class Header extends React.Component{

    render(){
            const {logged} = this.props;
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
                                    {!logged ? <LoginButton name={'Login/SignUp'} /> :
                                     <MenuList menu={LoggedUsers} Icon={<PersonIcon/>}/> }
                                </StyledGrid>
                            </Grid>
                        </Hidden>
                        <Hidden only={['sm','md','lg','xl']}>                            
                            <Grid item xs={1}>
                                <StyledGrid>                                    
                                    <MenuList menu={!logged ? LoginUsers : LoggedUsers} Icon={<MoreVertIcon/>}/>                                    
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



export default connect(mapStateToProps)(Header);