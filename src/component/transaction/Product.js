import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HoverRating from './HoverRating';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';


export default function Product(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [currentNumber, setCurrentNumber] = React.useState(0);

    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };

    const handleClickAdd = (e) => {

        showNoti("Added to Cart" , 'success');
        props.addToCart(e);
        setCurrentNumber(currentNumber + 1);
    }

    const handleClickMinus = (e) => {
        showNoti("Remove from Cart", 'error');
        props.removeToCart(e);
        setCurrentNumber(currentNumber - 1);
    }

    return (
        <Card sx={{ maxWidth: 330, marginBottom: '2em', backgroundColor:'#fff', boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)', borderRadius:3 }}>
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
                    {props.product.name}
                </Typography>
                <HoverRating />

            </CardContent>
            <CardActions disableSpacing>
                <Grid container xs={12} justifyContent="space-between"
                    flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="body1" color="rgb(210, 63, 87)">
                            ${props.product.price}
                        </Typography>
                    </Grid>
                    <Grid xs={9} display="flex" justifyContent="flex-end" alignItems="center">

                        {currentNumber > 0 ? (
                            <>
                                <IconButton onClick={(e) => handleClickMinus(e)}>
                                    <IndeterminateCheckBoxOutlinedIcon style={{ color: 'rgb(210, 63, 87)' }} />
                                </IconButton>

                                <Typography variant="body1" >
                                    {currentNumber}
                                </Typography>
                            </>
                        ) : ""}

                        <IconButton onClick={(e) => handleClickAdd(e)}>
                            <AddBoxOutlinedIcon style={{ color: 'rgb(210, 63, 87)' }} />
                        </IconButton>
                    </Grid>

                </Grid>
            </CardActions>

        </Card>
    );
}