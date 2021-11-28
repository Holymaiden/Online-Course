import { Card } from '@mui/material';
import CartsTable from './CartsTable';
import { getAllCart } from '../../../../Api/Cart';
import { useEffect, useState } from 'react';
import { daysToWeeks } from 'date-fns';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllCart().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((data) => ({
    id: data.id,
    user_id: data.user_id,
    username: data.username,
    course_id: data.course_id,
    course: data.course,
    price: data.price,
    status: data.deleted_at
  }));

  return (
    <Card>
      <CartsTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
