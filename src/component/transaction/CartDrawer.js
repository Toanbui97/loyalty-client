import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Badge, Drawer, Tooltip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ClickAwayListener } from '@mui/base';

export default function CartDrawer() {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const setOpenRightDrawer = (open) => (event) => {
        setOpenDrawer(open);
    };

    const list = () => (
        <Box
            sx={{ width: 450 }}
            role="presentation"
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} >
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment >
                
                        <Avatar onClick={setOpenRightDrawer(true)} sx={{ p: 0 }}>
                            <ShoppingCartOutlinedIcon fontSize="medium" />
                        </Avatar>
                <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={() => openDrawer && setOpenRightDrawer(false)}
                >
                <SwipeableDrawer
                    anchor={'right'}
                    open={openDrawer}
                    onClose={(_, reason) => {
                        if (reason === 'backdropClick') {
                            setOpenDrawer(false)
                        }
                    }}
                    onOpen={setOpenRightDrawer(false)}
                >   
                    {list()}
                </SwipeableDrawer>
                </ClickAwayListener>
            </React.Fragment>
        </div>
    );
}