import styled from 'styled-components';
import {CardMedia} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {Typography} from '@material-ui/core';

export const StyledCardMedia = styled(CardMedia)`
        height : 350px;        
        &&&{
                background-size : 100% 100%;
        }
`

export const StyledSynopsis = styled(Typography)`
        height : 100px;        
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
`

export const StyledRating = withStyles({
        iconFilled: {
          color: '#ff3d47',
        },
        iconHover: {
          color: '#ff3d47',
        },
        
      })(Rating);
