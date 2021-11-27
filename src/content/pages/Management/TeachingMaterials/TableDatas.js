import { Card } from '@mui/material';
import TeachingMaterialsTable from './TeachingMaterialsTable';
import { getAllTeachingMaterial } from '../../../../Api/TeachingMaterial';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllTeachingMaterial().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((data) => ({
    id: data.id,
    course_id: data.course_id,
    course_title: data.course_title,
    category_id: data.category_id,
    category: data.category,
    title: data.title,
    slug: data.slug,
    content: data.content,
    description: data.description,
    status: data.status
  }));

  return (
    <Card>
      <TeachingMaterialsTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
