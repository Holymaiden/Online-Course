import { Card } from '@mui/material';
import CoursesTable from './CoursesTable';
import { getAllCourse } from '../../../../Api/Course';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllCourse().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((course) => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    category_id: course.category_id,
    category: course.category,
    description: course.description,
    price: course.price,
    status: course.status
  }));

  return (
    <Card>
      <CoursesTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
