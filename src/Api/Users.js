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

async function createUser({ username, password, email, avatar }) {
  var formdata = new FormData();
  formdata.append('username', username);
  formdata.append('email', email);
  formdata.append('password', password);
  formdata.append('avatar', avatar);

  const res = await fetch(`${API_SERVER}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
  });
  return res.json();
}

async function createPeserta(data) {
  const res = await fetch(`${API_SERVER}/registerPeserta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      username: data.firstName + data.lastName,
      email: data.email,
      password: data.password
    })
  });
  return res.json();
}

async function updateUser(data) {
  var formdata = new FormData();
  formdata.append('username', data.username);
  formdata.append('email', data.email);
  formdata.append('password', data.password);
  formdata.append('avatar', data.avatar);

  const res = await fetch(`${API_SERVER}/admin/user/` + data.id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
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
  if (!decoded) {
    return null;
  }
  decoded = jwt.decode(decoded, { complete: true });
  return decoded.payload.data;
}

export {
  getAllUser,
  createUser,
  destroyUser,
  updateUser,
  getCurrentUser,
  createPeserta
};
