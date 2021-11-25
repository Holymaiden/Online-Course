import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllPayment() {
  const res = await fetch(`${API_SERVER}/admin/payment`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdPayment(id) {
  const res = await fetch(`${API_SERVER}/admin/payment/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createPayment() {
  const res = await fetch(`${API_SERVER}/admin/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function updatePayment(id) {
  const res = await fetch(`${API_SERVER}/admin/payment/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function destroyPayment(id) {
  const res = await fetch(`${API_SERVER}/admin/payment/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllPayment,
  getByIdPayment,
  createPayment,
  updatePayment,
  destroyPayment
};
