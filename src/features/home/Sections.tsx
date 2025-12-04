import { Box, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

export const AboutUs = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Iconify icon="solar:star-bold" width={40} height={40} />

    <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
      Sobre Nosotros 🧉
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      Bienvenidos a MateRaiZ, un emprendimiento creado con pasión por nuestras tradiciones y la
      calidad. Cada uno de nuestros productos está pensado para acompañarte todos los días, ya sea
      en tu hogar, en el trabajo o en tus momentos al aire libre.
    </Typography>

    <Typography paragraph>
      Nos enfocamos en brindar productos confiables, artesanales y a precios accesibles, siempre
      buscando que cada cliente tenga la mejor experiencia.
    </Typography>
  </Box>
);

export const ShippingInfo = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Iconify icon="eva:car-outline" width={40} height={40} />

    <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
      Información de Envíos 🚚
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      En MateRaiZ queremos que cada pedido llegue seguro, rápido y sin complicaciones. Nuestro
      transporte principal será <strong>Correo Argentino</strong>, brindándote seguimiento y
      confianza.
    </Typography>

    <Typography paragraph>
      Pero también entendemos que cada cliente tiene su preferencia, por eso: si querés, podés
      elegir tu propio transporte de confianza.
    </Typography>

    <Typography paragraph>
      <strong>Opciones:</strong>
    </Typography>

    <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 350 }}>
      <li>Correo Argentino (principal)</li>
      <li>Transporte de tu elección</li>
      <li>Coordinación personalizada</li>
    </ul>

    <Typography paragraph sx={{ mt: 2 }}>
      Vos decidís cómo recibir tu compra.
    </Typography>
  </Box>
);

export const HomeDelivery = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Iconify icon="solar:home-line-duotone" width={40} height={40} />

    <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
      Entregas a Domicilio 🏠
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      Si vivís cerca o preferís recibirlo más rápido, también contamos con entregas a domicilio
      coordinando previamente por WhatsApp.
    </Typography>

    <Typography paragraph>Buscamos que tu experiencia sea cómoda, rápida y segura.</Typography>
  </Box>
);

export const Promise = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Iconify icon="solar:heart-line-duotone" width={40} height={40} />

    <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
      Nuestra Promesa 💥
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      En MateRaiZ queremos cuidar cada detalle. Nos comprometemos a ofrecerte:
    </Typography>

    <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 300 }}>
      <li>Productos de calidad</li>
      <li>Atención rápida y personalizada</li>
      <li>Confianza y transparencia en cada compra</li>
      <li>Mejoras constantes en nuestra tienda online</li>
    </ul>
  </Box>
);

export const ComingSoon = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Iconify icon="solar:sparkles-line-duotone" width={40} height={40} />

    <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
      Próximamente 🎉
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      Muy pronto se vienen nuevas colecciones, ofertas especiales y lanzamientos exclusivos para
      nuestra comunidad.
    </Typography>

    <Typography paragraph>Estate atento porque este es recién el comienzo.</Typography>
  </Box>
);

export const PaymentMethods = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Iconify icon="mdi:credit-card-outline" width={40} height={40} />

    <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
      Métodos de Pago 💳
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      Por el momento aceptamos solo transferencias bancarias.
    </Typography>

    <Typography paragraph sx={{ fontWeight: 'bold' }}>
      Al realizar tu pago por transferencia, se aplica un recargo del 5% correspondiente a los
      costos del servicio.
    </Typography>

    <Typography paragraph sx={{ mt: 2 }}>
      ✨ Buscamos que tu experiencia sea simple, segura y cómoda de principio a fin.
    </Typography>
  </Box>
);
