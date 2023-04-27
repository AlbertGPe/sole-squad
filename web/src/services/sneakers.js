import http from './base-api';

const list = () => http.get('/sneakers')
  .then((res) => res.data)

const detail = (id) => http.get(`/sneakers/${id}`)
  .then((res) => res.data)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list,
  detail
}