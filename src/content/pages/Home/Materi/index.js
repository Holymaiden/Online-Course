import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { getCourseBySlug } from '../../../../Api/Course';

import Hero from './Hero';
import Course from './Course';
import Content from './Content';

const KursusWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Materi() {
  const { useMateri } = useParams();
  const [course, setCourse] = useState();
  const [title, setTitle] = useState('');
  useEffect(() => {
    getCourseBySlug(useMateri).then(function (result) {
      setCourse(result.data);
      setTitle(result.data.title);
    });
    window.scrollTo(0, 0);
  }, [useMateri]);
  return (
    <KursusWrapper>
      <Helmet>
        <title> {title} - Online Course Maiden</title>
      </Helmet>
      <Card sx={{ p: 10, backgroundColor: `#5A47AB` }}>
        <Hero course={course} />
      </Card>
      <Container>
        <Content course={course} />
        <Course />
      </Container>
    </KursusWrapper>
  );
}

export default Materi;
