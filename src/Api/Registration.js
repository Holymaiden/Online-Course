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

export { uploadCV };
