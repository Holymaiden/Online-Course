import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

import Hero from './Hero';
import Course from './Course';
import All from './All';

const KursusWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Kursus() {
  return (
    <KursusWrapper>
      <Helmet>
        <title>Materi - Online Course Maiden</title>
      </Helmet>
      <Card sx={{ p: 10, backgroundColor: `#5A47AB` }}>
        <Hero />
      </Card>

      <Container>
        <Course />
        <All />
      </Container>
    </KursusWrapper>
  );
}

export default Kursus;
