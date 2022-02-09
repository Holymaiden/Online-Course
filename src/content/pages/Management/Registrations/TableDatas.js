import { Card } from '@mui/material';
import RegistrationsTable from './RegistrationsTable';
import { getAllRegistration } from '../../../../Api/Registration';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllRegistration().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((data) => ({
    id: data.id,
    username: data.username,
    cv: data.cv,
    status: data.status
  }));

  return (
    <Card>
      <RegistrationsTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
