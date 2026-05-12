import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { authFetch } from "../api/items";

interface Reservation {
  id: number;
  varausAika: string;
  tila: string;
  vaate: {
    id: number;
    name: string;
    price: number;
    size: string;
  };
}

export default function MyReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const asiakasId = sessionStorage.getItem("asiakasId");

    if (!asiakasId) {
      setError("Kirjaudu sisään nähdäksesi varauksesi.");
      setLoading(false);
      return;
    }

    authFetch(`/api/varaukset/asiakas/${asiakasId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Varausten haku epäonnistui.");
        return res.json();
      })
      .then((data) => {
        setReservations(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (reservationId: number) => {
    if (!window.confirm("Haluatko varmasti peruuttaa tämän varauksen?")) return;

    try {
      const response = await authFetch(`/api/varaukset/${reservationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReservations(reservations.filter((res) => res.id !== reservationId));
        alert("Varaus peruutettu.");
      } else {
        alert("Peruutus epäonnistui.");
      }
    } catch (err) {
      alert("Yhteysvirhe.");
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Omat varaukset
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {!error && reservations.length === 0 && (
          <Typography color="text.secondary">
            Sinulla ei ole vielä aktiivisia varauksia.
          </Typography>
        )}

        <Grid container spacing={3}>
          {reservations.map((res) => (
            <Grid key={res.id} size={{ xs: 12 }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack>
                      <Typography variant="h6">{res.vaate.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Koko: {res.vaate.size} | Varattu:{" "}
                        {new Date(res.varausAika).toLocaleDateString("fi-FI")}
                      </Typography>
                    </Stack>
                    <Stack sx={{ alignItems: "flex-end" }}>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 700 }}
                      >
                        {res.vaate.price} €
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 700,
                          color: "success.main",
                          mb: 1,
                        }}
                      >
                        {res.tila}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(res.id)}
                    >
                      Peruuta varaus
                    </Button>
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
