import { Card } from '@mui/material';
import PaymentsTable from './PaymentsTable';
import { getAllPayment } from '../../../../Api/Payment';
import { useEffect, useState } from 'react';

function TableDatas() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllPayment().then(function (result) {
      setRows(result.data);
    });
  }, []);
  const datas = rows.map((data) => ({
    id: data.id,
    name: data.name,
    account_number: data.account_number,
    bank: data.bank,
    phone: data.phone
  }));

  return (
    <Card>
      <PaymentsTable datas={datas} />
    </Card>
  );
}

export default TableDatas;
