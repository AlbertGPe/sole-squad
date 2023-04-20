import http from './base-api';

const list = () => http.get('/sneakers')
  .then((res) => res.data)

export default {
  list
}