import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllCourse() {
  const res = await fetch(`${API_SERVER}/admin/course`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getAllCoursePaging(search = '') {
  const res = await fetch(`${API_SERVER}/course/paging/list?search=` + search, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getAllCourseKursus(data) {
  const res = await fetch(
    `${API_SERVER}/course/kursus/list?category=` +
      data.category +
      '&instructor=' +
      data.instructor +
      '&star=' +
      data.star,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader()
      }
    }
  );
  return res.json();
}

async function getPopularCourse(limit) {
  const res = await fetch(`${API_SERVER}/popularcourse?limit=` + limit, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createCourse({ title, description, price, category }) {
  const res = await fetch(`${API_SERVER}/admin/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      category_id: category,
      title: title,
      description: description,
      price: price
    })
  });
  return res.json();
}

async function updateCourse(data) {
  const res = await fetch(`${API_SERVER}/admin/course/` + data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      category_id: data.category,
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status
    })
  });
  return res.json();
}

async function destroyCourse(id) {
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
  getAllCourse,
  createCourse,
  updateCourse,
  destroyCourse,
  getPopularCourse,
  getAllCoursePaging,
  getAllCourseKursus
};
