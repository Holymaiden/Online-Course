import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Typography,
  CardMedia
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { getBySlugTeachingMaterial } from '../../../../../Api/TeachingMaterial';
import { getExistCourse } from '../../../../../Api/TeachingMaterial';

import { useParams } from 'react-router-dom';

function Belajar() {
  const { useMateri } = useParams();

  const [teaching, setTeaching] = useState([]);
  const [exist, setExist] = useState(0);
  const [open, setOpen] = useState({ status: false, url: '' });

  useEffect(() => {
    getBySlugTeachingMaterial(useMateri).then(function (result) {
      if (result.code == 200) setTeaching(result.data);
      else setTeaching([]);
    });
    getExistCourse(useMateri).then(function (result) {
      console.log(result.data);
      if (result.code == 200) setExist(1);
      else setExist(0);
    });
  }, [useMateri]);
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: '#ffffff', borderRadius: 2 }}
    >
      <Table sx={{ maxWidth: 775 }} aria-label="simple table">
        <TableBody>
          {teaching.map((datas, index) => (
            <TableRow
              key={datas.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ color: 'black', paddingLeft: 6 }} width={100}>
                {index + 1}.
              </TableCell>
              <TableCell sx={{ color: 'black' }} component="th" scope="datas">
                {datas.title}
              </TableCell>
              <IconButton
                sx={{ top: 6 }}
                aria-label="play"
                color={datas.status == 1 ? 'primary' : 'warning'}
                onClick={
                  exist == 1
                    ? () => setOpen({ status: true, url: datas.content })
                    : () => {}
                }
              >
                <PlayCircleIcon />
              </IconButton>
            </TableRow>
          ))}
          <Modal
            open={open.status}
            onClose={() => setOpen({ status: false, url: '' })}
            closeAfterTransition
            BackdropProps={{
              timeout: 500
            }}
            fixed
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Grow in={open.status}>
              <Container maxWidth="lg">
                <Box sx={style}>
                  <CardMedia
                    sx={{
                      width: '90%',
                      m: { lg: 3, xs: 2 },
                      display: 'inline'
                    }}
                    component="video"
                    controls
                    src={open.url}
                    alt="camp"
                  />
                </Box>
              </Container>
            </Grow>
          </Modal>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const style = {
  bgcolor: 'background.paper',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  margin: 'auto',
  borderRadius: 3
};

export default Belajar;
