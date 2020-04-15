import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const HeaderBox = styled('div')({
        textAlign: 'center'        
})

export const TextBox = styled(Button)`
        &&&{                
                font-family : 'Permanent Marker', cursive;
                font-size : 24px;
                color : #fff;
        }
`             


export const StyledGrid =  styled('div')({
        float : 'right'      
})

export const StyledButton = styled(Button)`
               &&&{ padding : 0;    }
`



