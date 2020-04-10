import {CardHeader,Grid} from '@material-ui/core';
import styled from 'styled-components';

export const StyledHeader = styled(CardHeader)`
    &&{
        padding : 4px;
        background-color : #424242;
        color : #fff;
        text-align : center;
    }`

export const StyledGrid = styled(Grid)`
        align-items : center;
        display : flex;
        font-weight : bold;        
`
export const DisplayGrid = styled(Grid)`
        &&&{@media (max-width: 600px) {
            margin-bottom : 10px;
        }}     
`