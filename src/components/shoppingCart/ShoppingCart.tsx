import { Box, Grid, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ShoppingCart = ({ item }: { item: any }) => (
  <Box>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img
          src={item.product.image}
          alt={item.product.name}
          style={{
            width: '100%',
            aspectRatio: 1,
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            mb: 1,
            textTransform: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.product.name}
        </Typography>
        <Typography
          color="error"
          variant="body2"
          sx={{ cursor: 'pointer', mb: 1 }}
          onClick={() => {}}
        >
          Eliminar
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ bgcolor: 'grey.200' }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ minWidth: 15, textAlign: 'center' }}>{item.quantity}</Typography>
            <IconButton size="small" sx={{ bgcolor: 'grey.200' }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ${item.product.original_price.toLocaleString()}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default ShoppingCart;
