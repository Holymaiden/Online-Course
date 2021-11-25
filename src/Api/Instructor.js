import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllInstructor() {
  const res = await fetch(`${API_SERVER}/admin/instructor`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdInstructor(id) {
  const res = await fetch(`${API_SERVER}/instructor/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createInstructor(data) {
  console.log(data);
  const res = await fetch(`${API_SERVER}/admin/instructor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      user_id: data.user_id,
      course_id: data.course_id
    })
  });
  return res.json();
}

async function updateInstructor(data) {
  console.log(data);
  const res = await fetch(`${API_SERVER}/admin/instructor/` + data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      user_id: data.user_id,
      course_id: data.course_id
    })
  });
  return res.json();
}

async function destroyInstructor(id) {
  const res = await fetch(`${API_SERVER}/admin/instructor/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllInstructor,
  getByIdInstructor,
  createInstructor,
  updateInstructor,
  destroyInstructor
};
