import * as React from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle, Dialog, Snackbar } from '@mui/material';

import useAlert from '../../context/UseAler.js';

const AlertPopup = () => {
    const renderAfterCalled = React.useRef(false);

    const { data } = useAlert();
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        if (!renderAfterCalled.current) {
            if (data) {
                setOpen(true)
                console.log(open)
            }
        }

        renderAfterCalled.current = true;
        
    })

    const handleClose = (event, reason) => {
        setOpen(false);
        console.log(open)
        if (data.code == "20000000") {
            window.location.reload(true)
        }
        
        
    }
  
    return (
         data == null ? "" : (
            <Snackbar autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                open={open}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={data.code == '20000000' ? 'success' : 'error'} sx={{ width: '100%' }}>

                    {data.code == '20000000' ? 'Success' : data.message + " : " + (data.errorMessage != null ? data.errorMessage : data.details)}
                </Alert>
            </Snackbar >
        )
        
      
    );
};

export default AlertPopup;