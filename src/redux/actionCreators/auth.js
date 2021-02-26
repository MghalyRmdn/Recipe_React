import axios from 'axios'

import { LoginString, RegisterString, LogoutString } from '../actionString'

const url = process.env.REACT_APP_URL

export const postLogin = (data) => {
  return {
    type: LoginString,
    payload: axios.post(url + '/auth/login', data)
  }
}

export const postRegister = (data) => {
  return {
    type: RegisterString,
    payload: axios.post(url + '/auth/signup', data)
  }
}

export const deleteLogout = (token) => {
  return {
    type: LogoutString,
    payload: axios.delete(url + '/auth/logout', {
      headers: {
        "x-access-token": "Bearer " + token,
      }
    })
  }
}
