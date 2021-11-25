export default function authHeader() {
  const user = localStorage.getItem('user');

  if (user) {
    return 'Bearer ' + user;
  } else {
    return {};
  }
}
