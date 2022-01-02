import { useState } from 'react';
import { Tabs, Tab, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import EditProfileTab from './EditProfileTab';
import NotificationsTab from './NotificationsTab';
import SecurityTab from './SecurityTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings({ user }) {
  const [currentTab, setCurrentTab] = useState('edit_profile');

  const tabs = [
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <TabsWrapper
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor={'#FBD15B'}
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabsWrapper>
      </Grid>
      <Grid item xs={12}>
        {currentTab === 'edit_profile' && <EditProfileTab user={user} />}
        {currentTab === 'notifications' && <NotificationsTab />}
        {currentTab === 'security' && <SecurityTab user={user} />}
      </Grid>
    </Grid>
  );
}

export default ManagementUserSettings;
