import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const HeaderBox = styled('div')({
        textAlign: 'center'        
})

export const TextBox = styled('div')({
        fontFamily : "'Permanent Marker', cursive",
        fontSize : '24px'              
})

export const StyledGrid =  styled('div')({
        float : 'right'      
})

export const StyledButton = styled(Button)`
               &&&{ padding : 0;    }
`



