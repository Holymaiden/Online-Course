import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllSchedule() {
  const res = await fetch(`${API_SERVER}/schedule`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createSchedule(data) {
  const res = await fetch(`${API_SERVER}/admin/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      course_id: data.course_id,
      from: data.from,
      until: data.until
    })
  });
  return res.json();
}

async function updateSchedule(data) {
  const res = await fetch(`${API_SERVER}/admin/schedule/` + data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      course_id: data.course_id,
      from: data.from,
      until: data.until
    })
  });
  return res.json();
}

async function destroySchedule(id) {
  const res = await fetch(`${API_SERVER}/admin/schedule/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export { getAllSchedule, createSchedule, updateSchedule, destroySchedule };
