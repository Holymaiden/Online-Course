import { Card } from '@mui/material';
import InstructorsTable from './InstructorsTable';
import { getAllInstructor } from '../../../../Api/Instructor';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllInstructor().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((instructor) => ({
    id: instructor.id,
    user_id: instructor.user_id,
    username: instructor.username,
    email: instructor.email,
    avatar: instructor.avatar,
    course_id: instructor.course_id,
    course: instructor.course,
    status: instructor.status
  }));

  return (
    <Card>
      <InstructorsTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
