import { API_SERVER } from './index';

async function loginUser({ username, password }) {
  const res = await fetch(`${API_SERVER}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  return res.json();
}

export { loginUser };
