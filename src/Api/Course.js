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

async function getCourseBySlug(slug) {
  const res = await fetch(`${API_SERVER}/course/` + slug, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
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

async function createCourse({ title, description, price, category, image }) {
  var formdata = new FormData();
  formdata.append('title', title);
  formdata.append('description', description);
  formdata.append('price', price);
  formdata.append('category', category);
  formdata.append('image', image);

  const res = await fetch(`${API_SERVER}/admin/course`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
  });
  return res.json();
}

async function updateCourse(data) {
  var formdata = new FormData();
  formdata.append('title', data.title);
  formdata.append('description', data.description);
  formdata.append('price', data.price);
  formdata.append('category', data.category);
  formdata.append('image', data.image);
  formdata.append('status', data.status);
  const res = await fetch(`${API_SERVER}/admin/course/` + data.id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader()
    },
    body: formdata
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
  getAllCourseKursus,
  getCourseBySlug
};
