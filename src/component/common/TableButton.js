import * as React from 'react';

import { Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import { Container } from '@mui/system';


export default function TableButton(props) {

    const add = props.add;
    const remove = props.remove;
    const search = props.search;

    return (

        
            <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                    {props.add ? (<Button variant="contained" color="success" size="small" startIcon={<AddIcon />} onClick={props.add.onClick}>
                        Add
                    </Button>) : ""}


                    {props.remove ? (<Button variant="contained" color="error" size="small" endIcon={<DeleteIcon />}>
                        Delete selected
                    </Button>) : ""}
                    {/* <FilterButton /> */}

                </Stack>
            </Grid>
    )
}