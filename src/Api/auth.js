import { API_SERVER } from './index';
import { useEffect } from 'react';

async function loginUser(data) {
  const res = await fetch(`${API_SERVER}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password
    })
  });
  return res.json();
}

export { loginUser };
