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
import { deleteVoucer, deleteVoucher, getVoucherInfo, getVoucherList } from '../service/VoucherService';
import useAlert from '../context/UseAler';
import VoucherDetailDialog from '../component/voucher/VoucherDetailDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import VoucherAddDialog from '../component/voucher/VoucherAddDialog';
import SearchIcon from "@mui/icons-material/Search";
import TableButton from '../component/common/TableButton';

const mdTheme = createTheme();


export default function VoucherAdmin() {
    const renderAfterCalled = React.useRef(false);
    const { setAlert } = useAlert();
    const [alertData, setAlertData] = React.useState({});
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [voucherList, setVoucherList] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [totalRecord, setTotalRecord] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [size, setSize] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [voucher, setVoucher] = React.useState(null);

    const handleCloseAlert = () => {
        window.location.reload(true);
    }

    React.useEffect(() => {
        if (!renderAfterCalled.current) {
            getVoucherList(page, size)
                .then(res => res.json())
                .then(res => {
                    setVoucherList(res.dataList);
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

            getVoucherList(newPage, size)
                .then(res => res.json())
                .then(res => {
                    setVoucherList(res.dataList);
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

            getVoucherList(page, size)
                .then(res => res.json())
                .then(res => {
                    setVoucherList(res.dataList);
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
        (e, voucherCode) => {
            e.preventDefault();
            console.log(voucherCode);

            setOpen(true);
            getVoucherInfo(voucherCode)
                .then(res => res.json())
                .then(data => {
                    setVoucher(data.data);
                });
            // getCustomerDetail(customerCode)
            //         .then(res => res.json())
            //         .then(res => setCustomer(res.data));
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

    const deleteRow = (e, code) => {
        e.stopPropagation()
        deleteVoucher(code)
            .then(res => res.json())
            .then(data => {
                setAlert(data);
                hanldeCloseAdd();
            })
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <AlertPopup data={alertData} open={alertOpen} setOpen={setAlertOpen} onClose={handleCloseAlert} />
            <Box sx={{ display: 'flex' }}>
                <Common text="Voucher home" />
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
            
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <TableContainer component={Paper}>
                            <SearchBar  />
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Voucher name</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Total voucher</TableCell>
                                        <TableCell align="right">Discount percent</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                {voucherList == null ? <CircularProgress /> : (
                                    <TableBody>
                                        {voucherList.map((data) => (
                                            <TableRow
                                                // onClick={showDetail(data.customerCode)} 
                                                onClick={(event) => showDetail(event, data.voucherCode)}
                                                hover role="checkbox" tabIndex={-1}
                                                key={data.voucherCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {data.voucherName}
                                                </TableCell>
                                                <TableCell align="right">{data.description}</TableCell>
                                                <TableCell align="right">{data.totalVoucher}</TableCell>
                                                <TableCell align="right">{data.discountPercent}</TableCell>
                                                <TableCell align="right">{data.price}</TableCell>
                                                <TableCell align="center" onClick={e => deleteRow(e, data.voucherCode)}><DeleteIcon /></TableCell>
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
            <VoucherDetailDialog open={open} handleClose={handleClose} data={voucher} setAlertData={setAlertData} setAlertOpen={setAlertOpen} />
            {/* <CustomerDetailDialog open={open} handleClose={handleClose} customer={customer} setAlertData={setAlertData} setAlertOpen={setAlertOpen}/> */}
            <VoucherAddDialog open={openAdd} handleClose={hanldeCloseAdd} setAlertData={setAlertData} setAlertOpen={setAlertOpen} />
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
                                        label="Voucher name"
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
                                        label="Discount percent"
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
                                        label="Price"
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
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        )
    }
}

