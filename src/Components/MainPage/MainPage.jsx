import React  from 'react';
import Header from '../../Containers/Header/Header';
// import Loader from '../../Components/Loader/Loader';
import HomePage from '../../Containers/HomePage/HomePage';


export default function Mainpage(){
    return(
        <>
        <Header />
        {/* <Loader name={'REVIEWER'}/> */}
        <HomePage />    
        </>
    )
}