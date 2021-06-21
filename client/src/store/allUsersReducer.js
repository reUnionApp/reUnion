// all users reducer -- ** admin only access to get a list of all users that are currently registed
import axios from 'axios'

const GET_USERS = 'GET_USERS'

const _getUsers = users => {
  return {
    type: GET_USERS,
    users
  }
}

export const getUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(_getUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initalState = []

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
