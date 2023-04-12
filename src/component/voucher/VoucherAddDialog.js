import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, FormControl, Grid, Input, InputLabel} from '@mui/material';
import { updateRank } from '../../service/CMSService';
import useAlert from '../../context/UseAler';
import { createVoucherInfo, updateVoucherInfo } from '../../service/VoucherService';

export default function VoucherAddDialog(props) {

    const {setAlert} = useAlert();
    const data = {};

    const handleCancel = () => {
        props.handleClose();
    }

    const handleAdd = (e) => {
        e.preventDefault();
        createVoucherInfo(data)
            .then(res => res.json())
            .then(data => {
                setAlert(data);
                props.handleClose()
            })
    }

    return (

        <div>
                <Dialog open={props.open} onClose={handleCancel} fullWidth={true} maxWidth={'lg'}>
                <div>
                    <DialogTitle>Add new</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4} >
                            
                            <Grid item xs={6}>
                                <FormControl  variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="voucherName">Voucher name</InputLabel>
                                    <Input id="voucherName" onChange={e => data.voucherName = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl  variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="description">Description</InputLabel>
                                    <Input id="description"  onChange={e => data.description = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rpototalVoucherint">Total voucher</InputLabel>
                                    <Input id="totalVoucher" onChange={e => data.totalVoucher = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="discountPercent">Discount percent</InputLabel>
                                    <Input id="discountPercent"  onChange={e => data.discountPercent = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="price">Price</InputLabel>
                                    <Input id="price" onChange={e => data.price = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}><Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={e => handleAdd(e)}
                            >
                                Confirm
                            </Button></Grid>
                        </Grid>
                        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                    
                    </div>
                </Dialog>
            
        
        </div>
    );
}