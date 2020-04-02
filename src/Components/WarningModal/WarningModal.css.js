import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import {Card} from '@material-ui/core';

export const StyledBox = styled.div`
            text-align : center;
            padding : 15px;
`

export const StyledCard = styled(Card)`
      &&&{
            width : 60%;                                        
            @media (max-width: 420px) {
                  width : 90%;
              }  
      }
`

export const Styledmodal = styled(Modal)({
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center'      
})