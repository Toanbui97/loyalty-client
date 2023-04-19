import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Badge, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { HomeDropDown, PageDropDown, UserAccountDropDown } from '../component/transaction/DropDown';
import BootstrapButton from '../component/transaction/BootstrapButton';
import { CategoriesDropDown } from '../component/transaction/CategoriesDropDown';
import Product from '../component/transaction/Product';
import { Stack } from '@mui/system';
import LeftMenu from '../component/transaction/LeftMenu'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    border: '1px solid #8c959f',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 35, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '35ch',
            },
        },
    },
}));

const Item = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const itemNumber = 20;
function TransactionHome() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [itemInCart, setItemInCartNumber] = React.useState(0);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const addToCart = () => {
        setItemInCartNumber(itemInCart + 1);
    }

    const removeToCart = () => {
        setItemInCartNumber(itemInCart - 1);
    }

    return (
        <div>
            <div style={{ backgroundColor: '#F6F9FC' }}>
                <AppBar position="static" color="transparent" elevation={0} style={{ backgroundColor: '#fff', margin: 0, boxShadow:'0px 1px 3px rgba(3, 0, 71, 0.09)' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
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
                                LOGO
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu} color="black">
                                            <Typography textAlign="center" color="black">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                LOGO
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Box>
                            <Box sx={{ flexGrow: 0.1 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/3.jpg" />
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>

                                <Tooltip title="Open settings">
                                    <Badge badgeContent={itemInCart} color="primary">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <ShoppingCartOutlinedIcon fontSize="large" />
                                        </IconButton>
                                    </Badge>
                                </Tooltip>
                               
                            </Box>
                        </Toolbar>
                    </Container>
                    <Container maxWidth='xl' >
                        <Grid
                            xs={12}
                            container
                            justifyContent="space-between"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            columnSpacing={-3}
                            sx={{ fontSize: '10px' }}>
                            <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
                                <CategoriesDropDown />
                            </Grid>
                            <Grid container xs={9} display="flex" justifyContent="flex-start" alignItems="center">
                                <Grid container xs={12} display="flex" justifyContent="flex-end" alignItems="flex-end" >
                                    <Grid  >
                                        <BootstrapButton >
                                            <HomeDropDown />
                                        </BootstrapButton>
                                    </Grid>
                                    <Grid >
                                        <BootstrapButton >
                                            <PageDropDown />
                                        </BootstrapButton>
                                    </Grid>
                                    <Grid  >
                                        <BootstrapButton >
                                            <UserAccountDropDown />
                                        </BootstrapButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Container>
                </AppBar>

                <Container maxWidth="xl" >
                    <Grid container xs={12} display="flex" justifyContent="center" alignItems="center" >
                        <Grid style={{ backgroundColor: '#fff', marginTop: '2em', margonBottom: '2em', borderRadius: '10px' }}
                            container xs={11} display="flex" justifyContent="center" alignItems="center" sx={{ boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)' }}>
                            <Grid >
                                <BootstrapButton >
                                    <HomeDropDown />
                                </BootstrapButton>
                            </Grid>
                            <Grid >
                                <BootstrapButton >
                                    <HomeDropDown />
                                </BootstrapButton>
                            </Grid>
                            <Grid  >
                                <BootstrapButton >
                                    <HomeDropDown />
                                </BootstrapButton>
                            </Grid>
                        </Grid>

                        <Grid style={{ marginTop: '2em', }} columnSpacing={2} container xs={11} display="flex" justifyContent="center" alignItems="flex-start" rowSpacing={2}>
                            <Grid xs={3} > <LeftMenu /></Grid>
                            <Grid container display="flex" justifyContent="center" alignItems="flex-start" xs={9}>
                                <Grid xs={4} >
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                </Grid>
                                <Grid xs={4} >
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                </Grid>
                                <Grid xs={4}>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>
                                    <Product addToCart={addToCart} removeToCart={removeToCart}/>

                                </Grid>


                            </Grid>

                        </Grid>

                    </Grid>
                </Container>

            </div>
        </div>
    );
}

export default TransactionHome;