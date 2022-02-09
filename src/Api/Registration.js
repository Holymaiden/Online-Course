import { API_SERVER } from './index';
import authHeader from './authHeader';

async function uploadCV(data) {
  var formdata = new FormData();
  formdata.append('cv', data.cv);

  const res = await fetch(`${API_SERVER}/registrations`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
  });
  return res.json();
}

async function updateRegistration(data) {
  var formdata = new FormData();
  formdata.append('cv', data.cv);
  formdata.append('status', data.status);

  const res = await fetch(`${API_SERVER}/admin/registrations/` + data.id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
  });
  return res.json();
}

async function getAllRegistration() {
  const res = await fetch(`${API_SERVER}/admin/registrations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdRegistration(id) {
  const res = await fetch(`${API_SERVER}/registrations/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function destroyRegistration(id) {
  const res = await fetch(`${API_SERVER}/admin/registrations/` + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  uploadCV,
  updateRegistration,
  getAllRegistration,
  getByIdRegistration,
  destroyRegistration
};
