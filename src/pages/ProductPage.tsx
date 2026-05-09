import type { Product } from "../types/Product";
import { fetchProducts } from "../api/items";
import { useEffect, useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={2}>
          <Typography variant="overline">Catalog</Typography>
          <Typography variant="h3" component="h1">
            Products
          </Typography>
          <Typography color="text.secondary">Loading products...</Typography>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={2.5}>
          <Typography variant="overline">Catalog</Typography>
          <Typography variant="h3" component="h1">
            Products
          </Typography>
          <Alert severity="error">Error: {error}</Alert>
        </Stack>
      </Container>
    );
  }

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="overline">Catalog</Typography>
            <Typography variant="h3" component="h1">
              Products
            </Typography>
            <Typography color="text.secondary">
              A quick overview of the current product list.
            </Typography>
          </Stack>
          <Chip
            color="primary"
            label={`${products.length} items`}
            sx={{
              height: 44,
              borderRadius: 999,
              px: 1,
              "& .MuiChip-label": {
                fontSize: "1rem",
                fontWeight: 700,
              },
            }}
          />
        </Stack>

        <Grid container spacing={2.5} aria-live="polite">
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", gap: 2 }}
                  >
                    <Typography variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    >
                      {currencyFormatter.format(product.price)}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 1.75 }} />

                  <Stack spacing={1.25}>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between", gap: 2 }}
                    >
                      <Typography color="text.secondary">Type</Typography>
                      <Typography sx={{ fontWeight: 600 }}>
                        {product.type.name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between", gap: 2 }}
                    >
                      <Typography color="text.secondary">Size</Typography>
                      <Typography sx={{ fontWeight: 600 }}>
                        {product.size}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between", gap: 2 }}
                    >
                      <Typography color="text.secondary">
                        Manufacturer
                      </Typography>
                      <Link
                        component={RouterLink}
                        to={`/manufacturers/${product.manufacturer.id}/products`}
                        underline="hover"
                        sx={{ fontWeight: 700 }}
                      >
                        {product.manufacturer.name}
                      </Link>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
