import  React from 'react';
import {
    CircularProgressbar,    
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import {Typography} from '@material-ui/core';
  

const getcolor =(value)=> {
    if(value < 2.5){
        return 'red'
    }
    else if(value < 4){
        return 'yellow'
    }
    return 'green'
}

const Comments = ({comments,id}) => {
    let percentage = comments.rating;
    return (
        <>
        <div style={{display: 'flex',alignItems : 'center', marginBottom : '5px'}}>
            <div style={{width : '50px'}}>
                <CircularProgressbar
                    value={percentage * 20}
                    text={percentage}
                    strokeWidth={13}
                    styles={buildStyles({
                        strokeLinecap: "butt",
                        textColor: "black",
                        textSize: "50px",                    
                        pathColor: getcolor(percentage)                  
                    })}
                />
            </div>
            <div>
                <Typography variant={'h6'} 
                style={{fontSize : 'medium',fontWeight : 'bold',marginLeft : '10px'}}>{comments.comment}</Typography>
                <Typography variant={'h6'} 
                style={{fontSize : 'small',fontStyle : 'italic',marginLeft : '10px'}}>{`- ${id === comments.id.toString() ? 'you' : comments.username}`}</Typography>
            </div>            
        </div>
        </>
    );
};

export default Comments;