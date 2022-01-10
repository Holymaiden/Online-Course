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
    <Grid item sm={12} md={12} xs={{ pl: -20 }}>
      <MotionInView variants={varFadeInLeft}>
        <Typography
          textAlign="center"
          sx={{
            fontSize: {
              lg: 15,
              color: 'white'
            }
          }}
        >
          Pembelian Anda Sedang di Proses
        </Typography>
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
