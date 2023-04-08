import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getCustomerDetail } from '../../service/CMSService';
import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function CustomerDetailDiaLog(props) {

    return (
       
        <div>
            {props.customer == null ? <CircularProgress /> : (
                <Dialog open={props.open} onClose={props.handleClose} fullWidth={'xl'} maxWidth={'xl'}>
                    <DialogTitle>{props.customer.customerName}</DialogTitle>
                    <DialogContent>
                        <Box>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={6}>
                             <FormControl variant="standard"  fullWidth="true">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl>
      </Grid>
      
      <Grid xs={6}> 
      <FormControl variant="standard" fullWidth="true">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl>
      </Grid>
      </Grid>
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
                </Box>
                   
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            )}
            
        </div>
    );
}