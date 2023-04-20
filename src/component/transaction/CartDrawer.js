import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ClickAwayListener } from '@mui/base';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Stack } from '@mui/system';
import CartProduct from './CartProduct';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';


export default function CartDrawer(props) {

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const setOpenRightDrawer = (open) => (event) => {
        setOpenDrawer(open);
    };


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
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%'}}>
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

                            { props.listItemInCart && props.listItemInCart.length ?  props.listItemInCart.map(item => (
                                <Box
                                    sx={{ width: 420, padding: '1em' }}
                                    role="presentation"
                                >
                                    <Divider />
                                    <List>
                                        <CartProduct 
                                            listItemInCart={props.listItemInCart} 
                                            setListItemInCart={props.setListItemInCart} 
                                            item={item} addToCart={(e) => props.addToCart(e, item)} removeToCart={(e) => props.removeToCart(e, item)} 
                                        />
                                    </List>
                                </Box>
                            )) : ""}

                            <Box sx={{ marginBottom: '2em', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}><UnstyledButtonsSimple /></Box>
                            
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