import http from './base-api';

const create = (user) => http.post('/register', user)

const login = (user) => http.post('login', user)

const detail = (id) => http.get(`/users/${id}`)

const list = () => http.get('/users')

const update = (user, id) => http.patch(`/users/${id}`, user)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  login,
  detail,
  list, 
  update
}