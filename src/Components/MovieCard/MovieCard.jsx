import React from 'react';
import {StyledCardMedia,StyledRating} from './MovieCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Card,CardActionArea,CardContent,Typography} from '@material-ui/core';
import Img from '../../Utilities/blank_poster.jpg';


const MovieCard = ({movie}) => {    
    return (        
        <Card >
            <CardActionArea>
                <StyledCardMedia                
                image={movie.img === '' ? Img : movie.img}                
                />
                <CardContent>
                <Typography variant="h5" component="h1" >
                    {movie.name}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {`${movie.date} \u25CF ${movie.language}`}
                </Typography>               
                <StyledRating                    
                    defaultValue={2}
                    readOnly                     
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    />
                <Typography variant="body2" component="p">
                    {movie.description}
                </Typography>
                </CardContent>
            </CardActionArea>            
        </Card>        
    );
}


export default MovieCard;