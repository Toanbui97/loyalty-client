import * as React from 'react';

import { Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import { Container } from '@mui/system';


export default function TableButton (props) {

    const add = props.add;
    const remove = props.remove;
    const search = props.search;

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>
                        {props.add ? (<Button variant="contained" color="success" size="small" startIcon={<AddIcon />} onClick={props.add.onClick}>
                            Add
                        </Button>) : ""}


                       {props.remove ? ( <Button variant="contained" color="error" size="small" endIcon={<DeleteIcon />}>
                            Delete selected
                        </Button>) : ""}


                    </Stack>
                </Grid>
                <Grid item xs={4} justifyContent="flex-end">
                    <Stack direction="row" spacing={2}>
                        {props.search ? ( <>
                        <TextField
                            size="small"
                            id="search"
                            type="search"
                            label="Search"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        /> 
                        <Button variant="contained" color="error" size="small" endIcon={<DeleteIcon />}>
                            Search
                        </Button> </>) : ""}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}