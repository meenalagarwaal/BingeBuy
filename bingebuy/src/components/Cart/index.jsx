import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart,deleteFromCart } from "../../store/cartSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { ListItemSecondaryAction } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ButtonComponent from "../Button/index.jsx";
import Slide from '@mui/material/Slide';
import EmptyCart from "./EmptyCart.jsx";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Cart = ({ open, handleClose, count }) => {
  const cartItems = useSelector((state) => state.cart);
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const { items = []} = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    try {
      dispatch(removeFromCart(itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleAddFromCart = (item) => {
    try {
      dispatch(addToCart(item));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };
  const handleDeleteItemFromCart=(itemId)=>{
    try {
      dispatch(deleteFromCart(itemId));
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  }

  return (
    <Dialog
    open={open}
    data-testid="cart-modal"
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
    maxWidth="xs"
    fullScreen
    TransitionComponent={Transition}
    >
  <DialogTitle id="cart-dialog-title">YOUR CART</DialogTitle>
  <DialogContent>
    <List>
      {count === 0 && <EmptyCart/>}
      {cartItems?.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '10px',
            borderBottom: '1px solid #ccc',
          }}
        >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ListItemText
            primary={`${item.title}`}
          />
          <ListItemText
            primary={`Qty: ${item.quantity}`}
          />
          <ListItemText
            secondary={`Price: ₹${item.price} Total: ₹${(
              item.quantity * item.price
            )?.toFixed(2)}`}
          />
          <ListItemSecondaryAction sx={{ marginLeft: 'auto' }}>
            <IconButton
              edge="end"
              aria-label="deleteIcon"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              <RemoveCircleIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="add"
              id={`addToCartButton${item.id}`}
              onClick={() => handleAddFromCart(item)}
              disabled={
                cartItems.find((i) => i.id === item.id)?.quantity === item.stock
              }
            >
              <AddCircleIcon />
            </IconButton>
            <ButtonComponent onClick={() => handleDeleteItemFromCart(item.id)} data-testid={`Delete${item.id}`}/>
            {console.log(`Delete${item.id}`)}
          </ListItemSecondaryAction>
          </div>
        </ListItem>
      ))}
    </List>
  </DialogContent>
  <DialogActions>
    <Grid container justifyContent="flex-end">
      <Typography variant="h6">
        Total Price: ₹{getTotalPrice()?.toFixed(2)}
      </Typography>
    </Grid>
    <Button onClick={handleClose} color="primary" data-testid='cart-close'>
      Close
    </Button>
  </DialogActions>
</Dialog>
  );
};

export default Cart;
