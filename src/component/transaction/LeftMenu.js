import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import HoverRating from './HoverRating';

export default function LeftMenu() {
    return (
        <Paper sx={{ width: 300, backgroundColor:'#fff' }}>
            <MenuList dense>
                <MenuItem disable="true">
                    <ListItemText ><Typography style={{ fontWeight: 'bold' }}>Categories</Typography></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText style={{color: 'rgb(125, 135, 156)' , margin:5}}>Bath Preparations</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText style={{color: 'rgb(125, 135, 156)', margin:5}}>Eye Makeup Preparations</ListItemText>
                </MenuItem>

                <MenuItem>
                    <ListItemText style={{color: 'rgb(125, 135, 156)', margin:5}}>Fragrance</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText style={{color: 'rgb(125, 135, 156)', margin:5}}>Hair Preparations</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem>
                    <ListItemText style={{ fontWeight: 'bold' }}>Brand</ListItemText>
                </MenuItem>
                <MenuItem> <Checkbox size="small" /> <ListItemText >Bath Preparations</ListItemText>  </MenuItem>
                <MenuItem><Checkbox size="small" /><ListItemText >Karts</ListItemText></MenuItem>

                <MenuItem><Checkbox size="small" /><ListItemText >Baals</ListItemText></MenuItem>
                <MenuItem><Checkbox size="small" /><ListItemText >Bukks</ListItemText></MenuItem>
                <MenuItem><Checkbox size="small" /><ListItemText >Luasis</ListItemText></MenuItem>


                <Divider />

                <MenuItem><Checkbox size="small" /><ListItemText >On Sale</ListItemText></MenuItem>
                <MenuItem><Checkbox size="small" /><ListItemText >In Stock</ListItemText></MenuItem>
                <MenuItem><Checkbox size="small" /><ListItemText >Featured</ListItemText></MenuItem>

                <Divider />
                <MenuItem>
                    <ListItemText style={{ fontWeight: 'bold' }}>Rating</ListItemText>

                </MenuItem>
                <MenuItem>
                    <HoverRating />

                </MenuItem>

            </MenuList>
        </Paper>

    );
}