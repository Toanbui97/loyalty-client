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
import { getCustomerDetail, getCustomerList } from '../service/CMSService';
import { CircularProgress, InputAdornment, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import CustomerDetailDialog from '../component/customer/CustomerDetailDiaLog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertPopup from '../component/common/Arlert';
import TableButton from '../component/common/TableButton';
import { Stack } from '@mui/system';
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';


const mdTheme = createTheme();


export default function CustomerHome() {
    const renderAfterCalled = React.useRef(false);
    const [alertData, setAlertData] = React.useState({});
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [customerList, setCustomerList] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [totalRecord, setTotalRecord] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [size, setSize] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState(null);

    const handleCloseAlert = () => {
        window.location.reload(true);
    }

    React.useEffect(() => {
        if (!renderAfterCalled.current) {
            getCustomerList(page, size)
                .then(res => res.json())
                .then(res => {
                    setCustomerList(res.dataList);
                    setPage(res.page);
                    setTotalPage(res.totalPage);
                    setSize(res.size);
                    setTotalRecord(res.totalRecord);
                });
        }

        renderAfterCalled.current = true;
    })


    const handleChangePage = React.useCallback(
        (event, newPage) => {
            setSize(size);
            setPage(newPage);

            getCustomerList(newPage, size)
                .then(res => res.json())
                .then(res => {
                    setCustomerList(res.dataList);
                    setPage(res.page);
                    setTotalPage(res.totalPage);
                    setSize(res.size);
                    setTotalRecord(res.totalRecord);
                });
        },
        [],
    );

    const handleChangeRowsPerPage = React.useCallback(
        (event) => {
            const size = parseInt(event.target.value, 10);
            setSize(size);
            setPage(page);

            getCustomerList(page, size)
                .then(res => res.json())
                .then(res => {
                    setCustomerList(res.dataList);
                    setPage(res.page);
                    setTotalPage(res.totalPage);
                    setSize(res.size);
                    setTotalRecord(res.totalRecord);
                });

            // There is no layout jump to handle on the first page.

        },
        [],
    );

    const showDetail = React.useCallback(
        (e, customerCode) => {
            e.preventDefault();
            console.log(customerCode);

            setOpen(true);
            getCustomerDetail(customerCode)
                .then(res => res.json())
                .then(res => setCustomer(res.data));
        })

    const handleClose = () => {
        setOpen(false);
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
    return (

        <ThemeProvider theme={mdTheme}>
            <AlertPopup data={alertData} open={alertOpen} setOpen={setAlertOpen} onClose={handleCloseAlert} />
            <Box sx={{ display: 'flex' }}>
                <Common text={'Customer home'} />
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
                        <TableContainer component={Paper}>
                            <SearchBar />
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Customer name</TableCell>
                                        <TableCell align="right">EPoint</TableCell>
                                        <TableCell align="right">RPoint</TableCell>
                                        <TableCell align="right">Rank</TableCell>
                                        <TableCell align="right">Voucher number</TableCell>
                                    </TableRow>
                                </TableHead>
                                {customerList == null ? <CircularProgress /> : (
                                    <TableBody>
                                        {customerList.map((data) => (
                                            <TableRow
                                                // onClick={showDetail(data.customerCode)} 
                                                onClick={(event) => showDetail(event, data.customerCode)}
                                                hover role="checkbox" tabIndex={-1}
                                                key={data.customerCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {data.customerName}
                                                </TableCell>
                                                <TableCell align="right">{data.epoint}</TableCell>
                                                <TableCell align="right">{data.rpoint}</TableCell>
                                                <TableCell align="right">{data.rankCode}</TableCell>
                                                <TableCell align="right">{data.activeVoucher}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )}
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: totalRecord }]}
                                            colSpan={3}
                                            count={totalRecord}
                                            rowsPerPage={size}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'Page size',
                                                },
                                                native: true,

                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                            showFirstButton={true}
                                            showLastButton={true}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Container>
                </Box>
            </Box>
            <CustomerDetailDialog open={open} handleClose={handleClose} customer={customer} setAlertData={setAlertData} setAlertOpen={setAlertOpen} />
            {/* <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog> */}
        </ThemeProvider>

    );

    function SearchBar() {
        return (
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    <TableButton add={{ onClick: handleAddButton }} remove />
                    <Grid item xs={12} justifyContent="flex-end">
                        <Grid container>
                            <Grid item xs={10}>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        label="Customer name"
                                        type="text"
                                        variant="standard"
                                        size="small"
                                        inputProps={{
                                            style: {
                                                height: "15",
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Rank"
                                        type="text"
                                        variant="standard"
                                        size="small"
                                        inputProps={{
                                            style: {
                                                height: "15",
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Voucher number"
                                        type="text"
                                        variant="standard"
                                        size="small"
                                        inputProps={{
                                            style: {
                                                height: "15",
                                            },
                                        }}
                                    />
                                    <IconButton color="primary" aria-label="upload picture" component="label" size="large">
                                        <SearchIcon />
                                    </IconButton>

                                </Stack>
                            </Grid>
                            <Grid item xs={1}>
                                <Stack>

                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        )
    }
}

