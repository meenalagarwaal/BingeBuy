import React, { useEffect, useState } from "react";
import { Grid, Typography, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const Product = () => {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProduct = async (id) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        showBoundary(error);
        setLoading(false);
        throw error;
      }
    };
    getProduct(id);
  }, [id, showBoundary]);

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
        Loading...
      </div>
    );
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "150px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              alt={product?.title || "Product Image"}
              height="300"
              src={product?.images[0]}
              style={{ marginBottom: "20px" }}
            />
            <Typography variant="h4" gutterBottom>
              {product?.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {product?.description}
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Price: ₹{product?.price}
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Rating: {product?.rating}(5.0)
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Category: {product?.category}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
