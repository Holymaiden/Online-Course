import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  Box,
  CardHeader,
  Menu,
  MenuItem,
  Typography,
  CardContent
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import TasksAnalyticsChart from './TasksAnalyticsChart';

import { getTransactionMonth } from '../../../Api/Transaction';

const TasksAnalyticsChartWrapper = styled(TasksAnalyticsChart)(
  ({ theme }) => `
        height: 200px;
`
);

const DotPrimaryLight = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.lighter};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotPrimary = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

function TasksAnalytics() {
  const [transaction, setTransaction] = useState();
  useEffect(() => {
    getTransactionMonth().then((result) => {
      if (result.code == 200) setTransaction(result);
    });
  }, []);
  const transactions = {
    income: transaction ? transaction.meta : 0,
    expenses: transaction ? transaction.data : 0
  };

  const generic = {
    month: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Transaction Analytics" />
      <CardContent sx={{ pt: 0 }}>
        <Box display="flex" alignItems="center" pl={1} pb={3}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
          >
            <DotPrimary />
            transaction payed
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <DotPrimaryLight />
            transaction pending and failed
          </Typography>
        </Box>
        <Box height={200}>
          <TasksAnalyticsChartWrapper
            data={transactions}
            labels={generic.month.labels}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default TasksAnalytics;
