import { Card, Grid, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Helmet } from 'react-helmet-async';

import Hero from './Hero';

const PaymentWrapper = styled(Box)(
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

function Payment() {
  return (
    <PaymentWrapper>
      <Helmet>
        <title> Checkout - Online Course Maiden</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Card
              sx={{ p: 5, mt: 6, backgroundColor: `#5A47AB`, height: '100%' }}
            >
              <Hero />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </PaymentWrapper>
  );
}

export default Payment;
