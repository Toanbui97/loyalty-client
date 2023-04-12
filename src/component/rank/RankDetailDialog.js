import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, FormControl, Grid, Input, InputLabel} from '@mui/material';
import { updateRank } from '../../service/CMSService';
import useAlert from '../../context/UseAler';

export default function RankDetailDiaLog(props) {

    const [isDetail, setIsDetail] = React.useState(true);
    const {setAlert} = useAlert();
    const rank = props.rank;
    const changeToUpdate = () => {
        setIsDetail(!isDetail);
    }

    const handleCancel = () => {
        setIsDetail(true);
        props.handleClose();
    }

    const hanldeUpdateRank = (e) => {
        e.preventDefault();
        updateRank(rank)
            .then(res => res.json())
            .then(data => {
                setAlert(data);
                props.handleClose()
            })
    }

    return (

        <div>
                <Dialog open={props.open} onClose={handleCancel} fullWidth={true} maxWidth={'lg'}>
                
                {props.rank == null ? <CircularProgress /> : ( <div>
                    <DialogTitle>{isDetail ? 'Rank detail' : 'Rank update'}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4} >

                            <Grid item xs={6}>
                                <FormControl disabled={true} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankCode">Rank code</InputLabel>
                                    <Input id="rankCode" defaultValue={props.rank.rankCode} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rankName">Rank name</InputLabel>
                                    <Input id="rankName" defaultValue={props.rank.rankName} onChange={e => rank.rankName = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="requirePoint">Require Point</InputLabel>
                                    <Input id="requirePoint" defaultValue={props.rank.requirePoint} onChange={e => rank.requirePoint = e.target.value} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="rpoint">Keep point</InputLabel>
                                    <Input id="keepPoint" defaultValue={props.rank.keepPoint} onChange={e => rank.keepPoint = e.target.value} />
                                </FormControl>
                            </Grid>

                            {!isDetail ? (<Grid item xs={12}><Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={e => hanldeUpdateRank(e)}
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