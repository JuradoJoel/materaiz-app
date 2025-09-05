import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

const ContactForm = () => (
  <Box sx={{ py: 4, mt: 6, mb: 6 }}>
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
        Envíanos tu consulta
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Nombre" variant="outlined" />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Apellido" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Email" type="email" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Consulta" multiline rows={4} variant="outlined" />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="contained" size="large">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default ContactForm;
