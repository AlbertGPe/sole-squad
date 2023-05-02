import http from './base-api';

const list = () => http.get('/sneakers')

const detail = (id) => http.get(`/sneakers/${id}`)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list,
  detail
}