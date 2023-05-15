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
import { orchestrationVoucher, orchestratrionTransaction } from '../service/TransactionService';
import { getVoucherList } from '../service/VoucherService';
import { useNavigate } from "react-router-dom";
import SigninDialog from '../component/common/Signin';
import { getRankList } from '../service/CMSService';
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

function VoucherHome() {
    const { enqueueSnackbar } = useSnackbar();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [itemInCartNumber, setItemInCartNumber] = React.useState(0);
    const [listItemInCart, setListItemInCart] = React.useState([]);
    const [voucherList, setVoucherList] = React.useState([]);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [rankRequireList, setRankRequireList] = React.useState([]);
    const [epoint, setEpoint] = React.useState(localStorage.getItem("customer") ? localStorage.getItem("customer").epoint : 0);
    const navigate = useNavigate();

    React.useEffect(() => {
        getVoucherList(0, 100000).then(res => res.json()).then(payload => {
            console.log(payload)
            setVoucherList(payload.dataList);
            console.log(voucherList);
        });

        getRankList().then(res => res.json())
        .then(data => {
            let rankList = data.dataList;
            let currentRank = JSON.parse(localStorage.getItem("customer")).rankCode;
            let currentIndex = rankList.findIndex(r => r.rankCode === currentRank);
            setRankRequireList(rankList.slice(currentIndex).map(r => r.rankCode));
        })
    }, [])

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

    const saveVoucher = (e, voucher) => {

        if (!localStorage.getItem('customer')) {
            showNoti("Need to login first", 'error');
            return;
        }

        e.stopPropagation();
        e.preventDefault();
        orchestrationVoucher(voucher)
        .then(res => res.json())
        .then(payload => {
            if (payload.code === '20000000') {
                showNoti(`Saved voucher ${voucher.voucherName}`, 'success');
                let customer = JSON.parse(localStorage.getItem("customer"));
                customer.epoint = customer.epoint - voucher.price;
                localStorage.setItem("customer", JSON.stringify(customer))
            } else {
                showNoti(`Voucher not saved`, 'error');
            }
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
                                <SigninDialog />
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
                                {voucherList.length ? voucherList.map(item => (
                                    <Grid xs={6} >
                                        {/* <Product product={product} addToCart={(e) => addToCart(e, product)} removeToCart={(e) => removeToCart(e, product)} /> */}
                                        <Card sx={{ display: 'flex', alignItems: 'center', maxWidth: 450, marginBottom: '2em', backgroundColor: '#fff', boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)', borderRadius: 3 }}>
                                            <CardHeader/>
                                            <CardMedia
                                                component="img"
                                                sx={{width: "auto", height: "fit-content"}}
                                                image={item.imageSource ? item.imageSource : 'https://down-vn.img.susercontent.com/file/vn-50009109-617cd6a9a2ac58f043ec6215c9f7feb3'}
                                                alt="Paella dish"
                                            />
                                            <CardContent>
                                                <Typography variant="body1" color="">
                                                    {item.voucherName}
                                                </Typography>
                                                <Typography variant="body2" color="">
                                                    {item.description}
                                                </Typography>
                                                <Typography variant="body2" color="">
                                                    Rank require: {item.rankRequire}
                                                </Typography>
                                                <Typography variant="body2" color="">
                                                    Price: {item.price}
                                                </Typography>
                                                <SaveVoucherButton disabled={item.rankRequire != 'NONE' && !rankRequireList.includes(item.rankRequire)}
                                                 onClick={(e) => {saveVoucher(e, item)}}>Save</SaveVoucherButton>
                                            </CardContent>

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

const SaveVoucherButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.7rem;
  background-color: rgb(210, 63, 87);
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  width: 100%;
  margin-top: 1em;

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

export default VoucherHome;