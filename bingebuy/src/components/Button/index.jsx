import React from 'react';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const ButtonComponent = ({onClick,id}) => {
  return (
    <Button variant="contained" startIcon={<DeleteIcon style={{color:'#ffffff'}}/> } 
    onClick={onClick}
    data-testid={`delete${id}`}
              style={{
                marginTop: "10px",
                marginLeft: "11px",
                backgroundColor: "#06366F",
                color: "white",
                fontSize: '8px'
              }}>
            Delete
          </Button>
  )
}

export default ButtonComponent;