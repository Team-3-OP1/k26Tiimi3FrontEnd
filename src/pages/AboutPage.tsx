import {
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function AboutPage() {
  const details = [
    { label: "Owners", value: "Team 3" },
    { label: "Founded", value: "2025" },
    { label: "Business ID", value: "1234567-8" },
  ];

  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 4, md: 7 } }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h3" component="h1">
            About Us
          </Typography>
          <Typography color="text.secondary">
            Company details at a glance.
          </Typography>
        </Stack>

        <Card aria-label="Company details">
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Company Information
            </Typography>
            <Stack divider={<Divider flexItem />}>
              {details.map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  sx={{ py: 1.25, gap: 2, justifyContent: "space-between" }}
                >
                  <Typography color="text.secondary">{item.label}</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{item.value}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
