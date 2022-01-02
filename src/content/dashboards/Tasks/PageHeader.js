import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader({ user }) {
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.username}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.username}!
        </Typography>
        <Typography variant="subtitle2">
          Manage your day to day tasks with style! Enjoy a well built UI system
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
