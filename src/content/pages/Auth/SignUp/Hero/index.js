import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { useState } from 'react';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
    color: ${theme.palette.success.contrastText};
`
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function Hero() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sign In" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      {/* <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={20} mx="auto">
          <TypographyH1 sx={{ mb: 5 }} variant="h1">
            Sign Up
          </TypographyH1>
          <Box sx={{ pb: 2 }}>
            <TextField required id="outlined-username" label="Username" />
          </Box>
          <Box sx={{ pb: 5 }}>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Box>
          <Box sx={{ pb: 1 }}>
            <Button
              component={RouterLink}
              to="/dashboards/tasks"
              size="large"
              variant="contained"
              sx={{ px: 6 }}
            >
              Register
            </Button>
          </Box>
          <Button
            component={RouterLink}
            to="/login"
            size="large"
            variant="text"
            sx={{ px: 5 }}
          >
            Sign In
          </Button>
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default Hero;
