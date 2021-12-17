import { Card, Grid,Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {getCourseBySlug} from '../../../Api/Course';

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

function Payment(){
    const {state} = useLocation();
    const {slug} =state;

    const [course, setCourse] = useState('')
    useEffect(() => {
        getCourseBySlug(slug).then(function (result){
            setCourse(result.data);
        })
    }, [slug])
    
    return (
        <PaymentWrapper>
            <Helmet>
            <title> Payment - Online Course Maiden</title>
            </Helmet>
            <Container maxWidth="lg">
        <Grid 
        container>
            <Grid item xs={12}>
            <Card sx={{ p: 10,mt:5, backgroundColor: `#5A47AB` }}>
            </Card>
            </Grid>
        </Grid> 
        </Container>
        </PaymentWrapper>
    )
}

export default Payment;