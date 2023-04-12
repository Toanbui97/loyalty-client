import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, FormControl, Grid, Input, InputLabel} from '@mui/material';
import { updateRank } from '../../service/CMSService';
import useAlert from '../../context/UseAler';
import { updateVoucherInfo } from '../../service/VoucherService';

export default function VoucherDetailDialog(props) {

    const [isDetail, setIsDetail] = React.useState(true);
    const {setAlert} = useAlert();
    const data = props.data;
    const changeToUpdate = () => {
        setIsDetail(!isDetail);
    }

    const handleCancel = () => {
        setIsDetail(true);
        props.handleClose();
    }

    const hanldeUpdate = (e) => {
        e.preventDefault();
        updateVoucherInfo(data)
            .then(res => res.json())
            .then(data => {
                setAlert(data);
                props.handleClose()
            })
    }

    return (

        <div>
                <Dialog open={props.open} onClose={handleCancel} fullWidth={true} maxWidth={'lg'}>
                {console.log(props.data)}
                {props.data == null ? <CircularProgress /> : ( <div>
                    <DialogTitle>{isDetail ? 'Voucher detail' : 'Voucher update'}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4} >

                            <Grid item xs={6}>
                                <FormControl disabled={true} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankCode">Voucher code</InputLabel>
                                    <Input id="rankCode" defaultValue={props.data.voucherCode} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankName">Voucher name</InputLabel>
                                    <Input id="rankName" defaultValue={props.data.voucherName} onChange={e => data.voucherName = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="requirePoint">Description</InputLabel>
                                    <Input id="requirePoint" defaultValue={props.data.description} onChange={e => data.description = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rpoint">Total voucher</InputLabel>
                                    <Input id="keepPoint" defaultValue={props.data.totalVoucher} onChange={e => data.totalVoucher = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rpoint">Discount percent</InputLabel>
                                    <Input id="keepPoint" defaultValue={props.data.discountPercent} onChange={e => data.discountPercent = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rpoint">Price</InputLabel>
                                    <Input id="keepPoint" defaultValue={props.data.price} onChange={e => data.price = e.target.value} />
                                </FormControl>
                            </Grid>
                            {!isDetail ? (<Grid item xs={12}><Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={e => hanldeUpdate(e)}
                            >
                                Confirm
                            </Button></Grid>) : ""}
                        </Grid>
                        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={changeToUpdate}>{isDetail ? 'Update' : 'Detail'}</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                    
                    </div>)}
                </Dialog>
            
        
        </div>
    );
}