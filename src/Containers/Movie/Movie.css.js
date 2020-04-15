import {Card,CardMedia,Typography} from '@material-ui/core';
import styled from 'styled-components';

export const StyledCardMedia = styled(CardMedia)`
        height : 100%;        
        &&&{
                background-size : 100% 100%;
        }
`
export const StyledBox = styled('div')({
    position: 'relative', 
    width : '100%' 
   });

export const CardBox = styled(Card)`               
    width: 100%;
    height: 300px;
    &&&{
        background-color : grey;
    }
`
export const MovieBox = styled(Card)({
    position : 'absolute',
    width: '200px',
    height:'300px',    
    left:'30px',
    top:'30px'})

export const StyledTitle = styled(Typography)({
    position : 'absolute',
    left:'250px',
    top : '200px',
    color : 'white'
})

export const StyledText = styled(Typography)({
    position : 'absolute',
    left:'260px',
    top : '415px'    
})