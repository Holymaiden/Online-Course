import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllTransaction() {
  const res = await fetch(`${API_SERVER}/admin/transaction`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdTransaction(id) {
  const res = await fetch(`${API_SERVER}/admin/transaction/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createTransaction() {
  const res = await fetch(`${API_SERVER}/admin/transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function updateTransaction(id) {
  const res = await fetch(`${API_SERVER}/admin/transaction/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function destroyTransaction(id) {
  const res = await fetch(`${API_SERVER}/admin/transaction/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllTransaction,
  getByIdTransaction,
  createTransaction,
  updateTransaction,
  destroyTransaction
};
