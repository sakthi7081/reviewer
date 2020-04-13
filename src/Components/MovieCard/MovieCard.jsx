import React from 'react';
import {StyledCardMedia,StyledRating,StyledSynopsis} from './MovieCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Card,CardActionArea,CardContent,Typography} from '@material-ui/core';
import Img from '../../Utilities/blank_poster.jpg';
import Skeleton from '@material-ui/lab/Skeleton';

export const  MovieSkeleton = () => {        
    return (        
        <Card >
            <CardActionArea>
                <Skeleton animation="wave" height={350} variant="rect" />
                <CardContent>
                    <Skeleton animation="wave" height={40} width={'40%'} />   
                    <div style={{display : 'flex'}}>
                        <Skeleton animation="wave" height={10} width={'25%'} />
                        {` \u25CF`}
                        <Skeleton animation="wave" height={10} width={'25%'} />                          
                    </div>                                
                <StyledRating                    
                    value={0}
                    readOnly                     
                    precision={0.5}
                    disabled
                    icon={<FavoriteIcon fontSize="inherit" />}
                    />
                <StyledSynopsis variant="body2" component="p">
                    <Skeleton animation="wave" height={20} width={'100%'} />                
                    <Skeleton animation="wave" height={20} width={'100%'} />                
                    <Skeleton animation="wave" height={20} width={'100%'} />                
                    <Skeleton animation="wave" height={20} width={'100%'} /> 
                    <Skeleton animation="wave" height={20} width={'50%'} />                
                </StyledSynopsis>
                </CardContent>
            </CardActionArea>            
        </Card>        
    );
}


const MovieCard = ({movie}) => {    
    const rating = movie.ratings.map(value=> value.rating).reduce(((a,b)=> a+b),0);    
    return (        
        <Card >
            <CardActionArea>
                <StyledCardMedia                
                image={movie.img === '' ? Img : movie.img}   
                src={movie.img_name ? movie.img_name : ''}
                />
                <CardContent style={{height: '180px'}}>
                <Typography variant="h5" component="h1" >
                    {movie.name}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {`${(movie.date).toLocaleDateString()} \u25CF ${movie.language}`}
                </Typography>               
                <StyledRating                    
                    value={rating}
                    readOnly                     
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    />
                <StyledSynopsis variant="body2" component="p">
                    {movie.description}
                </StyledSynopsis>
                </CardContent>
            </CardActionArea>            
        </Card>        
    );
}


export default MovieCard;