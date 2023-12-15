import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Paper } from '@mui/material';
import CardImage from '../asserts/Images/cardimage.jpg'
import Profile from '../asserts/Images/profile.jpg'
import { useAuth } from '../context/AuthContext';
import { logOut } from '../services/auth.service';
function Home() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isSubmitting, setIssubmiting] = React.useState(false);
  const { user,logout } = useAuth();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (values) => {
    setIssubmiting(true)
    logOut(values).then(
      (response) => {
      logout()
      },
      (error) => {
        console.log(error)
      }
    );
    setIssubmiting(false)
    handleCloseUserMenu()
  };
  return (
    <Box
  >
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Social Media
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { lg: 'none',md: 'none',xl: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SM
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={Profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem disabled={isSubmitting} key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box
      sx={{
        display: 'flex',
          minWidth: '80%',
          minHeight: '80%',
          justifyContent:'center',
            alignItems:'center',
            marginTop:"5%"
      }}
    >
      <Paper elevation={0} >
      <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        sx={{ height: 250 }}
        image={CardImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.firstName+'-' +user?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Email : {user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         FirstName : {user?.firstName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         LastName : {user?.firstName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Mobile Number : {user?.mobileNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Phone Number : {user?.phoneNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
      </Paper>
    </Box>
    </Box>
  );
}
export default Home;