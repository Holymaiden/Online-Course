import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllCart() {
  const res = await fetch(`${API_SERVER}/admin/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByUserCart() {
  const res = await fetch(`${API_SERVER}/admin/cart/ID`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdCart(id) {
  const res = await fetch(`${API_SERVER}/admin/cart/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createCart(data) {
  const res = await fetch(`${API_SERVER}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      user_id: data.user_id,
      course_id: data.course_id,
      price: data.price
    })
  });
  return res.json();
}

async function updateCart(data) {
  const res = await fetch(`${API_SERVER}/cart/` + data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      user_id: data.user_id,
      course_id: data.course_id,
      price: data.price
    })
  });
  return res.json();
}

async function destroyCart(id) {
  const res = await fetch(`${API_SERVER}/cart/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllCart,
  getByIdCart,
  getByUserCart,
  createCart,
  updateCart,
  destroyCart
};
