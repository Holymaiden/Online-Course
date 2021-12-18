import {
  Box,
  Card,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

import { useEffect, useState } from 'react';

function Method(course) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid item sm={12} md={6} xs={{ pl: -20 }}>
      <Typography
        sx={{
          fontSize: {
            lg: 30
          },
          color: `#FBD15B`
        }}
      >
        Payment
      </Typography>
      <Typography
        sx={{
          fontSize: {
            lg: 15
          }
        }}
      >
        You'll be able to schedule this lesson after payment.
      </Typography>

      <Card sx={{ background: '#8572D7', mt: 4 }}>
        <Box sx={{ m: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Credit Card" {...a11yProps(0)} />
              <Tab label="Phone" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box>
              <Box marginBottom={2}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Nomor Rekening"
                  variant="outlined"
                  color="warning"
                />
              </Box>
              <Box sx={{ flexDirection: 'row' }}>
                <TextField
                  sx={{
                    width: { md: '47%', sm: '100%' },
                    mr: { md: 3 },
                    mb: 2
                  }}
                  color="warning"
                  label="BANK"
                  variant="outlined"
                />
                <TextField
                  sx={{ width: { md: '47%', sm: '100%' } }}
                  color="warning"
                  label="Nama"
                  variant="outlined"
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              sx={{ width: '100%' }}
              color="warning"
              label="Whatsapp"
              variant="outlined"
            />
          </TabPanel>
        </Box>
      </Card>
    </Grid>
  );
}

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

export default Method;
