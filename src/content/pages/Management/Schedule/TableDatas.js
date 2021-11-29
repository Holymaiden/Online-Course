import { Card } from '@mui/material';
import SchedulesTable from './SchedulesTable';
import { getAllSchedule } from '../../../../Api/Schedule';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllSchedule().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((data) => ({
    id: data.id,
    course_id: data.course_id,
    title: data.title,
    from: data.from,
    until: data.until
  }));

  return (
    <Card>
      <SchedulesTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
