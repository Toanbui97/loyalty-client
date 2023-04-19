import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HoverRating from './HoverRating';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { SnackbarProvider, useSnackbar } from 'notistack';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Product(props) {
    const [expanded, setExpanded] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [currentNumber, setCurrentNumber] = React.useState(0);

    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickAdd = (e) => {

        showNoti("Added to Cart" , 'success');
        props.addToCart();
        setCurrentNumber(currentNumber + 1);
    }

    const handleClickMinus = (e) => {
        showNoti("Remove from Cart", 'error');
        props.removeToCart();
        setCurrentNumber(currentNumber - 1);
    }

    return (
        <Card sx={{ maxWidth: 345, marginBottom: '2em', backgroundColor:'#fff' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FAccessories%2F7.PoliceGrayEyeglasses.png&w=640&q=75"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6" color="">
                    Police Gray Eyeglasse
                </Typography>
                <HoverRating />


            </CardContent>
            <CardActions disableSpacing>
                <Grid container xs={12} justifyContent="space-between"
                    flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="body1" color="red">
                            $187.00
                        </Typography>
                    </Grid>
                    <Grid xs={9} display="flex" justifyContent="flex-end" alignItems="center">

                        {currentNumber > 0 ? (
                            <>
                                <IconButton onClick={handleClickMinus}>
                                    <IndeterminateCheckBoxOutlinedIcon style={{ color: 'red' }} />
                                </IconButton>

                                <Typography variant="body1" >
                                    {currentNumber}
                                </Typography>
                            </>
                        ) : ""}

                        <IconButton onClick={handleClickAdd}>
                            <AddBoxOutlinedIcon style={{ color: 'red' }} />
                        </IconButton>
                    </Grid>

                </Grid>
            </CardActions>

        </Card>
    );
}