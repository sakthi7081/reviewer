import React from 'react';
import {StyledPaper,StyledBox,StyledAvatar,StyledButton,StyledLink,LinkButton,WarningLabel} from './Login.css';
import LockIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {signIn,validateMail,sigUp,passwordReset} from '../../actions';
import md5 from 'md5';
import { connect } from "react-redux"; 

const Types = ['Sign Up', 'Sign In', 'Reset'];

const Fields = [ {label : 'Username', name : 'user', type : 'text'},
                 {label : 'Email Address', name : 'email', type : 'text'},
                 {label : 'Password', name : 'password', type : 'password'},
                 {label : 'Confirm Password', name : 'confirmPassword', type : 'password'}, ];

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

const LoginTab =  ({type,fields,changeType, close,data,error,valueChange,submit,errorlabel}) => {
    return (
        <>
            <Avatars type={type} />
            {errorlabel && <WarningLabel>{errorlabel}</WarningLabel>}
            {fields.map(values => 
                <TextField
                key={values.name}
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                id={values.name}
                label={values.label}
                name={values.name}      
                value={data[values.name]}
                error={error[values.name] === '' ? false : true}
                helperText={error[values.name]}   
                type={values.type}         
                onChange={valueChange}                             
                />
            )}                         
            <StyledButton
                type="submit"                
                variant="contained"
                color="primary"   
                onClick={submit}             
                >
            {type}
          </StyledButton>
          <StyledButton                               
                margin={1}
                variant="contained"
                color="secondary"
                onClick = {close}                
                >
            Cancel
          </StyledButton>
          <StyledLink>
                {type === Types[1] && 
                <LinkButton
                onClick={() => changeType(2)}>
                    Forgot password?
                </LinkButton> 
                 }             
                <LinkButton float onClick={() => changeType(type === Types[0] ? 1 : 0)}>
                    {type === Types[0] && "Already have an account? Sign in"}
                    {type !== Types[0] && "Don't have an account? Sign Up"}
                </LinkButton>                     
          </StyledLink>                
        </> 
    )
}

class Login extends React.Component{

        state = { 
            type : 1,
            data : (Fields.slice(1, 3)).reduce(
                (obj, item) => ({
                  ...obj,
                  [item.name]: ''
                }),
                {}
              ),
            error : (Fields.slice(1, 3)).reduce(
                (obj, item) => ({
                  ...obj,
                  [item.name]: ''
                }),
                {}
              ),
            fields : Fields.slice(1, 3),
            warning : ''
        }           
        
        changePage = (value) => {
            let fields = [];
            if(value === 0){
                fields = Fields.slice(0, 3);
            } 
            else if(value === 1){
                fields = Fields.slice(1, 3);
            }
            else if(value === 2){
                fields = Fields.slice(1, 4);
            }                  
            this.setState({
                    type : value,
                    data : fields.reduce(
                        (obj, item) => ({
                          ...obj,
                          [item.name]: ''
                        }),
                        {}
                      ),
                    error : fields.reduce(
                        (obj, item) => ({
                          ...obj,
                          [item.name]: ''
                        }),
                        {}
                      ),      
                    fields : fields,
                    warning : ''           
            });
        }

        checkProperties(obj) {
            for (var key in obj) {
                if (obj[key] !== null && obj[key] !== "")
                    return false;
            }
            return true;
        }

        validateForm =async(data)=>{
            const errors = this.state.error;
            const {fields,type} = this.state;
            const requiredFields = fields.map(t=>t.name);
            requiredFields.forEach(field => {
                if (!data[ field ]) {
                errors[ field ] = 'Required'
                }                
            })
            if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address'
            }            
            if (type === 0 && data.email && errors.email ==='') {                
                let result = await validateMail(data.email);                
                if(result){
                    errors.email = 'Email Already Exists'
                }                
            }
            if (type === 2 && data.email && errors.email ==='') {                
                let result = await validateMail(data.email);                
                if(!result){
                    errors.email = 'Email not Exists'
                }                
            }
            if (type === 2 && errors.password ==='' && errors.confirmPassword ==='' && (data.password !== data.confirmPassword)) {                                             
                    errors.confirmPassword = 'Password mismatch'                
            }
            return errors;
        }

        handleChange = e =>{
            const {error} = this.state;
            this.setState({
                data: { ...this.state.data, [e.target.name]: e.target.value },
                warning :''
            });
            if(error[e.target.name]){
                error[e.target.name] = '';
                this.setState({
                    error
                });
            }
        }
            

        submit =async(e)=>{
            e.preventDefault();
                let error = await this.validateForm(this.state.data);                                       
                if(!this.checkProperties(error)){
                    this.setState({error});
                }
                else{
                    const {data} = this.state;
                    if(this.state.type===1){
                        let result = await this.props.signIn(data.email.toLowerCase(),md5(data.password));                        
                        if(!result){
                            this.props.close(true);
                        }
                        else{
                            this.setState({warning : result});
                        }
                    }
                    if(this.state.type===0){
                        const user = {
                            username : data.user.toLowerCase(),
                            email : data.email,
                            password : md5(data.password)
                        }; 
                        let result = await this.props.sigUp(user);                        
                        if(!result){
                            this.props.close(true);
                        }
                        else{
                            this.setState({warning : result});
                        }
                    }
                    if(this.state.type===2){
                        let result = await passwordReset(data.email.toLowerCase(),md5(data.password));                                                
                        this.changePage(2);
                        this.setState({warning : result});                        
                    }                    
                }
        }

    render(){
            const {type,data,error,fields,warning} = this.state;          
        return(
            <StyledPaper elevation={12}>
                   <LoginTab type={Types[type]} close={this.props.close} valueChange={this.handleChange}
                   changeType={this.changePage} data={data} fields={fields} errorlabel={warning} error={error} submit={this.submit}/>         
            </StyledPaper>
        )
    }
}

const mapStateToProps = (state) => {       
    return {
      
    }
  };

export default connect(mapStateToProps,{signIn,sigUp})(Login);