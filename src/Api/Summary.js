import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllSummary() {
  const res = await fetch(`${API_SERVER}/admin/summary`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export { getAllSummary };
