import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function HomePage() {
  const highlights = [
    {
      title: "Quality First",
      description:
        "We focus on durable and practical products that make daily life easier for both pets and owners.",
    },
    {
      title: "Fast Browsing",
      description:
        "Find what you need quickly with clear product details and clean, readable cards.",
    },
    {
      title: "Trusted Makers",
      description:
        "We work with manufacturers that put comfort, safety, and quality at the center of their products.",
    },
  ];

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
      <Card
        sx={{
          mb: 4,
          background:
            "linear-gradient(130deg, rgba(11,95,255,0.15) 0%, rgba(255,107,0,0.12) 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={2}>
            <Typography variant="h3" component="h1">
              Welcome to the Product Catalog
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 780 }}>
              Explore our dog product selection and discover clothes, food,
              toys, and everyday essentials curated with care.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5} aria-label="Store highlights">
        {highlights.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
