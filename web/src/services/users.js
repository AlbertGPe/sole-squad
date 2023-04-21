import http from './base-api';

const create = (user) => http.post('/register', user)
  .then((res) => res.data)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create
}