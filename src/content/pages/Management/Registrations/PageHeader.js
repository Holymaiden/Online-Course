import { Typography, Grid, Slide } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';

import { getCurrentUser } from '../../../../Api/Users';

function PageHeader() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Registrations
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all registrations
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
