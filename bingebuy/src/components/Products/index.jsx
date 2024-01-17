import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { searchCacheItems } from "../../store/searchCacheSlice";
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
} from "../../store/searchSlice";
import "./index.module.css";
import { Link } from "react-router-dom";
import ButtonComponent from "../Button/index.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();
  const { search = {} } = useSelector((state) => state);
  const { items = [], loading } = search;
  const { searchQuery = "" } = search ?? {};
  const { searchCache = {} } = useSelector((state) => state);
  const { cacheItems = {} } = searchCache;
  const cartItems = useSelector((state) => state.cart) || [];
  useEffect(() => {
    const getItems = async (query) => {
      try {
        dispatch(fetchItemsStart());
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        if (!response || !response.ok) {
          // Handle the error, log it, or throw an exception.
          const errorMessage = response ? `Error: ${response.statusText}` : 'No response received.';
          console.error(errorMessage);
          return;
        }
        const data = await response.json();
        dispatch(fetchItemsSuccess(data.products));
        dispatch(
          searchCacheItems({
            items: data.products,
            searchQuery: query,
          })
        );
      } catch (error) {
        dispatch(fetchItemsFailure(error.message));
        showBoundary(error);
      }
    };

    if (cacheItems && Object.keys(cacheItems).includes(searchQuery)) {
      dispatch(fetchItemsSuccess(cacheItems[searchQuery]));
      return;
    }

    getItems(searchQuery);
  }, [searchQuery, cacheItems, dispatch, showBoundary]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        Loading...
      </div>
    );
  }
   const handleRemoveFromCart = (item) => {
    try {
      dispatch(removeFromCart(item.id));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const handleAddToCart = (item) => {
      dispatch(addToCart(item));
  };
  const handleDeleteItem = (selectedItemToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        const filteredData = items.filter(
          (item) => !(item.id === selectedItemToDelete.id)
        );
        dispatch(fetchItemsSuccess(filteredData));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "100px" }}>
      <Grid container spacing={3} justifyContent="center">
        {items?.length === 0 && <p>NO RESULTS FOUND!</p>}
        {items?.map((item) => (
          <Grid item key={item.id} xs={12}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#EFF3F8",
                '@media (max-width:600px)': {
                  display: 'block'
                }
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  width: "400px",
                  height: "180px",
                }}
              >
                <Link
                  to={`/products/${item?.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    alt={item.title}
                    height="140"
                    data-testid={item.title}
                    image={item.thumbnail}
                    component="img"
                    loading="lazy"
                    style={{
                      width: "400px",
                      height: "180px",
                      marginRight: "10px",
                    }}
                  />
                </Link>
              </div>
              <CardContent style={{ textAlign: "left", position: "relative" }}>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: ₹
                  {cartItems?.find((cartItem) => cartItem.id === item.id)
                    ?.quantity * item.price || 0}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    data-testid={`remove${item.id}`}
                    onClick={() => handleRemoveFromCart(item)}
                    disabled={
                      (cartItems?.find((cartItem) => cartItem.id === item.id)
                        ?.quantity || 0) === 0
                    }
                    style={{ marginRight: "5px" }}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                  {cartItems?.find((cartItem) => cartItem.id === item.id)
                    ?.quantity || 0}
                  <IconButton
                    edge="end"
                    aria-label="addProduct"
                    onClick={() => handleAddToCart(item)}
                    disabled={
                      cartItems.find((cartItem) => cartItem.id === item.id)
                        ?.quantity === item.stock
                    }
                    data-testid={`add${item.id}`}
                    style={{ marginLeft: "5px" }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </div>
                <ButtonComponent
                  onClick={() => handleDeleteItem(item)}
                  id={item.id}
                />
                {cartItems.find((cartItem) => cartItem.id === item.id)
                  ?.quantity === item.stock && <p style={{color:'red'}}>OUT OF STOCK</p>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <AlertDialog open={isDialogOpen} handleClose={handleCloseDialog} /> */}
    </Container>
  );
};

export default Product;
