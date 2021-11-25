import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllCategory() {
  const res = await fetch(`${API_SERVER}/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export { getAllCategory };
