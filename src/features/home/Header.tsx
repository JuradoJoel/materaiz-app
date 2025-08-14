import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import logo from '../../assets/logoMate.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Header() {
  return (
    <> 
        <Container maxWidth={false} disableGutters>
        <Box sx={{ backgroundColor: 'neutral.darker', backgroundImage: `url(${logo})`, backgroundRepeat: 'no-repeat', height:'125px', backgroundPosition: 'center', borderBottom: 2, borderColor:'neutral.dark' }} />
        <Box>
          <AppBar position='static' sx={{ backgroundColor: 'neutral.darker' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box>
              <Button color='inherit'>
                Cátalogo
              </Button>
              <Button color='inherit'>
                Mi cuenta mayorista
              </Button>
              </Box>
              <Box>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </>
  );
}

export default Header;
