import React from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export const SearchBar = ({ setQuery }) => {
  return (
<form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setQuery(e.target.value)
        }}
        placeholder="Search..."
        size="small"
        sx={{
          backgroundColor: '#EFF3F8', 
          width:'600px',
          '@media (max-width:600px)': {
           width:'auto',
           marginLeft:'10px'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" aria-label="search">
                <SearchIcon sx={{ color: '#123661' }} />
              </IconButton>
            </InputAdornment>
          ),
          '& .MuiOutlinedInput-input': {
            paddingLeft: '40px', 
          },
        }}
      />
    </form>
  );
};
