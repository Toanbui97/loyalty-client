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
import { display, Stack } from '@mui/system';
import LeftMenu from '../component/transaction/LeftMenu'
import CartDrawer from '../component/transaction/CartDrawer';
import {  buttonClasses } from '@mui/base';
import { useSnackbar } from 'notistack';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { ClickAwayListener } from '@mui/base';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import HoverRating from '../component/transaction/HoverRating';
import CardActions from '@mui/material/CardActions';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { orchestratrionTransaction } from '../service/TransactionService';
import { useNavigate } from "react-router-dom";
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

const initData = () => {
    let arr = [];
    for (let i = 0; i <= 15; i++) {
        arr.push({ name: 'Police Gray Eyeglasses' + i, code: '1s2fert' + i, price: 1234, rate: 3 });
    }
    return arr;
}

function TransactionHome() {
    const { enqueueSnackbar } = useSnackbar();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [itemInCartNumber, setItemInCartNumber] = React.useState(0);
    const [listItemInCart, setListItemInCart] = React.useState([]);
    const [productList, setProductList] = React.useState(initData());
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const navigate = useNavigate();

    const setOpenRightDrawer = (open) => (event) => {
        setOpenDrawer(open);
    };


    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };

    const deleteItemInCart = (e, item) => {
        e.stopPropagation();
        e.preventDefault();
        let arr = [...listItemInCart];
        if (item) {
            let index = arr.findIndex(e => e.code == item.code)
            arr.splice(index, 1)
        }
        setListItemInCart(arr);
        showNoti("Remove from Cart", 'error');
    }

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

    const addToCart = React.useCallback((e, product) => {
        e.stopPropagation();
        console.log(listItemInCart.length)
        if (listItemInCart.find(e => e.code == product.code)) {
            listItemInCart.forEach(e => {
                e.number = e.code == product.code ? e.number + 1 : e.number;
            })
        } else {
            product.number = 1;
            listItemInCart.push(product)
        }

        setListItemInCart(listItemInCart);
        let totalNumber = listItemInCart.map(e => e.number).reduce((s1, s2) => s1 + s2, 0);
        console.log(totalNumber)

        setItemInCartNumber(totalNumber);

        productList.find(p => p.code == product.code).number = listItemInCart.find(e => e.code == product.code).number

        setProductList(productList);
        showNoti("Added to Cart", 'success');

    })

    const removeToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault()
        let item = listItemInCart.find(e => e.code == product.code);

        if (item && item.number <= 1) {
            let copy = [...listItemInCart];
            let index = listItemInCart.findIndex(e => e.code == product.code)
            listItemInCart.splice(index, 1)
        }

        if (item && item.number > 1) {
            item.number = item.number - 1;
        }

        setListItemInCart(listItemInCart);
        let number = listItemInCart.map(e => e.number).reduce((s1, s2) => s1 + s2, 0);
        setItemInCartNumber(number);

        productList.find(p => p.code == product.code).number = listItemInCart.find(e => e.code == product.code).number
        setProductList(productList);
        showNoti("Remove from Cart", 'error');
    }

    const navigateToCheckoutPage = (e) => {

        e.preventDefault();
        e.stopPropagation();
        // return orchestratrionTransaction(listItemInCart)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.code === '20000000') {
        //             showNoti(`Payment success`, 'success');
        //             setListItemInCart([]);
        //             productList.forEach(p => p.number = 0);
        //             setProductList(productList);
        //             setOpenDrawer(false);
        //         }
        //     })

        navigate("/checkoutAlternative", {
            state : {
                listItem : listItemInCart
            }, 
        })
    }



    return (
        <div>
            <div style={{ backgroundColor: '#F6F9FC' }}>
                <AppBar position="static" color="transparent" elevation={0} style={{ backgroundColor: '#fff', margin: 0, boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)' }}>
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

                                <Badge badgeContent={listItemInCart.map(e => e.number).reduce((s1, s2) => s1 + s2, 0)} sx={{ color: 'rgb(210, 63, 87)' }} color="error">
                                    {/* <CartDrawer listItemInCart={listItemInCart} setListItemInCart={setListItemInCart} 
                                        addToCart={(e, item) => addToCart(e, item)} removeToCart={(e, item) => removeToCart(e,item)} 
                                    /> */}
                                    <React.Fragment >
                                        <Avatar onClick={setOpenRightDrawer(true)} sx={{ p: 0 }}>
                                            <LocalMallOutlinedIcon fontSize="medium" />
                                        </Avatar>
                                        <ClickAwayListener
                                            mouseEvent="onMouseDown"
                                            touchEvent="onTouchStart"
                                            onClickAway={() => openDrawer && setOpenRightDrawer(false)}
                                        >
                                            <SwipeableDrawer
                                                anchor={'right'}
                                                open={openDrawer}
                                                onClose={(_, reason) => {
                                                    if (reason === 'backdropClick') {
                                                        setOpenDrawer(false)
                                                    }
                                                }}
                                                onOpen={setOpenRightDrawer(false)}
                                            >
                                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                                    <Grid xs={12}
                                                        container
                                                        justifyContent="space-between"
                                                        flexDirection={{ xs: 'column', sm: 'row' }}
                                                        sx={{ fontSize: '10px', margin: '3em 0 3em 0', padding: '0 1em 0 1em' }}
                                                    >
                                                        <Grid container xs={9} display="flex" justifyContent="flex-start" alignItems="flex-start">
                                                            <Stack direction="row" alignItems="center" gap={1}>
                                                                <LocalMallOutlinedIcon fontSize="medium" />
                                                                <Typography variant="body1"> {listItemInCart.map(e => e.number).reduce((s1, s2) => s1 + s2, 0)} item</Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid xs={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
                                                            <CloseIcon fontSize="medium" />
                                                        </Grid>
                                                    </Grid>

                                                    {listItemInCart && listItemInCart.length ? listItemInCart.map(item => (
                                                        <Box
                                                            sx={{ width: 420, boxShadow: 0, padding: '0 1em 0 1em' }}
                                                            role="presentation"

                                                        >
                                                            <Divider />
                                                            <List >
                                                                <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', boxShadow: 0 }} >
                                                                    <Grid xs={12}
                                                                        container
                                                                        flexDirection={{ xs: 'column', sm: 'row' }}
                                                                    >
                                                                        <Grid xs={1} display="flex" justifyContent="center" alignItems="center" flexDirection='column' gap={1}>
                                                                            <IconButton onClick={(e) => addToCart(e, item)}><AddCircleOutlineOutlinedIcon color='success' /></IconButton>
                                                                            <Typography >{item.number}</Typography>
                                                                            <IconButton onClick={e => removeToCart(e, item)}><RemoveCircleOutlineOutlinedIcon sx={{ color: 'rgb(210, 63, 87)' }} /></IconButton>
                                                                            {/* <CloseIcon fontSize="medium" /> */}
                                                                        </Grid>

                                                                        <Grid xs={7} display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection='column'>
                                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                                <Typography component="div" variant="body1">
                                                                                    {item.name}
                                                                                </Typography>
                                                                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                                                                    ${item.price} x {item.number}
                                                                                </Typography>
                                                                                {/* <Typography variant="subtitle1" justifyContent="center" color="text.secondary" component="div" sx={{display: 'flex', alignItems: 'center', width: '100%', }}> */}
                                                                                <Typography sx={{ color: 'rgb(210, 63, 87)' }} variant="subtitle1" justifyContent="flex-end" alignItems='flex-end' color="text.secondary" component="div" >
                                                                                    ${item.price * item.number}
                                                                                </Typography>
                                                                            </CardContent>

                                                                        </Grid>
                                                                        <Grid xs={3} display="flex" justifyContent="flex-end" alignItems="center">
                                                                            <CardMedia
                                                                                component="img"
                                                                                sx={{ width: 130 }}
                                                                                image="https://bazaar.ui-lib.com/assets/images/products/Fashion/Accessories/9.RayBanBlack.png"
                                                                                alt="Live from space album cover"
                                                                            />
                                                                        </Grid>
                                                                        <Grid xs={1} display="flex" justifyContent="flex-start" alignItems="center">
                                                                            <IconButton onClick={(e) => deleteItemInCart(e, item)}>
                                                                                <CloseIcon fontSize="medium" />
                                                                            </IconButton>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Card>
                                                            </List>
                                                        </Box>
                                                    )) : ""}
                                                    <Divider />
                                                    <Box sx={{ marginBottom: '2em', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        {/* <ButtonsSimple processTransaction={processTransaction}/> */}
                                                        <Stack spacing={2} direction="row" width="90%">
                                                            <CustomButton onClick={e => navigateToCheckoutPage(e)}>Checkout Now ($ {listItemInCart.map(item => item.price * item.number).reduce((s1, s2) => s1 + s2, 0)})</CustomButton>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </SwipeableDrawer>
                                        </ClickAwayListener>
                                    </React.Fragment>
                                </Badge>



                            </Box>
                        </Toolbar>
                    </Container>
                    <Container maxWidth='lg' >
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
                            <Grid container display="flex" justifyContent="flex-start" alignItems="flex-start" xs={9}>
                                {productList.length ? productList.map(item => (
                                    <Grid xs={4} >
                                        {/* <Product product={product} addToCart={(e) => addToCart(e, product)} removeToCart={(e) => removeToCart(e, product)} /> */}
                                        <Card sx={{ maxWidth: 330, marginBottom: '2em', backgroundColor: '#fff', boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)', borderRadius: 3 }}>
                                            <CardHeader
                                                subheader="September 14, 2016"
                                            />
                                            <CardMedia
                                                component="img"
                                                height="230"
                                                image="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FAccessories%2F7.PoliceGrayEyeglasses.png&w=640&q=75"
                                                alt="Paella dish"
                                            />
                                            <CardContent>
                                                <Typography variant="body1" color="">
                                                    {item.name}
                                                </Typography>
                                                <HoverRating />

                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <Grid container xs={12} justifyContent="space-between"
                                                    flexDirection={{ xs: 'column', sm: 'row' }}>
                                                    <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
                                                        <Typography variant="body1" color="rgb(210, 63, 87)">
                                                            ${item.price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={9} display="flex" justifyContent="flex-end" alignItems="center">

                                                        {item.number && item.number > 0 ? (
                                                            <>
                                                                <IconButton onClick={(e) => removeToCart(e, item)}>
                                                                    <IndeterminateCheckBoxOutlinedIcon style={{ color: 'rgb(210, 63, 87)' }} />
                                                                </IconButton>

                                                                <Typography variant="body1" >
                                                                    {item.number}
                                                                </Typography>
                                                            </>
                                                        ) : ""}

                                                        <IconButton onClick={(e) => addToCart(e, item)}>
                                                            <AddBoxOutlinedIcon style={{ color: 'rgb(210, 63, 87)' }} />
                                                        </IconButton>
                                                    </Grid>

                                                </Grid>
                                            </CardActions>

                                        </Card>
                                    </Grid>)
                                ) : ""}

                            </Grid>

                        </Grid>

                    </Grid>
                </Container>

            </div>
        </div>
    );
}


const ButtonsSimple = (props) => {
    return (
        <Stack spacing={2} direction="row" width="90%">
            <CustomButton onClick={props.processTransaction}>Payment</CustomButton>
        </Stack>
    );
}

const blue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const CustomButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: rgb(210, 63, 87);
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  width: 100%;

  &:hover {
    background-color:rgb(210, 63, 87);
  }

  &.${buttonClasses.active} {
    background-color: rgb(210, 63, 87);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default TransactionHome;