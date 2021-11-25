import { Card } from '@mui/material';
import UsersTable from './UsersTable';
import { subDays } from 'date-fns';
import { getAllUser } from '../../../../Api/Users';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllUser().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar
  }));

  return (
    <Card>
      <UsersTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
