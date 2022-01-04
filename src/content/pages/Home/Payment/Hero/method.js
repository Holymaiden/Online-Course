import {
  Box,
  Card,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

import { varFadeInLeft, MotionInView } from '../../../../../components/animate';

function Method({ back }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [pay, setPay] = useState({
    wa: '',
    name: '',
    number: '',
    bank: ''
  });

  useEffect(() => {
    back(pay);
  }, [pay]);

  const classes = styles();

  return (
    <Grid item sm={12} md={6} xs={{ pl: -20 }}>
      <MotionInView variants={varFadeInLeft}>
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
              lg: 15,
              color: 'white'
            }
          }}
        >
          You'll be able to schedule this lesson after payment.
        </Typography>
        <Card sx={{ background: '#634acc', mt: 4, borderRadius: 5 }}>
          <Box sx={{ m: 3 }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider'
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Credit Card"
                  {...a11yProps(0)}
                  onClick={() =>
                    setPay({ wa: '', name: '', number: '', bank: '' })
                  }
                />
                <Tab
                  label="Phone"
                  {...a11yProps(1)}
                  onClick={() =>
                    setPay({ wa: '', name: '', number: '', bank: '' })
                  }
                />
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
                    className={classes.root}
                    onChange={(x) => setPay({ ...pay, number: x.target.value })}
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
                    className={classes.root}
                    onChange={(x) => setPay({ ...pay, bank: x.target.value })}
                  />
                  <TextField
                    sx={{ width: { md: '47%', sm: '100%' } }}
                    color="warning"
                    label="Nama"
                    variant="outlined"
                    className={classes.root}
                    onChange={(x) => setPay({ ...pay, name: x.target.value })}
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
                className={classes.root}
                onChange={(x) => setPay({ ...pay, wa: x.target.value })}
              />
            </TabPanel>
          </Box>
        </Card>
      </MotionInView>
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

const styles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 12
      },
      '&:hover fieldset': {
        borderColor: 'white'
      }
    },
    '& .MuiFormLabel-root': {
      color: 'white'
    }
  }
});

export default Method;
