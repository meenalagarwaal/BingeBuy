import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { searchQueryItems } from "../../store/searchSlice";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Cart from "../Cart";
import useDebounce  from "../../utils/useDebounce";
import {SearchBar} from '../SearchBar';
import { useTheme } from "../../context/ThemeContext";
import './index.module.css';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const {toggleTheme,isDarkTheme } = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const count = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const debouncedSearchQuery = useDebounce(query, 500);

  useEffect(() => {
      dispatch(searchQueryItems(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const iconColor = isDarkTheme ? '#FFFFFF' : '#FFFFFF';
  const headerColor = isDarkTheme ?'#000000' : '#123661';

  return (
    <AppBar className="header">
      <Toolbar   style={{
    backgroundColor: headerColor,
    display: 'flex',
    justifyContent: 'space-between',

  }}
         >
        <Typography variant="h6" component="div" 
        style={{
          '@media (max-width:600px)': {
            display: 'flex',
            alignItems: 'center',
            margin: '0px 10px 0 0'
          }
        }}
         
        >
          <IconButton onClick={toggleTheme}
           color="inherit" 
           data-testid = {isDarkTheme ? 'dark-mode-icon': 'light-mode-icon'} >
            {isDarkTheme ? (
              <DarkModeIcon style={{ color: iconColor }} />
            ) : (
              <WbSunnyIcon style={{ color: iconColor }} />
            )}
          </IconButton>
          <span>Bingebuy</span>
        </Typography>
        <Typography  variant="body2"
          sx={{
            marginRight: 2,
            flex: 1,
            textAlign: "center"
          }}>
          <SearchBar setQuery={setQuery} />
        </Typography>
        <IconButton aria-label="cart"  data-testid="cart-button" >
          <div onClick={handleOpenModal}>
          <StyledBadge badgeContent={count} style={{ color: iconColor }} data-testid="cart-badge" >
            <ShoppingCartIcon data-testid="cart-icon" />
          </StyledBadge>
          </div>
          <Cart
            open={isModalOpen}
            handleClose={handleCloseModal}
            count={count}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
