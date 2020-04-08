import * as types from '../Utilities/ActionTypes';

const initialState = {
    user : JSON.parse(localStorage.getItem('users')),
    logged : JSON.parse(localStorage.getItem('users')) !== null, 
    movies : []    
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case types.GET_MOVIES: 
      return {
          ...state,
          movies : action.movies
      }
      case types.GET_USER: 
      return {
          ...state,
          user : action.user,
          logged : true
      } 
      case types.LOGOUT_USER: 
      return {
          ...state,
          user : null,
          logged : false
      }           
      default:
        return state;
    }
  }
  