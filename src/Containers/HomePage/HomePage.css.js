import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

export const StyledAlert =styled(Alert)`
        width : 100%;
        &&{
                margin-top : 20px;
        }
`

export const StyledBox = styled('div')`
        padding : 20px;
`
export const StyledSearchBox = styled('div')`
        text-align : center;
        width : 100%;
        margin-bottom : 20px;
`

export const StyledButton = styled(Button)`
        float : ${props => props.float ? props.float : ''}       
`