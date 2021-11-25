import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllTeachingMaterial() {
  const res = await fetch(`${API_SERVER}/teachingMaterial`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdTeachingMaterial(slug) {
  const res = await fetch(`${API_SERVER}/teachingMaterial/` + slug, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createTeachingMaterial() {
  const res = await fetch(`${API_SERVER}/admin/teachingMaterial`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function updateTeachingMaterial(id) {
  const res = await fetch(`${API_SERVER}/admin/teachingMaterial/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function destroyTeachingMaterial(id) {
  const res = await fetch(
    `${API_SERVER}/admin/teachingMaterial/destroy/` + id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader()
      }
    }
  );
  return res.json();
}

export {
  getAllTeachingMaterial,
  createTeachingMaterial,
  getByIdTeachingMaterial,
  destroyTeachingMaterial,
  updateTeachingMaterial
};
