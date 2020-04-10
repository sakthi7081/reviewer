import { Stitch,RemoteMongoClient,UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import * as types from '../Utilities/ActionTypes';

const client = Stitch.initializeDefaultAppClient('reviewer-nzoch');

const credential = new UserPasswordCredential("sakthivel434@gmail.com", "sakthi");
client.auth.loginWithCredential(credential)
  .then(authedUser => console.log(`successfully logged in with id: ${authedUser.id}`))
  .catch(err => console.error(`login failed with error: ${err}`))

const mongodb = client.getServiceClient(
    RemoteMongoClient.factory,
    "reviewer"
  );

  const db = mongodb.db("Reviewer");

  const collection = (collection) => db.collection(collection);

const getMovies = movies => ({
    type: types.GET_MOVIES,
    movies
  })

  const getUser = user => ({
    type: types.GET_USER,
    user
  })
  
  export const getAllMovies = () => dispatch => {    
    collection('Movies').find({}).toArray().then(
        movies => dispatch(getMovies(movies))
    ).catch(err => console.log(err))
  }
  
  export const validateMail = (mail) => {   
        return collection('Users').find({email : mail}).toArray().then(users => users.length > 0 ? true : false)
  }

  export const validateMovie = (movie) => {
    return collection('Movies').find({name : {$regex : `^${movie}$`, $options : 'i'}}).toArray().then(movies => movies.length > 0 ? true : false)
  }

  export const signIn =(mail,password) => dispatch => {
    return collection('Users').findOne({email : mail, password : password})
    .then(users => {if(users){dispatch(getUser(users));localStorage.setItem('users',JSON.stringify(users))}else{return 'Invalid Username/Password'}}
    ).catch(err=> console.log(`login - ${err}`))
  }

export const sigUp =(user)=> dispatch => {
    return collection('Users').insertOne(user)
    .then(result => dispatch(signIn(user.email,user.password))
    ).catch(err=> console.log(`Signup - ${err}`))
}

export const createMovie =(movie)=> dispatch=>{  
     collection('Movies').insertOne(movie)    
    .then(data=> 
          dispatch({type : types.CREATE_MOVIE,
                movie : {_id: data.insertedId,...movie}})
      ).catch(err=> console.log(`Movie Creation - ${err}`));
}

export const passwordReset =(mail,password) => {
    return collection('Users').updateOne({email : mail},{$set:{password : password}})        
    .then(result => {
        const { matchedCount, modifiedCount } = result;
        if(matchedCount && modifiedCount) {
          return 'Password Reset Successful'
        }
        return 'Password cannot Reset'
    }).catch(err=> console.log(`login - ${err}`))
}

  export const logout =()=> dispatch =>{
      dispatch({
        type: types.LOGOUT_USER
      });
      localStorage.setItem('Users','');
      localStorage.clear();
  }

  export const checkProperties =(obj)=> {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== "")
            return false;
    }
    return true;
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});