import React, { Component } from 'react';
import {CardBox,StyledCardMedia,StyledBox,StyledTitle,MovieBox,StyledText} from './Movie.css';
import Img from '../../Utilities/blank_poster.jpg';
import Hidden from '@material-ui/core/Hidden';
import {Card,Typography,CardHeader,CardContent} from '@material-ui/core';
import { connect } from "react-redux";
import Comments from '../../Components/Comments/Comments';
import {StyledButton} from '../HomePage/HomePage.css';
import WarningModal from '../../Components/WarningModal/WarningModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import AddMovie from '../../Containers/AddMovie/AddMovie';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class Movie extends Component {

        constructor(props) {
            super(props);
            this.state = {
                movie : {},
                open : false,
                review : false,
                isReviewed : false
            }            
        }

        updateData = (props) => {
            const {movies,logged,user} = props;
            let name = this.props.match.params.movie;
            if(movies.length > 0){
                let movie = movies.filter(movie => movie.name === name )[0];
                if(logged){                                        
                    let isReviewed = movie.ratings.filter(review => review.id.toString() === user._id.toString()).length > 0;       
                    this.setState({isReviewed});
                }  
                else{
                    this.setState({isReviewed : false}); 
                }              
                this.setState({movie});     
                
            }
        }
        
        componentDidMount(){
             this.updateData(this.props);           
        }        

        shouldComponentUpdate(nextProps){            
            if(this.props.logged !== nextProps.logged){
                this.updateData(nextProps);                   
            }
            return true;
        }

        changeWarningModel = (set = false) => {            
            if(set === true){
                this.updateData(this.props); 
            }            
            this.setState((state) => ({
                open : !state.open
            }))
        }

        changeRatingModel = (set = false) => {              
            if(set === true){                
                this.updateData(this.props); 
            }          
            this.setState((state) => ({
                open : !state.open,
                review : !state.review
            }))
        }

    render() {
        const { movie,open,isReviewed,review } = this.state;
        const {logged,user} = this.props;        
        return (
            <>  {Object.keys(movie).length > 0 && <>
                <div style={{marginBottom : '40px'}}>  
                <Hidden only={'xs'}>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        size="small"                    
                        startIcon={<ArrowBackIcon/>}
                        float ='right'
                        style={{marginLeft: '10px'}}
                        href='#'                        
                    >Back</StyledButton>
                </Hidden>                                             
                <StyledButton
                    variant="contained"
                    color="primary"
                    size="small"                    
                    startIcon={isReviewed ? <EditIcon /> : <AddIcon />}
                    float ='right'
                    style={{marginLeft: '10px'}}
                    onClick = {this.changeRatingModel}
                >
                    {isReviewed ? 'Update Review' : 'Add Review'}
                </StyledButton>
                <StyledButton
                    variant="contained"
                    color="primary"
                    size="small"                    
                    startIcon={<EditIcon />}
                    float ='right'
                    onClick = {this.changeWarningModel}
                >
                    Update Movie
                </StyledButton>
                </div>              
                {!logged && <WarningModal type={open}  handleModal={this.changeWarningModel}/>}  
                {logged && <AddMovie open={open} 
                                     review={review} 
                                     reviewed={isReviewed} 
                                     update={true} 
                                     id={movie._id} 
                                     name={movie.name}
                                     close={review ? this.changeRatingModel : this.changeWarningModel}/>}
                <Hidden only="xs"> 
                    <>    
                    <StyledBox>            
                        <CardBox > </CardBox>
                        <StyledTitle variant={'h4'} gutterBottom >{movie.name}</StyledTitle>
                        <MovieBox>
                                <StyledCardMedia                
                                    image={movie.img === '' ? Img : movie.img}   
                                    src={movie.img_name ? movie.img_name : ''}/>      
                        </MovieBox>                                                                     
                    </StyledBox>
                    <StyledText variant="h5" display="block" gutterBottom >
                    {`${(movie.date).toLocaleDateString()} \u25CF ${movie.language}`}
                    </StyledText>  
                    </>
                    <Typography style={{marginTop : '50px'}} variant={'body1'}>{movie.description}</Typography>                                        
                </Hidden>
                <Hidden only={['sm','md','lg','xl']}>
                    <Card style={{height : '350px'}} >                            
                        <StyledCardMedia 
                        image={movie.img === '' ? Img : movie.img}   
                        src={movie.img_name ? movie.img_name : ''}/>  
                    </Card>
                    <Typography variant={'h4'} style={{marginTop : '10px'}}>{movie.name}</Typography> 
                    <Typography variant="h5" display="block" gutterBottom>
                    {`${(movie.date).toLocaleDateString()} \u25CF ${movie.language}`}
                    </Typography>    
                    <Typography style={{marginTop : '10px'}} variant={'body1'}>{movie.description}</Typography>                                                       
                </Hidden>                  
                <Card variant="outlined" style={{marginTop : '10px'}}>
                    <CardHeader title='User Reviews' style={{borderBottom : '1px solid rgba(0, 0, 0, 0.12)',paddingTop : '2px',
                    paddingBottom : '2px'}} avatar={<CommentIcon/>} />
                    <CardContent>
                        {movie.ratings.map(value => <Comments  key={value.id} 
                                                               id={logged ? user._id.toString() : ''}                                                                
                                                               comments={value}/>)}                    
                    </CardContent>
                </Card>                    
                </>     }                                                  
            </>
        );
    }
}

const mapStateToProps = (state) => {       
    return {
      logged : state.home.logged,
      user: state.home.user,
      movies: state.home.movies
    }
  };

export default connect(mapStateToProps)(Movie);