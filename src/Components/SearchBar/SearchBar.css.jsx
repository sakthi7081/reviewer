import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

export const StyledPaper = styled('div')((props) =>({
    width :  props.width ?  `${props.width}px` : '300px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    backgroundColor:'white',
    borderRadius : '4px',
    display: 'inline-block'
}));

export const StyledInput = styled(InputBase)((props) =>({
    width :  props.width ?  `${props.width}px` : '280px'
}));

