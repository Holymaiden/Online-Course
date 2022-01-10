import { Card, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Helmet } from 'react-helmet-async';

import Hero from './Hero';

const ConfirmWrapper = styled(Box)(
  () => `
      overflow: auto;
      flex: 1;
      overflow-x: hidden;
      align-items: center;
      background: #ffffff; 
      width:100%;
      height:100%;
  `
);

function Confirm() {
  return (
    <ConfirmWrapper>
      <Helmet>
        <title> Confirm - Online Course Maiden</title>
      </Helmet>
      <Container maxWidth="lg">
        <Card
          sx={{
            p: 4,
            my: 5,
            backgroundColor: `#8757e7`,
            height: '100%',
            borderRadius: 5
          }}
        >
          <Hero />
        </Card>
      </Container>
    </ConfirmWrapper>
  );
}

export default Confirm;
