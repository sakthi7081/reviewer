import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ButtonBox = styled('div')({
        display : 'inline-flex',
        width : '100%',
        justifyContent : 'center'
})

export const ProgressButton = styled('div')({
        position: 'relative'
})

export const Styledprogress = styled(CircularProgress)({        
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -10,
        marginLeft: -12
})

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
       &&{ margin-top : 10px;
        width : 120px; 
        margin-bottom : 10px;
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
        margin-bottom : 10px;
        @media (max-width: 360px) {
                display : grid;
            }  
`