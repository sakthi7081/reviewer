import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export const StyledPaper = styled(Paper)   
        `&&&{
            width : 350px;     
            padding : 10px;   
            text-align : center;                        
            @media (max-width: 360px) {
                width : 90%;
            }   
        }`

export const StyledBox = styled('div')({
        justifyContent : 'center',
        display : 'flex',  
        margin : '15px'               
})

export const WarningLabel = styled('label')`
        color : red;
`

export const StyledAvatar = styled(Avatar)`&&{
        background-color : #424242
}`

export const StyledButton = styled(Button)`
       &&{ margin-top : 10px;width : 120px; 
        margin-left : ${props => props.margin ? "10px" : "0"} 
`

export const LinkButton = styled.button`
        background: none!important;
        border: none;
        padding: 4px !important;        
        font-family: arial, sans-serif; 
        float : ${props => props.float ? "right" : "left"};     
        color: #069;    
        outline: none;    
        cursor: pointer;
        &:hover{
                text-decoration: underline;
        }          
`
export const StyledLink = styled.div`
        margin-top : 10px; 
        margin-bottom : 10px;
        @media (max-width: 360px) {
                display : grid;
            }  
`