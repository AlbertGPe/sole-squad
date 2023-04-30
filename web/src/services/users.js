import http from './base-api';

const create = (user) => http.post('/register', user)
  .then((res) => res.data)

const login = user => http.post('login', user)
  .then((res) => res.data)

const detail = (id) => http.get(`/users/${id}`)
  .then((res) => res.data)

const list = () => http.get('/users')
  .then((res) => res.data)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  login,
  detail,
  list
}