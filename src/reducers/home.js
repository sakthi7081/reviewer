import * as types from '../Utilities/ActionTypes';

const initialState = {
    user : JSON.parse(localStorage.getItem('users')),
    logged : JSON.parse(localStorage.getItem('users')) !== null, 
    loading : true,
    movies : [],
    search : ''    
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case types.GET_MOVIES: 
      return {
          ...state,
          movies : action.movies,
          loading : false
      }
      case types.SEARCH_MOVIE: 
      return {
          ...state,
          search : action.value,          
      }
      case types.GET_USER: 
      return {
          ...state,
          user : action.user,
          logged : true
      }
      case types.CREATE_MOVIE:
      return {
        ...state,
        movies : [...state.movies,action.movie]
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
  