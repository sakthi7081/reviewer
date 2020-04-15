import React from 'react';
import { connect } from "react-redux";
import {StyledModal,StyledCard} from '../../Components/WarningModal/WarningModal.css';
import {StyledButton,ProgressButton,ButtonBox,Styledprogress} from '../Login/Login.css';
import {Divider,CardContent,TextField,Hidden,MenuItem,Button,IconButton} from '@material-ui/core';
import {StyledHeader,StyledGrid,DisplayGrid} from './AddMovie.css';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import {StyledRating} from '../../Components/MovieCard/MovieCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { MuiPickersUtilsProvider,KeyboardDatePicker  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {checkProperties,validateMovie,toBase64,createMovie,updateMovie,Base64toFile} from '../../actions';


const languages = [
    'English', 'Tamil', 'Malayalam', 'Kanada', 'Korean', 'Hindi', 'Telugu', 'Other' 
];

const IntialState = {
    loading : false,
    movieName : '',
    synopsis : '',
    comment : '',
    size : 0,
    file : '',
    rating : 0,
    releaseDate : new Date(),
    language : 'Other',
    error : {}    
};    


class AddMovie extends React.Component{

    constructor(props) {
        super(props);
        this.state = IntialState;      
    }

    handleResize =()=> this.setState({size : window.innerWidth});                         
       
    componentDidMount(){
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    shouldComponentUpdate(nextProps){
       if(this.props.open !== nextProps.open){ 
            let movie = nextProps.movies.filter(movie => movie._id === nextProps.id)[0];
            if(nextProps.review && nextProps.update){
                    if(nextProps.reviewed){                        
                        let review = movie.ratings.filter(rating => rating.id.toString() === this.props.user._id.toString())[0];
                        this.setState({                            
                            comment : review.comment,                                                        
                            rating : review.rating
                        });                                  
                    } 
            }
            else if(!nextProps.review && nextProps.update){
                this.setState({
                    movieName : movie.name,
                    synopsis : movie.description,                                                                             
                    releaseDate : new Date(movie.date),
                    language : movie.language,
                    file : movie.img ? Base64toFile(movie.img,movie.img_name) : ''
                });
            }
       }       
      return true;
    }

    onInputChange = event => { const error = this.state.error; 
                               delete error[event.target.name]; 
                               this.setState({ [event.target.name]: event.target.value, error}); }; 
    
    onFileChange = event => this.setState({ file: event.target.files[0] });        

    changeDate =(date)=> this.setState({releaseDate : date});
    
    deleteFile = () => this.setState({ file: ''});   
    
    onRatingChange = (event,rating) => this.setState({rating : rating});

    validate =async()=> {
        const error = {};
        const {movieName,synopsis} = this.state;
        const {update,name} = this.props;
        if(!movieName.trim()){
            error['movieName'] = 'Required';
        }
        else{
            if(update && name.toLowerCase() !== movieName.toLowerCase()){
                let result = await validateMovie(movieName.trim());
                if(result){
                    error['movieName'] = 'Name already exist';
                }
            }
            if(!update){
                let result = await validateMovie(movieName.trim());
                if(result){
                    error['movieName'] = 'Name already exist';
                }
            }                                    
        }
        if(!synopsis.trim()){
            error['synopsis'] = 'Required';
        }       
        return error; 
    }

    submitUpdate = async(e) => {
        e.preventDefault();
        this.setState({loading : true});
        let {update, review, reviewed,id,user,movies} = this.props;
        let movie = movies.filter(movie => movie._id === id)[0];
        const {file,releaseDate,language,movieName,comment,synopsis,rating} = this.state;
        if(update && !review){
            let error = await this.validate();
            if(!checkProperties(error)){
                this.setState({error});
            }
            else{
                let Movie = {
                    name : movieName,
                    description : synopsis,
                    language : language,
                    date : releaseDate,
                    img : file ? await toBase64(file) : '',
                    img_name : file ? file.name : '',
                    updated_on : new Date(),
                    updated_by : {id : user._id, username : user.username}                   
                }; 
                let updateData = {  $set: Movie};                 
                    movie = Object.assign({}, movie, Movie);;
                    let updateMovie = {
                        id : id,
                        movie : movie
                    };
                    await this.props.updateMovie(id,updateData,updateMovie);  
                    this.onClose(true);
            }     
        }else{
            if(reviewed){                
                let index = movie.ratings.findIndex(rating => rating.id.toString() === user._id.toString());                                
                let Rating = movie.ratings[index];                
                if(Rating.comment.toLowerCase() !== comment.toLowerCase() || Rating.rating !== rating){
                    Rating = {...Rating,comment : comment,rating : rating };
                    let updateData = {  $set: { ['ratings.'+ index] : Rating}};                 
                    movie = {...movie, ratings : movie.ratings.map(rating => rating.id === Rating.id ? Rating : rating)};
                    let updateMovie = {
                        id : id,
                        movie : movie
                    };
                    await this.props.updateMovie(id,updateData,updateMovie);  
                    this.onClose(true);                 
                }         
                else{
                    this.onClose();    
                }                       
            }
            else{
                let Rating = { rating : rating, comment : comment, username : user.username,id : user._id};
                let updateData = {  $push: { ratings: Rating}};                 
                movie.ratings.push(Rating);
                let updateMovie = {
                    id : id,
                    movie : movie
                };
                await this.props.updateMovie(id,updateData,updateMovie);
                this.onClose(true);    
            }

        }
        this.setState({loading : false});
    }

    submit =async(e)=> {
        e.preventDefault();
        this.setState({loading : true});
        let error = await this.validate();  
        if(!checkProperties(error)){
            this.setState({error});
        }
        else{
            const {file,releaseDate,language,movieName,comment,synopsis,rating} = this.state;
            const {user} = this.props;
            let Movie = {
                name : movieName,
                description : synopsis,
                language : language,
                date : releaseDate,
                img : file ? await toBase64(file) : '',
                img_name : file ? file.name : '',
                created_on : new Date(),
                created_by : {id : user._id, username : user.username},
                ratings : [{comment : comment,rating : rating, id : user._id, username : user.username}] 
            }
            await this.props.createMovie(Movie); 
            this.onClose();    
        }                                     
        this.setState({loading : false});
    }

    onClose =(update = false)=>{
        let size = this.state.size;
        this.setState(IntialState);
        this.setState({size});
        if(this.props.update){
            this.props.close(update);
        }
        else{
            this.props.close();
        }        
    }

  render() {
     const {open,update,review, reviewed} = this.props;
     const {loading,size,file,releaseDate,language,movieName,comment,synopsis,rating,error} = this.state;
    return (
      <>
       <StyledModal open={open}>
            <StyledCard>                
                <StyledHeader title={!update ? "Submit Movie" : review ? reviewed ? "Update Review" : "Add Review" : "Update Movie"} avatar={<MovieCreationIcon/>}/>   
                <Divider />       
                <CardContent>    
                <Grid container spacing={1}>
                        {!review && <> 
                        <Hidden only="xs">
                            <StyledGrid  item xs={12} sm={4} md={3}>
                                Movie Name
                            </StyledGrid>
                        </Hidden>
                        <DisplayGrid item xs={12} sm={8} md={9}>
                            <TextField                                                                        
                                placeholder="Movie Name"                        
                                fullWidth                                
                                size="small"
                                label = {size < 600 ? 'Movie Name' : ''}
                                InputLabelProps={{shrink: true}}
                                name='movieName'
                                value={movieName}
                                onChange={this.onInputChange}
                                error={error.movieName ? true : false}
                                helperText={error.movieName}   
                                variant="outlined" />         
                        </DisplayGrid>   
                        <Hidden only="xs">
                            <StyledGrid  item xs={12} sm={4} md={3}>
                                Synopsis
                            </StyledGrid>
                        </Hidden>
                        <DisplayGrid item xs={12} sm={8} md={9}>
                            <TextField                                                                        
                                placeholder="Synopsis"                        
                                fullWidth
                                multiline
                                size="small"
                                label = {size < 600 ? 'Synopsis' : ''}
                                InputLabelProps={{shrink: true}}
                                name='synopsis'
                                value={synopsis}
                                onChange={this.onInputChange}
                                error={error.synopsis ? true : false}
                                helperText={error.synopsis}   
                                variant="outlined" />         
                        </DisplayGrid>  
                        <Hidden only="xs">
                            <StyledGrid  item xs={12} sm={4} md={3}>
                                Language
                            </StyledGrid>
                        </Hidden>
                        <DisplayGrid item xs={12} sm={8} md={9}>
                            <TextField                                                                                                        
                                select 
                                fullWidth                                                                                                                               
                                variant="outlined"
                                size="small"                                
                                placeholder='Language'
                                InputLabelProps={{shrink: true}}
                                name='language'
                                value={language}
                                onChange={this.onInputChange}
                                label = {size < 600 ? 'Language' : ''}                               
                                > 
                                {languages.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                                ))}
                            </TextField>        
                        </DisplayGrid>   
                        <Hidden only="xs">
                            <StyledGrid  item xs={12} sm={4} md={3}>
                                Release Date
                            </StyledGrid>
                        </Hidden>
                        <DisplayGrid item xs={12} sm={8} md={9}>  
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"                                    
                                    label = {size < 600 ? 'Release Date' : ''} 
                                    format="MM/dd/yyyy"
                                    value={releaseDate}
                                    disableFuture={true}                                    
                                    fullWidth
                                    size="small"                                    
                                    inputProps={{ readOnly: true }}
                                    onChange={this.changeDate}
                                />                                
                            </MuiPickersUtilsProvider>
                        </DisplayGrid> 
                        </>}
                        {(!update || review) && <>
                        <Hidden only="xs">
                            <StyledGrid  item xs={12} sm={4} md={3}>
                                Comments
                            </StyledGrid>
                        </Hidden>
                        <DisplayGrid item xs={12} sm={8} md={9}>
                            <TextField                                                                        
                                placeholder="Comments"                        
                                fullWidth
                                multiline
                                size="small"
                                label = {size < 600 ? 'Comments' : ''}
                                InputLabelProps={{shrink: true}}
                                name='comment'
                                value={comment}
                                onChange={this.onInputChange}
                                variant="outlined" />         
                        </DisplayGrid>                     
                        <StyledGrid  item xs={2} sm={4} md={3}>
                            Rating
                        </StyledGrid>                        
                        <Grid item xs={10} sm={8} md={9}>
                        <StyledRating                    
                            value={rating}                                               
                            precision={0.5}
                            name={'rating'}
                            icon={<FavoriteIcon fontSize="inherit" />}    
                            onChange={this.onRatingChange}                        
                            />
                        </Grid>  
                        </>}                   
                        {!review && <>                         
                        <Hidden only="xs">
                            <StyledGrid  item xs={12} sm={4} md={3}>
                                Movie Poster
                            </StyledGrid>
                        </Hidden>
                        <DisplayGrid item xs={12} sm={8} md={9}>
                            <label>{file ?  file.name: ''}</label>
                            {file  && <IconButton color="primary" size='small' onClick={this.deleteFile}>
                                <CloseIcon />
                            </IconButton>}
                            <input
                                accept="image/*"
                                style={{ display: 'none'}}
                                id="contained-button-file"                                
                                type="file"
                                onChange={this.onFileChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained"
                                color="default"
                                size='small'                                
                                startIcon={<CloudUploadIcon />} component="span">
                                Upload
                                </Button>
                            </label>                                
                            </DisplayGrid> 
                            </>}                                                             
                    </Grid>                            
                </CardContent> 
                <Divider />          
                <ButtonBox>
                    <ProgressButton>
                        <StyledButton
                            type="submit"                
                            variant="contained"
                            color="primary" 
                            size='small'  
                            disabled={loading}
                            onClick={update ? this.submitUpdate : this.submit}             
                            >
                            Submit
                        </StyledButton>
                        {loading && <Styledprogress size={24}/>}
                    </ProgressButton>            
                    <StyledButton                               
                            margin={1}
                            variant="contained"
                            color="secondary"
                            size='small'                            
                            onClick = {this.onClose}                
                            >
                        Cancel
                    </StyledButton>
                </ButtonBox>                    
            </StyledCard>
        </StyledModal> 
      </>
    );
  }
}


const mapStateToProps = (state) => {       
    return {
      user : state.home.user,
      movies : state.home.movies      
    }
  };
  
  export default connect(mapStateToProps,{createMovie,updateMovie})(AddMovie);