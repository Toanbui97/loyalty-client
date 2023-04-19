import * as React from 'react';
import PropTypes from 'prop-types';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
    menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { Stack, styled } from '@mui/system';
import { ListActionTypes } from '@mui/base/useList';
import { Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Unstable_Grid2';


function MenuSection({ children, label }) {
    return (
        <MenuSectionRoot>
            <MenuSectionLabel>{label}</MenuSectionLabel>
            <ul>{children}</ul>
        </MenuSectionRoot>
    );
}

MenuSection.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
};

export function CategoriesDropDown() {
    const [buttonElement, setButtonElement] = React.useState(null);

    const [isOpen, setOpen] = React.useState(false);
    const menuActions = React.useRef(null);
    const preventReopen = React.useRef(false);

    const updateAnchor = React.useCallback((node) => {
        setButtonElement(node);
    }, []);

    const handleButtonClick = (event) => {
        if (preventReopen.current) {
            event.preventDefault();
            preventReopen.current = false;
            return;
        }

        setOpen((open) => !open);
    };

    const handleButtonMouseDown = () => {
        if (isOpen) {
            // Prevents the menu from reopening right after closing
            // when clicking the button.
            preventReopen.current = true;
        }
    };

    const handleButtonKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            if (event.key === 'ArrowUp') {
                // Focus the last item when pressing ArrowUp.
                menuActions.current?.dispatch({
                    type: ListActionTypes.keyDown,
                    key: event.key,
                    event,
                });
            }
        }
    };

    const createHandleMenuClick = (menuItem) => {
        return () => {
            console.log(`Clicked on ${menuItem}`);
            setOpen(false);
            buttonElement?.focus();
        };
    };

    return (
        <div>
            <TriggerButton
                type="button"
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
                onMouseDown={handleButtonMouseDown}
                ref={updateAnchor}
                aria-controls={isOpen ? 'wrapped-menu' : undefined}
                aria-expanded={isOpen || undefined}
                aria-haspopup="menu"
            >
                <Grid container  xs={12} display="flex" >
                    <Grid xs={8} display="flex" justifyContent="flex-start" >
                    <CategoryIcon />
                    <Typography style={{marginLeft: 10, fontWeight: 'bold'}} variant="body1">Categories</Typography>
                    </Grid>
                    <Grid xs={4} display="flex" justifyContent="flex-end">
                    <KeyboardArrowDownIcon style={{}}/>
                    </Grid>
                </Grid>
                {/* <Stack direction="row" alignItems="flex-start" gap={4} >
                    
                    <CategoryIcon />
                    <Typography variant="body1">Categories</Typography>
                   
                   <KeyboardArrowDownIcon style={{}}/>
                </Stack> */}
            </TriggerButton>
            <MenuUnstyled
                actions={menuActions}
                open={isOpen}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
                anchorEl={buttonElement}
                slots={{ root: Popper, listbox: StyledListbox }}
                slotProps={{ listbox: { id: 'simple-menu' } }}
            >
                <MenuSection label="Fashion">
                    <StyledMenuItem onClick={createHandleMenuClick('Back')}>
                        Man Clothes
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Forward')}>
                        Woman Clothes
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Refresh')}>
                        Accessories
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Refresh')}>
                        Shoes
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Refresh')}>
                        Bags
                    </StyledMenuItem>
                    
                </MenuSection>
                <MenuSection label="Electronics">
                    <StyledMenuItem onClick={createHandleMenuClick('Save as...')}>
                       Laptop
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Print...')}>
                        Computer
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Print...')}>
                        Computer
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Print...')}>
                        Computer
                    </StyledMenuItem>
                    
                    
                </MenuSection>
                <MenuSection label="Bike">
                    <StyledMenuItem onClick={createHandleMenuClick('Zoom in')}>
                        Zoom in
                    </StyledMenuItem>
                   <StyledMenuItem onClick={createHandleMenuClick('Zoom out')}>
                        Zoom out
                    </StyledMenuItem>
                </MenuSection>
                <StyledMenuItem onClick={createHandleMenuClick('Zoom out')}>
                        Zoom out
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createHandleMenuClick('Zoom out')}>
                        Zoom out
                    </StyledMenuItem>
                    
            </MenuUnstyled>
        </div>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  width: 20em;
  border-radius: 5px;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledMenuItem = styled(MenuItemUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;
  width: 16em;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 5px;

  background-color: #F6F9FC;
  background: #F6F9FC;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  width: 20em;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: rgba(43, 52, 69, 0.04);;
    border-color: rgba(43, 52, 69, 0.04);;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;

const MenuSectionRoot = styled('li')`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
  width: 20em;
`;