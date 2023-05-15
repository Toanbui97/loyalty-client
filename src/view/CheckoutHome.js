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
import { Badge, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { HomeDropDown, PageDropDown, UserAccountDropDown } from '../component/transaction/DropDown';
import BootstrapButton from '../component/transaction/BootstrapButton';
import { CategoriesDropDown } from '../component/transaction/CategoriesDropDown';
import Product from '../component/transaction/Product';
import { display, Stack } from '@mui/system';
import LeftMenu from '../component/transaction/LeftMenu'
import CartDrawer from '../component/transaction/CartDrawer';
import { Button as Button1, buttonClasses } from '@mui/base';
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
import { useLocation, useNavigate } from "react-router";
import { orchestratrionTransaction } from '../service/TransactionService';
import { getCustomerVoucher } from '../service/VoucherService';
import SelectIntroduction, { DeliveryDateDropDown, DeliveryTimeDropDown } from '../component/checkout/DropDown';
import SelectForm from '../component/checkout/DropDown';
import { DeliveryAddressInput, EPointInput } from '../component/checkout/Input';
import SigninDialog from '../component/common/Signin';
import { signIn } from '../service/CMSService';

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

export default function CheckoutHome() {

    const location = useLocation();

    const { enqueueSnackbar } = useSnackbar();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [itemInCartNumber, setItemInCartNumber] = React.useState(0);
    const [listItem, setListItem] = React.useState(location.state.listItem);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [voucherList, setVoucherList] = React.useState([]);
    const [voucherApplyList, setVoucherApplyList] = React.useState([]);
    const [openVoucherDialog, setOpenVoucherDialog] = React.useState(false);
    const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false);
    const [pointUse, setPointUse] = React.useState(0);
    const navigate = useNavigate();
    const [customer, setCustomer] = React.useState(JSON.parse(localStorage.getItem("customer")), null);
    const [transactionRes, setTransactionRes] = React.useState(null);


    const handleClickOpenVoucherDialog = () => {
        setOpenVoucherDialog(true);
    };

    const handleCloseVoucherDialog = (value) => {
        setOpenVoucherDialog(false);
    };

    const handleClickOpenPaymentDialog = () => {
        setOpenPaymentDialog(true);
    };

    const handleCloseOpenPaymentDialog = (e, reason) => {
        if (reason === 'backdropClick') return;
        else {
            setOpenPaymentDialog(false);
            navigate("/");
        }
        // console.log(e);
        // console.log(reason);
        // setOpenPaymentDialog(false);
        // navigate("/");

    };

    const setOpenRightDrawer = (open) => (event) => {
        setOpenDrawer(open);
    };

    React.useEffect(() => {
        getCustomerVoucher()
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setVoucherList(data.dataList)
            })

        console.log(voucherList)
    }, [])


    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };

    const deleteItemInCart = (e, item) => {
        e.stopPropagation();
        e.preventDefault();
        let arr = [...listItem];
        if (item) {
            let index = arr.findIndex(e => e.code == item.code)
            arr.splice(index, 1)
        }
        setListItem(arr);
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
        console.log(listItem.length)
        if (listItem.find(e => e.code == product.code)) {
            listItem.forEach(e => {
                e.number = e.code == product.code ? e.number + 1 : e.number;
            })
        } else {
            product.number = 1;
            listItem.push(product)
        }

        setListItem(listItem);
        let totalNumber = listItem.map(e => e.number).reduce((s1, s2) => s1 + s2, 0);
        console.log(totalNumber)

        setItemInCartNumber(totalNumber);


        showNoti("Added to Cart", 'success');

    })

    const removeToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault()
        let item = listItem.find(e => e.code == product.code);

        if (item && item.number <= 1) {
            let copy = [...listItem];
            let index = listItem.findIndex(e => e.code == product.code)
            listItem.splice(index, 1)
        }

        if (item && item.number > 1) {
            item.number = item.number - 1;
        }

        setListItem(listItem);
        let number = listItem.map(e => e.number).reduce((s1, s2) => s1 + s2, 0);
        setItemInCartNumber(number);

        showNoti("Remove from Cart", 'error');
    }

    const payment = async () => {
        if (!customer) {
            showNoti("Need to login first", 'error');
            return;
        }
        const res = await orchestratrionTransaction(listItem, voucherList, pointUse);
        const data = await res.json();
        if (data.code === '20000000') {
            setOpenPaymentDialog(true);
            // showNoti(`Payment success`, 'success');
            setTransactionRes(data.data);
            setListItem([]);
            setOpenDrawer(false);
        }

        const signinRes = await signIn(customer.customerName);
        const signinData = await signinRes.json();
        if (signinData.code === '20000000') {
            localStorage.setItem("customer", JSON.stringify(signinData.data));
        }
    }



    const changeVoucherCheckbox = (e, voucher) => {
        if (e.target.checked) {
            voucherList.find(v => v.voucherCode == voucher.voucherCode).checked = true;
        } else {
            voucherList.find(v => v.voucherCode == voucher.voucherCode).checked = false;
        }
        setVoucherList(voucherList)
    }

    return (
        <div>
            <div style={{ backgroundColor: '#F6F9FC', height: '100%' }}>
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
                                {/* <Tooltip title="Open settings">
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
                                </Menu> */}
                                <SigninDialog setCustomer={setCustomer} />
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>

                                <Badge badgeContent={listItem.map(e => e.number).reduce((s1, s2) => s1 + s2, 0)} sx={{ color: 'rgb(210, 63, 87)' }} color="error">
                                    {/* <CartDrawer listItem={listItem} setlistItem={setlistItem} 
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
                                                                <Typography variant="body1"> {listItem.map(e => e.number).reduce((s1, s2) => s1 + s2, 0)} item</Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid xs={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
                                                            <CloseIcon fontSize="medium" />
                                                        </Grid>
                                                    </Grid>

                                                    {listItem && listItem.length ? listItem.map(item => (
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
                                                            {/* <CustomButton onClick={e => navigateToCheckoutPage(e)}>Checkout Now ($ {listItem.map(item => item.price * item.number).reduce((s1, s2) => s1 + s2, 0)})</CustomButton> */}
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

                <Container maxWidth="xl" height="100%" sx={{ marginTop: '4em' }} display="flex" flexDirection='row' justifyContent="space-between" >
                    <Grid container xs={12} display="flex" justifyContent="center" >
                        <Grid container xs={11} display="flex" flexDirection='row' justifyContent="space-between" >
                            <Grid container xs={7} display="flex" justifyContent="center" alignItems="center" >
                                <Box borderRadius={2} justifyContent="flex-start" alignItems="center" sx={{ marginBottom: '2em', backgroundColor: '#fff', width: '100%', boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)', padding: '0 2em 0 2em' }} >

                                    <Grid container xs={12} display="flex" paddingTop={3}>
                                        <Grid xs={1} display="flex" justifyContent="flex-end">
                                            <Avatar sx={{ bgcolor: 'rgb(210, 63, 87)' }}>1</Avatar>
                                        </Grid>
                                        <Grid xs={10} alignItems="flex-start">
                                            <Typography sx={{ ml: 2 }} variant="h6">Delivery Date and Time</Typography>
                                            <Stack direction="row" margin="1em" alignItems="center" gap={2}>

                                                <DeliveryDateDropDown />

                                                <DeliveryTimeDropDown />
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                </Box>

                                <Box borderRadius={2} display="flex" justifyContent="flex-start" alignItems="center" sx={{ marginBottom: '2em', backgroundColor: '#fff', width: '100%', boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)', padding: '0 2em 0 2em' }} >
                                    <Grid container xs={12} display="flex" paddingTop={3}>
                                        <Grid xs={1} display="flex" justifyContent="flex-end">
                                            <Avatar sx={{ bgcolor: 'rgb(210, 63, 87)' }}>2</Avatar>
                                        </Grid>
                                        <Grid xs={10} alignItems="flex-start">
                                            <Typography sx={{ ml: 2 }} variant="h6">Delivery Address</Typography>
                                            <Stack direction="row" margin="1em" display="flex" alignItems="center">
                                                <DeliveryAddressInput sx={{ width: '100%' }} />
                                            </Stack>
                                            <Grid sx={{ ml: 2 }} container xs={12} display="flex" justifyContent="flex-start" >

                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box borderRadius={2} justifyContent="flex-start" alignItems="center" sx={{ marginBottom: '2em', backgroundColor: '#fff', width: '100%', boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)', padding: '0 2em 0 2em' }} >

                                    <Grid container xs={12} display="flex" paddingTop={3}>
                                        <Grid xs={1} display="flex" justifyContent="flex-end">
                                            <Avatar sx={{ bgcolor: 'rgb(210, 63, 87)' }}>3</Avatar>
                                        </Grid>
                                        <Grid xs={10} alignItems="flex-start" >
                                            <Typography sx={{ ml: 2 }} variant="h6">Discount</Typography>
                                            <Stack direction="row" margin="1em" display="flex" alignItems="flex-start">
                                                <VoucherButton variant="text" onClick={handleClickOpenVoucherDialog} > Click to apply voucher</VoucherButton>
                                                <Dialog fullWidth="md" onClose={handleCloseVoucherDialog} open={openVoucherDialog}>
                                                    <DialogTitle sx={{ color: 'rgb(210, 63, 87)' }}>Choose voucher</DialogTitle>
                                                    <Divider />
                                                    <List sx={{ pt: 0 }}>
                                                        {!voucherList.length ? "" : (voucherList.map((voucher) => (
                                                            <div>
                                                                <ListItem >

                                                                    <Stack spacing={2} width="90%">
                                                                        <Typography variant="body1">{voucher.voucherName}</Typography>
                                                                        <Typography variant="body2">
                                                                            {voucher.description}
                                                                        </Typography>
                                                                    </Stack>
                                                                    <Stack>
                                                                        <Stack width="10%" display="flex" alignItems="center" justifyContent="flex-end" justifyItems="flex-end">
                                                                            <Checkbox
                                                                                checked={voucher.checked}
                                                                                // onClick={(e) => changeVoucherCheckbox(e, voucher)}
                                                                                onChange={(e) => changeVoucherCheckbox(e, voucher)}
                                                                                sx={{
                                                                                    color: 'rgb(210, 63, 87)', '&.Mui-checked': { color: 'rgb(210, 63, 87)' }
                                                                                }}></Checkbox>
                                                                        </Stack>
                                                                    </Stack>
                                                                </ListItem>
                                                                <Divider />
                                                            </div>
                                                        )))}

                                                    </List>
                                                </Dialog>
                                            </Stack>


                                            <Divider />
                                            <Grid sx={{ ml: 1 }} columnSpacing={2} container xs={12} display="flex" justifyContent="flex-start" justifyItems="flex-start" >
                                                {!voucherList.length ? "" : voucherList.map(voucher => (
                                                    !voucher.checked ? "" : (
                                                        <Grid xs="3">
                                                            <Box sx={{
                                                                m: 1
                                                                // , color: 'rgb(210, 63, 87)' 
                                                            }}>{voucher.voucherName} </Box>
                                                        </Grid>
                                                    )
                                                ))}
                                            </Grid>

                                            <Stack direction="row" margin="1em" alignItems="flex-start">
                                                <Stack direction="row" display="flex" alignItems="center" gap={4}>
                                                    <Typography>Current point: {JSON.parse(localStorage.getItem("customer"))?.epoint}</Typography>
                                                    <EPointInput placeholder="1 point = 10vnd" onChange={(e) => setPointUse(e.target.value)} />
                                                </Stack >
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                </Box>

                                <Box borderRadius={2} display="flex" justifyContent="flex-start" alignItems="center" sx={{ marginBottom: '2em', width: '100%', padding: '0 2em 0 2em' }} >
                                    <Grid container xs={12} paddingTop={3} direction="row">
                                        {/* <Grid xs={1} display="flex" justifyContent="flex-end">
                                            <Avatar sx={{ bgcolor: 'rgb(210, 63, 87)' }}>4</Avatar>
                                        </Grid>
                                        <Grid xs={10} alignItems="flex-start">
                                            <Typography sx={{ ml: 2 }} variant="h6"> Payment Details</Typography>
                                            <Stack direction="row" margin="1em" display="flex" alignItems="center">
                                                <Typography variant="body1"> Voucher</Typography>
                                            </Stack>
                                        </Grid> */}
                                        <Grid xs={12} display="flex" direction="row" alignItems="center" w>
                                            <CustomButton onClick={payment}>Checkout Now </CustomButton>
                                        </Grid>
                                    </Grid>
                                </Box>


                            </Grid>
                            <Grid container xs={5} display="flex" justifyContent="center">
                                <Box role="presentation" borderRadius={3} sx={{ width: '100%', padding: '0 2em 0 2em' }} >
                                    <Stack direction="row" width="100%"><Typography variant="h6">Your order</Typography></Stack>
                                    <Divider />
                                    {listItem.map(item => (
                                        <Grid container xs={12} direction="row" sx={{ marginTop: '1em' }}>
                                            <Grid xs={7}>
                                                <Typography variant="subtitle2"> {item.number} x {item.name}</Typography>
                                            </Grid>
                                            <Grid xs={5} display="flex" alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                                                <Typography variant="subtitle2" justifyItems="flex-end">${item.number * item.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    <Divider />

                                    <Grid container xs={12} direction="row" sx={{ marginTop: '1em' }}>
                                        <Grid xs={6}>
                                            <Typography variant="subtitle2"> Subtotal: </Typography>
                                        </Grid>
                                        <Grid xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                                            <Typography variant="subtitle2" justifyItems="flex-end">${listItem.map(item => item.number * item.price).reduce((s1, s2) => s1 + s2, 0)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} direction="row" sx={{ marginTop: '1em' }}>
                                        <Grid xs={6}>
                                            <Typography variant="subtitle2"> Shipping: </Typography>
                                        </Grid>
                                        <Grid xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                                            <Typography variant="subtitle2" justifyItems="flex-end">-</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} direction="row" sx={{ marginTop: '1em' }}>
                                        <Grid xs={6}>
                                            <Typography variant="subtitle2"> Tax: </Typography>
                                        </Grid>
                                        <Grid xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                                            <Typography variant="subtitle2" justifyItems="flex-end">-</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} direction="row" sx={{ marginTop: '1em' }}>
                                        <Grid xs={6}>
                                            <Typography variant="subtitle2"> Discount:  </Typography>
                                        </Grid>
                                        <Grid xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                                            <Typography variant="subtitle2" justifyItems="flex-end">${(listItem.map(item => item.number * item.price).reduce((s1, s2) => s1 + s2, 0)
                                                * (voucherList.filter(v => v.checked).map(v => v.discountPercent).reduce((v1, v2) => v1 + v2, 0)) / 100 + pointUse * 10).toFixed(2)}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Divider />
                                    <Grid container xs={12} direction="row" sx={{ marginTop: '1em' }}>
                                        <Grid xs={6}>
                                            <Typography variant="subtitle2"> Total: </Typography>
                                        </Grid>
                                        <Grid xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                                            <Typography variant="subtitle2" justifyItems="flex-end">${(listItem.map(item => item.number * item.price).reduce((s1, s2) => s1 + s2, 0) -
                                                (listItem.map(item => item.number * item.price).reduce((s1, s2) => s1 + s2, 0)
                                                    * (voucherList.filter(v => v.checked).map(v => v.discountPercent).reduce((v1, v2) => v1 + v2, 0)) / 100)).toFixed(2)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <React.Fragment>
                    <Dialog
                        open={openPaymentDialog}
                        onClose={handleCloseOpenPaymentDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="md"
                        keepMounted

                    >
                        <DialogTitle id="alert-dialog-title" sx={{ color: 'rgb(210, 63, 87)' }}>
                            {"Payment information"}
                        </DialogTitle>
                        <Grid container xs={12} display='flex' padding='0 20px 0 20px' alignItems="center" alignContent="center">
                            <Grid container xs={6} alignItems="center" alignContent="center" justifyContent="center">
                                {/* <Grid xs={6}>
                                        <Typography sx={{ marginBottom: '1em' }}>Customer </Typography>
                                        <Typography sx={{ marginBottom: '1em' }}>Transaction value </Typography>
                                        <Typography sx={{ display: 'inline' }}>Transaction time </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography sx={{ marginBottom: '1em' }}>{transactionRes?.customerCode}</Typography>
                                        <Typography sx={{ marginBottom: '1em' }}>{transactionRes?.transactionValue}</Typography>
                                        <Typography sx={{ display: 'inline' }}>{transactionRes?.transactionTime}</Typography>
                                    </Grid> */}
                                <Stack direction="row" sx={{ marginBottom: '1em' }} display="flex" alignItems="center" alignContent="center" width='100%' fullWidth="true">
                                    <Typography>Customer: {transactionRes?.customerCode}</Typography>
                                </Stack>
                                <Stack direction="row" sx={{ marginBottom: '1em' }} width='100%' fullWidth="true">
                                    <Typography>Transaction value: {transactionRes?.transactionValue}</Typography>
                                </Stack>
                                <Stack direction="row" width='100%' fullWidth="true">
                                    <Typography sx={{ display: 'inline' }}>Transaction time: {transactionRes?.transactionTime}</Typography>
                                </Stack>
                            </Grid>

                            <Grid container xs={6} >
                                {/* <Grid xs={6}>
                                        <Typography sx={{ marginBottom: '1em' }}>Rpoint gain</Typography>
                                        <Typography sx={{ marginBottom: '1em' }}>Epoint gain</Typography>
                                        <Typography>Epoint spend</Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography sx={{ marginBottom: '1em' }}>{transactionRes?.rpointGain}</Typography>
                                        <Typography sx={{ marginBottom: '1em' }}>{transactionRes?.epointGain}</Typography>
                                        <Typography>{transactionRes?.epointSpend}</Typography>
                                    </Grid> */}
                                <Stack direction="row" sx={{ marginBottom: '1em' }} width='100%' fullWidth="true">
                                    <Typography>Epoint gain: {transactionRes?.epointGain}</Typography>
                                </Stack>
                                <Stack direction="row" sx={{ marginBottom: '1em' }} width='100%' fullWidth="true">
                                    <Typography>Rpoint gain: {transactionRes?.rpointGain}</Typography>
                                </Stack>
                                <Stack direction="row" width='100%' fullWidth="true">
                                    <Typography sx={{ display: 'inline' }}>Epoint spend: {transactionRes?.epointSpend}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleCloseOpenPaymentDialog}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
        </div>
    )
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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

const VoucherButton = styled(Button1)`
  text-align: start;
  font-size: 0.875rem;
  border-radius: 12px;
  color: rgb(210, 63, 87);
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  width: 100%;
  background: none;
`;