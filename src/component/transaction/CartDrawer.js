import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ClickAwayListener } from '@mui/base';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Stack } from '@mui/system';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function CartDrawer(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [openDrawer, setOpenDrawer] = React.useState(false);
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
        let arr = [...props.listItemInCart];
        if (item) {
            let index = arr.findIndex(e => e.code == item.code)
            arr.splice(index, 1)
        }
        props.setListItemInCart(arr);
        showNoti("Remove from Cart", 'error');
    }


    return (
        <div>
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
                                        <Typography variant="body1"> {props.listItemInCart.map(e => e.number).reduce((s1, s2) => s1 + s2, 0)} item</Typography>
                                    </Stack>
                                </Grid>
                                <Grid xs={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
                                    <CloseIcon fontSize="medium" />
                                </Grid>
                            </Grid>

                            {props.listItemInCart && props.listItemInCart.length ? props.listItemInCart.map(item => (
                                <Box
                                    sx={{ width: 420, padding: '1em' }}
                                    role="presentation"
                                >
                                    <Divider />
                                    <List>
                                        {/* <CartProduct 
                                            listItemInCart={props.listItemInCart} 
                                            setListItemInCart={props.setListItemInCart} 
                                            item={item} addToCart={(e) => props.addToCart(e, item)} removeToCart={(e) => props.removeToCart(e, item)} 
                                        /> */}
                                        <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Grid xs={12}
                                                container
                                                flexDirection={{ xs: 'column', sm: 'row' }}
                                            // sx={{ fontSize: '10px', margin: '3em 0 3em 0', padding: '0 1em 0 1em' }}
                                            >
                                                <Grid xs={1} display="flex" justifyContent="center" alignItems="center" flexDirection='column' gap={1}>
                                                    <IconButton><AddCircleOutlineOutlinedIcon onClick={(e) => props.addToCart(e, item)} color='success' /></IconButton>
                                                    <Typography >{item.number}</Typography>
                                                    <IconButton><RemoveCircleOutlineOutlinedIcon onClick={e => props.removeToCart(e, item)} sx={{ color: 'rgb(210, 63, 87)' }} /></IconButton>
                                                    {/* <CloseIcon fontSize="medium" /> */}
                                                </Grid>

                                                <Grid xs={7} display="flex" justifyContent="flex-start" alignItems="flex-start">
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="body1">
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                                            {item.code}
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
                                                    <IconButton onClick={(e) => deleteItemInCart(e, props.item)}>
                                                        <CloseIcon fontSize="medium" />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </List>
                                </Box>
                            )) : ""}
                            <Box sx={{ marginBottom: '2em', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}><UnstyledButtonsSimple /></Box>
                        </Box>
                    </SwipeableDrawer>
                </ClickAwayListener>
            </React.Fragment>
        </div>
    );
}

const UnstyledButtonsSimple = () => {
    return (
        <Stack spacing={2} direction="row" width="90%">
            <CustomButton>Payment</CustomButton>
        </Stack>
    );
}

const blue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const CustomButton = styled(ButtonUnstyled)`
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

  &.${buttonUnstyledClasses.active} {
    background-color: rgb(210, 63, 87);
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;