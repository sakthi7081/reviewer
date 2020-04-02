import styled from 'styled-components';
import {CardMedia} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';


export const StyledCardMedia = styled(CardMedia)`
        height : 350px;        
        &&&{
                background-size : 100% 100%;
        }
`
export const StyledRating = withStyles({
        iconFilled: {
          color: '#ff6d75',
        },
        iconHover: {
          color: '#ff3d47',
        },
        
      })(Rating);
