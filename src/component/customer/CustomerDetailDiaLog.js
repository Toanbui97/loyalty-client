import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getCustomerDetail, updateCustomer } from '../../service/CMSService';
import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import useAlert from "../../context/UseAler"

export default function CustomerDetailDiaLog(props) {

  const [isDetail, setIsDetail] = React.useState(true);
  const customer = props.customer;
  const {setAlert} = useAlert();

  const changeToUpdate = () => {
    setIsDetail(!isDetail);
  }

  const handleCancel = () => {
    setIsDetail(true);
    props.handleClose();
  }

  const handleUpdateCustomer = () => {
    updateCustomer(customer)
    .then(res => res.json())
    .then(data => {
      // props.setAlertOpen(true);
      // props.setAlertData(data);
      setIsDetail(!isDetail);
      props.handleClose()
      setAlert(data)
    })
  }

  return (
      <Dialog open={props.open} onClose={handleCancel} fullWidth={true} maxWidth={'lg'}>
        {props.customer == null ? <CircularProgress /> : (
          <div>
          <DialogTitle>{isDetail ? 'Customer detail' : 'Customer update'}</DialogTitle>
          <DialogContent>

            <Grid container spacing={4} >
              <Grid item xs={6}>
                <FormControl disabled={true} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="customerCode">Customer code</InputLabel>
                  <Input id="customerCode" defaultValue={props.customer.customerCode} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="customerName">Customer name</InputLabel>
                  <Input id="customerName" defaultValue={props.customer.customerName} onChange={e => customer.customerName = e.target.value} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="epoint">EPoint</InputLabel>
                  <Input id="epoint" defaultValue={props.customer.epoint} onChange={e => customer.epoint = e.target.value} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="rpoint">Rpoint</InputLabel>
                  <Input id="rpoint" defaultValue={props.customer.rpoint} onChange={e => customer.rpoint = e.target.value} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="component-simple">Voucher number</InputLabel>
                  <Input id="activeVoucher" defaultValue={props.customer.activeVoucher} onChange={e => customer.activeVoucher = e.target.value} />
                </FormControl>
              </Grid>
             
              <Grid item xs={6}>
                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="component-simple">Rank</InputLabel>
                  <Input id="rankCode" defaultValue={props.customer.rankCode} onChange={e => customer.rankCode = e.target.value} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled={isDetail} variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="component-simple">Rank expire time</InputLabel>
                  <Input id="rankExpired" defaultValue={props.customer.rankExpired} onChange={e => customer.rankExpired = e.target.value} />
                </FormControl>
              </Grid>
              

              {!isDetail ? (<Grid item xs={12}><Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdateCustomer}
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
          </div>
        )}
      </Dialog>
  );
}