import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Common from '../component/common/Common';
import { CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { getRankDetail, getRankList } from '../service/CMSService';
import RankDetailDiaLog from '../component/rank/RankDetailDialog';
import TransitionAlerts from '../component/common/Arlert';
import TableButton from '../component/common/TableButton';
import RankAddDialog from '../component/rank/RankAddDialog';
import { Stack } from '@mui/system';
import SearchIcon from "@mui/icons-material/Search";
import Grid from '@mui/material/Grid';

const mdTheme = createTheme();


export default function CustomerHome() {
    const renderAfterCalled = React.useRef(false);
    const [alertData, setAlertData] = React.useState({});
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [rankList, setRankList] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [totalRecord, setTotalRecord] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(1);
    const [size, setSize] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [rank, setRank] = React.useState(null);
    
    React.useEffect(() => {
        if (!renderAfterCalled.current) {
            getRankList()
                .then(res => res.json())
                .then(res => {
                    setRankList(res.dataList);
                    setTotalPage(1);
                    setSize(res.dataList.length);
                    setTotalRecord(res.dataList.length);
                });
        }

        renderAfterCalled.current = true;
    })

    const handleCloseAlert = () => {
        window.location.reload(true);
    }


    const handleChangePage = React.useCallback(
        (event, newPage) => { }, []);

    const handleChangeRowsPerPage = React.useCallback(
        (event) => { }, []);

    const showDetail = React.useCallback(
        (e, rankCode) => {
            e.preventDefault();
            console.log(rankCode);

            setOpen(true);
            getRankDetail(rankCode)
                .then(res => res.json())
                .then(res => setRank(res.data));
        })

    const handleClose = () => {
        setOpen(false);
        // window.location.reload(true);
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
            <Box sx={{ display: 'flex' }}>

                <Common text="Rank home"/>
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
                                        <TableCell>Rank code</TableCell>
                                        <TableCell >Rank name</TableCell>
                                        <TableCell >Require point</TableCell>
                                        <TableCell >Keep point</TableCell>
                                    </TableRow>
                                </TableHead>
                                {rankList == null ? <CircularProgress /> : (
                                    <TableBody>
                                        {rankList.map((data) => (
                                            <TableRow
                                                // onClick={showDetail(data.customerCode)} 
                                                onClick={(event) => showDetail(event, data.rankCode)}
                                                hover role="checkbox" tabIndex={-1}
                                                key={data.rankCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {data.rankCode}
                                                </TableCell>
                                                <TableCell>{data.rankName}</TableCell>
                                                <TableCell>{data.requirePoint}</TableCell>
                                                <TableCell>{data.keepPoint}</TableCell>
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
                                            page={0}
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
            <RankDetailDiaLog open={open} handleClose={handleClose} rank={rank} setAlertData={setAlertData} setAlertOpen={setAlertOpen} />
            <RankAddDialog  open={openAdd} handleClose={hanldeCloseAdd} setAlertData={setAlertData} setAlertOpen={setAlertOpen}/>
            {/* <CustomerDetailDialog open={open} handleClose={handleClose} customer={customer}/> */}
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
                                        label="Rank name"
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
                                        label="Require point"
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
                                        label="Keep point"
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

