import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Product } from "../types/Product";
import { fetchManufacturerProducts } from "../api/items";
import {
  Alert,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function ManufacturerPage() {
  const [manufacturerProducts, setManufacturerProducts] = useState<Product[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchManufacturerProducts(Number(id))
      .then((data) => {
        setManufacturerProducts(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const manufacturerName =
    manufacturerProducts[0]?.manufacturer?.name ?? "Manufacturer";

  if (loading) {
    return (
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Typography color="text.secondary">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

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
            <Typography variant="h3" component="h1">
              {manufacturerName}
            </Typography>
            <Typography color="text.secondary">
              Browse the latest items from {manufacturerName}.
            </Typography>
          </Stack>
          <Chip
            color="secondary"
            label={`${manufacturerProducts.length} products`}
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
          {manufacturerProducts.map((product) => (
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
                      color="secondary"
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
