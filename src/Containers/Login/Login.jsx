import React from 'react';
import {StyledPaper,StyledBox,StyledAvatar,StyledButton,StyledLink,LinkButton} from './Login.css';
import LockIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Types = ['Sign Up', 'Sign In'];

function Avatars({type}){
    return (
        <>
            <StyledBox>            
                    <StyledAvatar color='primary'>
                        <LockIcon color="inherit" />
                    </StyledAvatar>                                            
            </StyledBox> 
            <Typography variant="h5" gutterBottom>
                {type}
            </Typography>            
        </>
    )
}

const LoginTab =  ({type,changeType, close}) => {
    return (
        <>
            <Avatars type={type} />
            {type=== Types[0] && 
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username"
                name="user"                                               
                />
            }
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"                
                autoFocus                                
                />
            <TextField                                          
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"                
                />
            <StyledButton
                type="submit"                
                variant="contained"
                color="primary"                
                >
            {type}
          </StyledButton>
          <StyledButton                               
                margin
                variant="contained"
                color="secondary"
                onClick = {close}                
                >
            Cancel
          </StyledButton>
          <StyledLink>
                {type === Types[1] && 
                <LinkButton>
                    Forgot password?
                </LinkButton> 
                 }             
                <LinkButton float onClick={changeType}>
                    {type === Types[0] ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                </LinkButton>                     
          </StyledLink>
                
        </> 
    )
}

export default class Login extends React.Component{

        state = { 
            type : 1,
            name : '',
            password : ''
        }           
        
        changePage = () => {
            this.setState((state) => ({
                    type : state.type === 0 ? 1 : 0
            }));
        }

    render(){
            const {type} = this.state
        return(
            <StyledPaper elevation={12}>
                   <LoginTab type={Types[type]} close={this.props.close} changeType={this.changePage}/>         
            </StyledPaper>
        )
    }
}