import React from 'react';
import {Display,Box,ColorBox,Text} from './Loader.css';
import propTypes from 'prop-types'; 
import Backdrop from '@material-ui/core/Backdrop';


export default function Loader({name}){
        return (
                <Backdrop open={true}>
                   <Display>                
                      <Box>
                        <Text>{name}</Text>
                        <ColorBox/>   
                      </Box>                                                                                                                                    
                   </Display> 
                </Backdrop>                
        )}

Loader.propTypes = {
        name : propTypes.string
}