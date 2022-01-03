import { Box, Container, IconButton, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';

import { getPopularCategory } from '../../../Api/Category';
import { useEffect, useState } from 'react';

import {
  varFadeInRight,
  varFadeInLeft,
  varFadeInUp,
  MotionInView
} from '../../../components/animate';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        background: #ffffff;
`
);

function Footer() {
  const [Popular, setPopular] = useState([]);
  useEffect(() => {
    getPopularCategory(3).then(function (result) {
      setPopular(result.data);
    });
  }, []);

  return (
    <FooterWrapper sx={{ p: 2, borderTop: 2, paddingTop: 5 }}>
      <Container maxWidth="lg">
        <Box>
          <MotionInView variants={varFadeInLeft}>
            <Typography
              color="#5A47AB"
              variant="h1"
              component="div"
              gutterBottom
            >
              Online Course Maiden
            </Typography>
          </MotionInView>
        </Box>
        <Box
          py={3}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <MotionInView variants={varFadeInLeft}>
              <Typography variant="subtitle1" color="#796F6F">
                Ini Merupakan Web Kursus Online Teknologi Modern
                <br />
                Terdapat Beberapa Materi Seperti Desain Grafis, Jaringan, <br />
                Web, Mobile, dan Lain Sebagainya
              </Typography>
            </MotionInView>
          </Box>
          <MotionInView variants={varFadeInUp}>
            <Box display={{ xs: 'block', md: 'flex' }}>
              <Box>
                <Typography
                  sx={{ pt: { xs: 2, md: 0 }, mb: 1, mr: 10 }}
                  variant="subtitle1"
                  color="#5A47AB"
                >
                  Page 1
                </Typography>
                <Typography>Page 2</Typography>
                <Typography>Page 2</Typography>
                <Typography>Page 2</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ pt: { xs: 2, md: 0 }, mb: 1, mr: 10 }}
                  variant="subtitle1"
                  color="#5A47AB"
                >
                  Category
                </Typography>
                {Popular
                  ? Popular.map((datas) => (
                      <Typography>{datas.category}</Typography>
                    ))
                  : null}
              </Box>
              <Box>
                <Typography
                  sx={{ pt: { xs: 2, md: 0 }, mb: 1, mr: 10 }}
                  variant="subtitle1"
                  color="#5A47AB"
                >
                  Page 1
                </Typography>
                <Typography>Page 2</Typography>
                <Typography>Page 2</Typography>
                <Typography>Page 2</Typography>
              </Box>
            </Box>
          </MotionInView>
        </Box>
        <MotionInView variants={varFadeInRight}>
          <IconButton aria-label="LinkedIn" size="large" color="primary">
            <LinkedInIcon />
          </IconButton>
          <IconButton aria-label="Twitter" size="large" color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="Facebook" size="large" color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="Instagram" size="large" color="primary">
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="Google" size="large" color="primary">
            <GoogleIcon />
          </IconButton>
        </MotionInView>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
