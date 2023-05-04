import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, FormControl, Grid, Input, InputLabel} from '@mui/material';
import { createOrUpdateMData, createRank, updateRank } from '../../service/CMSService';
import useAlert from '../../context/UseAler';
import { createVoucherInfo, updateVoucherInfo } from '../../service/VoucherService';
import { useSnackbar } from 'notistack';

export default function MDataAddDialog(props) {

    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };

    const mdata = {};

    const handleCancel = () => {
        props.handleClose();
    }

    const handleAdd = (e) => {
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
                <div>
                    <DialogTitle>Add new</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4} >

                        <Grid item xs={6}>
                                <FormControl  variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="key">Key</InputLabel>
                                    <Input id="key" onChange={e => mdata.key = e.target.value} />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={6}>
                                <FormControl  variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankName">Value</InputLabel>
                                    <Input id="rankName" onChange={e => mdata.value = e.target.value} />
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