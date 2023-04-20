import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useSnackbar } from 'notistack';

export default function CartProduct(props) {

    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };

    const handleClickAdd = (e) => {
        e.stopPropagation();
        showNoti("Added to Cart" , 'success');
        props.addToCart(e);
        // setCurrentNumber(currentNumber + 1);
    }

    const handleClickMinus = (e) => {
        e.stopPropagation();
        showNoti("Remove from Cart", 'error');
        props.removeToCart(e);
        // setCurrentNumber(currentNumber - 1);
    }

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
        <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Grid xs={12}
                container
                flexDirection={{ xs: 'column', sm: 'row' }}
            // sx={{ fontSize: '10px', margin: '3em 0 3em 0', padding: '0 1em 0 1em' }}
            >
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center" flexDirection='column' gap={1}>
                    <IconButton><AddCircleOutlineOutlinedIcon onClick={(e) => handleClickAdd(e)} color='success'/></IconButton>
                    <Typography >{props.item.number}</Typography>
                    <IconButton><RemoveCircleOutlineOutlinedIcon onClick={e => handleClickMinus(e)} sx={{color: 'rgb(210, 63, 87)'}}/></IconButton>
                    {/* <CloseIcon fontSize="medium" /> */}
                </Grid>

                <Grid xs={7} display="flex" justifyContent="flex-start" alignItems="flex-start">
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="body1">
                            {props.item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.item.code}
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
                    <CloseIcon  fontSize="medium" />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    );
}