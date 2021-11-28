import { Card } from '@mui/material';
import TransactionsTable from './TransactionsTable';
import { getAllTransaction } from '../../../../Api/Transaction';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllTransaction().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((transaction) => ({
    id: transaction.id,
    user_id: transaction.user_id,
    username: transaction.username,
    course_id: transaction.course_id,
    course: transaction.course,
    payment_id: transaction.payment_id,
    payment: transaction.payment
  }));

  return (
    <Card>
      <TransactionsTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
