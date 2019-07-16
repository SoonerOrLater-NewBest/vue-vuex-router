import Request from '../common/request';

export function fetchList(query) {
  return Request.get({
    url: '/article/list',
    params: query
  })
}

export function fetchArticle(id) {
  return Request.get({
    url: '/article/detail',
    params: { id }
  })
}

export function fetchPv(pv) {
  return Request.get({
    url: '/article/pv',
    params: { pv }
  })
}

export function createArticle(data) {
  return Request.post({
    url: '/article/create',
    data
  })
}

export function updateArticle(data) {
  return Request.post({
    url: '/article/update',
    data
  })
}
