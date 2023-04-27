import * as React from 'react';
import Input from '@mui/base/Input';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
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

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return <Input style={{width:"100%"}} slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

export function DeliveryAddressInput() {
  return <CustomInput aria-label="Demo input" placeholder="Delivery Address" />;
}

export const EPointInput = React.forwardRef(function EPointInput(props, ref) {
  return <Input  slots={{ input: StyledInputElement }} {...props} ref={ref} />
})