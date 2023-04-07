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
import { getCustomerList } from '../service/CMSService';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const mdTheme = createTheme();


export default function CustomerHome() {
    const renderAfterCalled = React.useRef(false);
    const [dataList, setDataList] = React.useState(null);
    React.useEffect(() => {
        if (!renderAfterCalled.current) {
            getCustomerList()
                .then(res => res.json())
                .then(res => setDataList(res.dataList));
        }

        renderAfterCalled.current = true;
    })

    return (

        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <Common />
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
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer name</TableCell>
                                    <TableCell align="right">EPoint</TableCell>
                                    <TableCell align="right">RPoint</TableCell>
                                    <TableCell align="right">Rank</TableCell>
                                    <TableCell align="right">Voucher number</TableCell>
                                </TableRow>
                            </TableHead>
                            {dataList == null ? <CircularProgress /> : (
                                <TableBody>
                                    {dataList.map((data) => (
                                        <TableRow
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
                        </Table>
                    </TableContainer>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>

    );
}

