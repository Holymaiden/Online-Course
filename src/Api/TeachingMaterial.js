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

async function getBySlugTeachingMaterial(slug) {
  const res = await fetch(`${API_SERVER}/teachingMaterial/slug/` + slug, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createTeachingMaterial(data) {
  var formdata = new FormData();
  formdata.append('course_id', data.course_id);
  formdata.append('title', data.title);
  formdata.append('video', data.content);

  const res = await fetch(`${API_SERVER}/admin/teachingMaterial`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
  });
  return res.json();
}

async function updateTeachingMaterial(data) {
  var formdata = new FormData();
  formdata.append('course_id', data.course_id);
  formdata.append('title', data.title);
  formdata.append('video', data.content);
  formdata.append('status', data.status);

  const res = await fetch(`${API_SERVER}/admin/teachingMaterial/` + data.id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
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

async function getExistCourse(slug) {
  const res = await fetch(`${API_SERVER}/teachingMaterial/have/` + slug, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllTeachingMaterial,
  createTeachingMaterial,
  getByIdTeachingMaterial,
  destroyTeachingMaterial,
  updateTeachingMaterial,
  getBySlugTeachingMaterial,
  getExistCourse
};
