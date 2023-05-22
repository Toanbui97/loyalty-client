import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '../component/common/AppBar'
import Drawer from '../component/common/Drawer';
import Copyright from '../component/common/Copyright';
import { mainListItems, secondaryListItems } from '../component/common/MenuList';
import Common from '../component/common/Common';
import { executeEpointJob, executeRpointJob, getMDataList } from '../service/CMSService';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MDataDetailDialog from '../component/dashboard/MDataDetailDialog';
import MDataAddDialog from '../component/dashboard/MDataAddDialog';
import { useSnackbar } from 'notistack';



const mdTheme = createTheme();


export default function Home() {

    const [mDataList, setMDataList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [mdata, setMdata] = React.useState(null);
    const [openAdd, setOpenAdd] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        getMDataList().then(res => res.json())
            .then(data => setMDataList(data.dataList));
    }, [])

    const showNoti = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar({ message, variant });
    };


    const handleAddButton = React.useCallback(
        e => {
            e.preventDefault();
            setOpenAdd(true);
        }
    )

    const hanldeCloseAdd = React.useCallback(
        () => {
            setOpenAdd(false);
        }
    )
    const handleClose = () => {
        setOpen(false);
        // window.location.reload(true);
    };


    const showDetail = React.useCallback(
        (e, data) => {
            console.log(data);
            e.preventDefault();
            setOpen(true);
            setMdata(data)
        })

    
    const hanldeEpointJob = () => {
        executeEpointJob().then(res => res.json())
        .then(data => {
            if (data.code === '20000000') {
                showNoti(`Job run success`, 'success');

            } else {
                showNoti(`Job run fail`, 'error');
            }
        })
    }

    const hanldeRpointJob = () => {
        executeRpointJob().then(res => res.json())
        .then(data => {
            if (data.code === '20000000') {
                showNoti(`Job run success`, 'success');

            } else {
                showNoti(`Job run fail`, 'error');
            }
        })
    }

    const hanldeDeactivateJob = () => {
        
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <Common text="Dashboard" />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                >
                                     <Typography>Job</Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    {/* <TableCell>Lastest status</TableCell> */}
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Calculate epoint 
                                                    </TableCell>
                                                    <TableCell><Button onClick={hanldeEpointJob}>Execute</Button></TableCell>
                                                </TableRow>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Calculate rank 
                                                    </TableCell>
                                                    <TableCell><Button  onClick={hanldeRpointJob}>Execute</Button></TableCell>
                                                </TableRow>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Deactivate expire point
                                                    </TableCell>
                                                    <TableCell><Button  onClick={hanldeDeactivateJob}>Execute</Button></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >

                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Typography>Master Data</Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Key</TableCell>
                                                    <TableCell>Value</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {mDataList ? mDataList.map((data) => (
                                                    <TableRow
                                                        key={data.key}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        onClick={(event) => showDetail(event, data)}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {data.key}
                                                        </TableCell>
                                                        <TableCell>{data.value}</TableCell>
                                                    </TableRow>
                                                )) : ""}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
            <MDataDetailDialog open={open} handleClose={handleClose} mdata={mdata} />
            <MDataAddDialog open={openAdd} handleClose={hanldeCloseAdd} />

        </ThemeProvider>
    );
}

