import { API_SERVER } from './index';
import jwt from 'jsonwebtoken';
import authHeader from './authHeader';

async function getAllUser() {
  const res = await fetch(`${API_SERVER}/admin/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createUser({ username, password, email }) {
  const res = await fetch(`${API_SERVER}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  });
  return res.json();
}

async function updateUser({ username, password, email, id }) {
  const res = await fetch(`${API_SERVER}/admin/user/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  });
  return res.json();
}

async function destroyUser({ id }) {
  console.log(id);
  const res = await fetch(`${API_SERVER}/admin/user/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getCurrentUser() {
  let decoded = localStorage.getItem('user');
  decoded = jwt.decode(decoded, { complete: true });
  return decoded.payload.data;
}

export { getAllUser, createUser, destroyUser, updateUser, getCurrentUser };
