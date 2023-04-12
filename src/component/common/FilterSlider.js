

import { createTheme, Slider, ThemeProvider, Typography } from "@mui/material";
import * as React from "react";

const numberMarks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 100,
    label: "100"
  }
];

// Theme Palette Colors
const mdTheme = createTheme();

export default function FilterButton() {

  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <div>
        <Typography id="range-slider" gutterBottom>
          First Submitted
        </Typography>
        <Slider
          aria-labelledby="range-slider"
          color="primary"
          defaultValue={50}
          onChange={handleChange}
          marks={numberMarks}
          value={value}
          valueLabelDisplay="auto"
        />

        <Typography id="range-slider" gutterBottom>
          Last Activity
        </Typography>
        <Slider
          aria-labelledby="range-slider"
          color="primary"
          defaultValue={50}
          onChange={handleChange}
          marks={numberMarks}
          value={value}
          valueLabelDisplay="auto"
        />

        <Typography id="range-slider" gutterBottom>
          MARQ&trade; score
        </Typography>
        <Slider
          aria-labelledby="range-slider"
          color="primary"
          defaultValue={50}
          onChange={handleChange}
          marks={numberMarks}
          value={value}
          valueLabelDisplay="auto"
        />
      </div>
    </ThemeProvider>
  );
}
