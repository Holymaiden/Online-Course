import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';

import { getBySlugTeachingMaterial } from '../../../../../Api/TeachingMaterial';

import { useParams } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

function Belajar() {
  const { useMateri } = useParams();

  const [teaching, setTeaching] = useState([]);
  useEffect(() => {
    getBySlugTeachingMaterial(useMateri).then(function (result) {
      setTeaching(result.data);
    });
  }, [useMateri]);
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: '#ffffff', borderRadius: 2 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {teaching.map((datas, index) => (
            <TableRow
              key={datas.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ color: 'black' }}>{index + 1}</TableCell>
              <TableCell sx={{ color: 'black' }} component="th" scope="datas">
                {datas.title}
              </TableCell>
              <TableCell align="right" sx={{ color: 'black' }}>
                {datas.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Belajar;
