import apiInvoker from './apiInvoker'

const base = '/users'
const endpoints = {
  create: base,
  update: base,
  delete: base,
  getById: base.concat('/${id}')
}

const getById = id => {
  apiInvoker.get(endpoints.getById, { params: { id } })
}
