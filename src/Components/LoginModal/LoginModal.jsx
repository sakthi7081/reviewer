import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';
import {Styledmodal} from './LoginModal.css';
import Login from '../../Containers/Login/Login';



export default function LoginModal(){

        const [open, changeModal] = useState(false);

        const handleModal = () => { changeModal(!open) };

        return(
            <div>
              <Tooltip title="Login/SignUp">
                  <IconButton color="inherit" onClick={handleModal}>              
                      <LockIcon />
                  </IconButton>
              </Tooltip>              
              <Styledmodal open={open} >
                  <Login close={handleModal}/>
               </Styledmodal>
          </div>
        )
}



