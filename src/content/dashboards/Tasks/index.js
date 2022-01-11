import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Container, Grid, Tab, Tabs } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import TeamOverview from './TeamOverview';
import TasksAnalytics from './TasksAnalytics';
import Performance from './Performance';
import TaskSearch from './TaskSearch';

import { getCurrentUser } from '../../../Api/Users';
import {
  getTeachingMaterialCom,
  getTeachingMaterialPen
} from '../../../Api/TeachingMaterial';

function DashboardTasks() {
  const [user, setUser] = useState([]);
  const [com, setCom] = useState(0);
  const [pen, setPen] = useState(0);

  useEffect(() => {
    getCurrentUser().then((result) => setUser(result));
    getTeachingMaterialCom().then((result) => setCom(result.data.count));
    getTeachingMaterialPen().then((result) => setPen(result.data.count));
  }, []);

  const [currentTab, setCurrentTab] = useState('analytics');

  const tabs = [
    { value: 'analytics', label: 'Analytics Overview' },
    { value: 'taskSearch', label: 'Task Search' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Tasks Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader user={user} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Grid>
          {currentTab === 'analytics' && (
            <>
              {/* <Grid item xs={12}>
                <TeamOverview />
              </Grid> */}
              <Grid item xs={12} sm={6} md={8}>
                <TasksAnalytics />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Performance teach={{ pen: pen, com: com }} />
              </Grid>
            </>
          )}
          {currentTab === 'taskSearch' && (
            <Grid item xs={12}>
              <TaskSearch />
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardTasks;
