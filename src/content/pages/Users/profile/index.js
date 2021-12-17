import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Container, Grid, styled, Box } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';

import ManagementUserSettings from './settings';

import {getCurrentUser} from '../../../../Api/Users'

const ProfileWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
    background: #5A47AB;
`
);

function ManagementUserProfile() {
  const [user, setUser] = useState('')

  useEffect(() => {
    getCurrentUser().then(function (result) {
      result.coverImg= '/static/images/placeholders/covers/5.jpg';
      result.avatar= '/static/images/avatars/4.jpg';
      result.description=
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage";
        result.jobtitle= 'Web Developer';
        result.location= 'Barcelona, Spain';
        result.followers= '465';
      setUser(result);
    })
  }, [])

  // const user = {
  //   savedCards: 7,
  //   name: 'Catherine Pike',
  //   coverImg: '/static/images/placeholders/covers/5.jpg',
  //   avatar: '/static/images/avatars/4.jpg',
  //   description:
  //     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
  //   jobtitle: 'Web Developer',
  //   location: 'Barcelona, Spain',
  //   followers: '465'
  // };

  return (
    <ProfileWrapper>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container
        sx={{
          mt: 3,
          color: '#ffffff'
        }}
        maxWidth="lg"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12}>
            <ManagementUserSettings />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ProfileWrapper>
  );
}

export default ManagementUserProfile;
