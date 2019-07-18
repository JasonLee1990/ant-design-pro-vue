import apiInvoker from './apiInvoker'

const base = '/users'
const endpoints = {
  create: base,
  update: base,
  delete: base,
  getById: base.concat('/${id}')
}

const getById = id => {
  apiInvoker.get(endpoints.getById, {id})
}

const create = (user = {}) => {
  apiInvoker.post(endpoints.create, user);
}
const update = (user = {}) => {
  apiInvoker.post(endpoints.update, user);
}

const userService = {
  getById,
  create,
  update,
}

export default userService
