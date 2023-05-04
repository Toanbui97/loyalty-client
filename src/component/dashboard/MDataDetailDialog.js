import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { createOrUpdateMData, updateRank } from '../../service/CMSService';
import useAlert from '../../context/UseAler';
import { useSnackbar } from 'notistack';

export default function MDataDetailDialog(props) {

    const [isDetail, setIsDetail] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };


    const mdata = props.mdata;
    const changeToUpdate = () => {
        setIsDetail(!isDetail);
    }


    const handleCancel = () => {
        setIsDetail(true);
        props.handleClose();
    }

    const hanldeUpdateMData = (e) => {
        e.preventDefault();
        createOrUpdateMData(mdata)
            .then(res => res.json())
            .then(data => {
                if (data.code === '20000000') {
                    showNoti('Updated', 'success')
                } else {
                    showNoti('Failed', 'error')

                }
            })
    }

    return (

        <div>
            <Dialog open={props.open} onClose={handleCancel} fullWidth={true} maxWidth={'lg'}>

                {props.mdata == null ? <CircularProgress /> : (<div>
                    <DialogTitle>{isDetail ? 'Master data detail' : 'Master data update'}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4} >

                            <Grid item xs={6}>
                                <FormControl disabled={true} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankCode">Key</InputLabel>
                                    <Input id="rankCode" defaultValue={props.mdata.key} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankName">Value</InputLabel>
                                    <Input id="rankName" defaultValue={props.mdata.value} onChange={e => mdata.value = e.target.value} />
                                </FormControl>
                            </Grid>

                            {!isDetail ? (<Grid item xs={12}><Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={e => hanldeUpdateMData(e)}
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