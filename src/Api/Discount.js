import { API_SERVER } from './index';
import authHeader from './authHeader';

async function findDiscountByUser(kode) {
  const res = await fetch(`${API_SERVER}/discount/by/users/` + kode, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export { findDiscountByUser };
