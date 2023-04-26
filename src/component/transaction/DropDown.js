import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMenu, { MenuProvider } from '@mui/base/useMenu';
import useMenuItem from '@mui/base/useMenuItem';
import Popper from '@mui/base/Popper';
import { GlobalStyles, Stack } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';

const Menu = React.forwardRef(function Menu(props, ref) {
    const { children, onOpenChange, open, ...other } = props;

    const { contextValue, getListboxProps } = useMenu({
        listboxRef: ref,
        onOpenChange,
        open,
    });

    return (
        <ul className="menu-root" {...other} {...getListboxProps()}>
            <MenuProvider value={contextValue}>{children}</MenuProvider>
        </ul>
    );
});

Menu.propTypes = {
    children: PropTypes.node,
    onOpenChange: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
    const { children, onClick, ...other } = props;

    const { getRootProps, disabled, focusVisible } = useMenuItem({ ref });

    const classes = {
        'focus-visible': focusVisible,
        'menu-item': true,
        disabled,
    };

    return (
        <li
            className={clsx(classes)}
            {...other}
            {...getRootProps({ onClick: onClick ?? (() => { }) })}
        >
            {children}
        </li>
    );
});

MenuItem.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export function HomeDropDown() {
    const [buttonElement, setButtonElement] = React.useState(null);

    const [isOpen, setOpen] = React.useState(false);
    const preventReopen = React.useRef(false);

    const updateAnchor = React.useCallback((node) => {
        setButtonElement(node);
    }, []);

    const handleOnClick = (event) => {
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
        <React.Fragment>
            <GlobalStyles styles={styles} />
            <button
                type="button"
                className="button"
                onClick={handleOnClick}
                onMouseDown={handleButtonMouseDown}
                onKeyDown={handleButtonKeyDown}
                ref={updateAnchor}
                aria-controls="hooks-menu"
                aria-expanded={isOpen || undefined}
                aria-haspopup="menu"
                style={{ width: '15em' }}
            >
                <Stack direction="row" justifyContent="center" alignItems="center" gap={1} style={{fontSize: '14px', textAlign: 'center'}}>
                    <Typography style={{fontSize: '14px', textAlign: 'center'}} variant="body1">Home</Typography>
                    <KeyboardArrowDownIcon />
                </Stack>
            </button>
            <Popper open={isOpen} anchorEl={buttonElement}>
                <Menu
                    onOpenChange={(open) => {
                        setOpen(open);
                    }}
                    open={isOpen}
                    id="hooks-menu"
                >
                    <MenuItem onClick={createHandleMenuClick('Cut')}>Market 1</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Copy')}>Market 2</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Market 3</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Market 4</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Glocery 1</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Glocery 3</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Glocery 2</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Fashion 1</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Fashion 4</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Fashion 3</MenuItem>
                    <MenuItem onClick={createHandleMenuClick('Paste')}>Fashion 2</MenuItem>
                </Menu>
            </Popper>
        </React.Fragment>
    );
}

export function PageDropDown() {
  const [buttonElement, setButtonElement] = React.useState(null);

  const [isOpen, setOpen] = React.useState(false);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node) => {
      setButtonElement(node);
  }, []);

  const handleOnClick = (event) => {
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
      <React.Fragment>
          <GlobalStyles styles={styles} />
          <button
              type="button"
              className="button"
              onClick={handleOnClick}
              onMouseDown={handleButtonMouseDown}
              onKeyDown={handleButtonKeyDown}
              ref={updateAnchor}
              aria-controls="hooks-menu"
              aria-expanded={isOpen || undefined}
              aria-haspopup="menu"
              style={{ width: '15em' }}
          >
              <Stack direction="row" justifyContent="center" alignItems="center" gap={1} style={{fontSize: '14px', textAlign: 'center'}}>
                  <Typography style={{fontSize: '14px', textAlign: 'center'}} variant="body1">Pages</Typography>
                  <KeyboardArrowDownIcon />
              </Stack>
          </button>
          <Popper open={isOpen} anchorEl={buttonElement}>
              <Menu
                  onOpenChange={(open) => {
                      setOpen(open);
                  }}
                  open={isOpen}
                  id="hooks-menu"
              >
                  <MenuItem onClick={createHandleMenuClick('Cut')}>Sale page</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Copy')}>Vendor</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Paste')}>Shop</MenuItem>
              </Menu>
          </Popper>
      </React.Fragment>
  );
}

export function UserAccountDropDown() {
  const [buttonElement, setButtonElement] = React.useState(null);

  const [isOpen, setOpen] = React.useState(false);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node) => {
      setButtonElement(node);
  }, []);

  const handleOnClick = (event) => {
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
      <React.Fragment>
          <GlobalStyles styles={styles} />
          <button
              type="button"
              className="button"
              onClick={handleOnClick}
              onMouseDown={handleButtonMouseDown}
              onKeyDown={handleButtonKeyDown}
              ref={updateAnchor}
              aria-controls="hooks-menu"
              aria-expanded={isOpen || undefined}
              aria-haspopup="menu"
              style={{ width: '15em' }}
          >
              <Stack direction="row" justifyContent="center" alignItems="center" gap={1} style={{fontSize: '14px', textAlign: 'center'}}>
                  <Typography style={{fontSize: '14px', textAlign: 'center'}} variant="body1">User Account</Typography>
                  <KeyboardArrowDownIcon />
              </Stack>
          </button>
          <Popper open={isOpen} anchorEl={buttonElement}>
              <Menu
                  onOpenChange={(open) => {
                      setOpen(open);
                  }}
                  open={isOpen}
                  id="hooks-menu"
              >
                  <MenuItem onClick={createHandleMenuClick('Cut')}>Order</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Copy')}>Profile</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Paste')}>Address</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Paste')}>Support tickets</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Paste')}>Wish</MenuItem>
              </Menu>
          </Popper>
      </React.Fragment>
  );
}




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

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const styles = `
  .menu-root {
    
    font-size: 14px;
    // box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 200px;
    background: #fff;
    border: 1px solid ${grey[200]};
    border-radius: 5px;
    color: ${grey[900]};
    overflow: auto;
    outline: 0px;
  }

  .mode-dark .menu-root {
    background: ${grey[900]};
    border-color: ${grey[700]};
    color: ${grey[300]};
  }

  .menu-item {
    list-style: none;
    padding: 8px;
    border-radius:5;
    cursor: default;
    user-select: none;
    margin-top:3px
    border: 1px solid;
  }

  .menu-item:last-of-type {
    border-bottom: 1;
  }

  .menu-item.focus-visible {
    background-color: ${grey[100]};
    color: ${grey[900]};
    outline: 1;
  }

  .mode-dark .menu-item.focus-visible {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  .menu-item.disabled {
    color: ${grey[400]};
  }

  .mode-dark .menu-item.disabled {
    color: ${grey[700]};
  }

  .menu-item:hover:not(.disabled) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  .mode-dark .menu-item:hover:not(.disabled){
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  .button {
    font-size: 14px;
    min-height: calc(1.5em + 22px);
    border-radius:5;
    padding: 12px 16px;
    line-height: 1.5;
    background: #fff;
    border: 0;
    color: ${grey[900]};
    cursor: pointer;
    text-align: center;
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      // background: ${grey[50]};
      // border-color: ${grey[300]};
      color: rgb(210, 63, 87)
    }
  
    &:focus {
      border-color: ${blue[400]};
    //   outline: 3px solid ${blue[200]};
    }
  }

  .mode-dark .button {
    background: ${grey[900]};
    border: 0;
    color: ${grey[300]};

    &:hover {
      background: ${grey[800]};
      border-color: ${grey[600]};
    }

    &:focus {
    //   outline: 3px solid ${blue[500]}
    }
  }
`;