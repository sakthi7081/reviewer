import styled,{ keyframes }  from 'styled-components';

export const Display =  styled('div')({
    height : '100%',    
    display : 'flex',
    justifyContent : 'center',
    alignItems: 'center',
    fontSize : '20px',  
    color : '#fff'
})

const Rotate = keyframes`
    from{        
        width : 0;         
    }
    to{        
        width : 100%;         
    }
`

const Rotate1 = keyframes`
    from{        
        width : 0px;   
        visibility: visible;  
        padding : 4px;     
    }
    to{        
        width : 135px;                
    }
`

export const ColorBox = styled.div`
    animation: ${Rotate} 3s ease-in-out,${Rotate} 3s 3s ease-in-out reverse; 
    background-color : #424242; 
    float : right;
    width : 0%; 
    height : 100%;      
`
export const Text = styled.div`
    animation: ${Rotate1} 3s ease-in-out 3.5s forwards;                   
    width : 0px; 
    font-family: 'Permanent Marker', cursive; 
    position: absolute;      
    overflow: hidden;
`
export const Box = styled.div`    
    width: 110px;    
    height : 30px; 
    display:'inline-block';             
`