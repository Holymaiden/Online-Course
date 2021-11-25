import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllUserCourse() {
  const res = await fetch(`${API_SERVER}/admin/userCourse`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdUserCourse() {
  const res = await fetch(`${API_SERVER}/userCourse/ID`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createUserCourse() {
  const res = await fetch(`${API_SERVER}/userCourse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function updateUserCourse(id) {
  const res = await fetch(`${API_SERVER}/admin/userCourse/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function destroyUserCourse(id) {
  const res = await fetch(`${API_SERVER}/admin/course/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllUserCourse,
  getByIdUserCourse,
  createUserCourse,
  updateUserCourse,
  destroyUserCourse
};
