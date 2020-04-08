import React,{useState} from 'react';
import {StyledModal,StyledCard,StyledBox} from './WarningModal.css';
import Login from '../../Containers/Login/Login';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import {Divider,CardHeader,CardContent,Typography,IconButton,Button} from '@material-ui/core';

const Warning = ({close,login}) => {
    return (
      <StyledCard >
      <CardHeader       
        action={
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        }
        title="Welcome to Reviewer!"        
      />   
      <Divider />       
      <CardContent>            
          <Typography paragraph>
          Sign up and get access to some cool features.
          Create movie reviews, rate them or even update reviews! 
           Is that enough incentive for you?
          </Typography>         
        </CardContent> 
        <Divider />  
        <StyledBox>
            <Button
                        variant="contained"
                        color="primary"
                        size="small"                    
                        startIcon={<LockIcon />}                    
                        onClick = {login}
                    >
                Login
            </Button> 
        </StyledBox>       
    </StyledCard>

    )
}

export default function WarningModal({type,handleModal}){
   
        const [open, changeModal] = useState(false);

        const LoginModal = () => { changeModal(!open);if(open){handleModal()}};

        return(
            <div>                      
              <StyledModal open={type} >  
                    <>
                    {open ?  <Login close={LoginModal}/> : <Warning login={LoginModal} close={handleModal}/>}                                   
                    </>
              </StyledModal>
            </div>
        )
}



