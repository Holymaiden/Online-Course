import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

import Hero from './Hero';
import Course from './Course';
import Popular from './Popular';
import Daftar from './Daftar';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Online Course Maiden Admin Dashboard</title>
      </Helmet>
      <Card sx={{ p: 10, backgroundColor: `#5A47AB` }}>
        <Hero />
      </Card>

      <Container>
        <Course />
        <Popular />
        <Daftar />
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
