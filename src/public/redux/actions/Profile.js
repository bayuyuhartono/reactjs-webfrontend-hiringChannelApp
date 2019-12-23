import axios from 'axios'
import Cookies from 'js-cookie'

const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "email":  Cookies.get('hiringEmail'),
      "Authorization": "Bearer " + Cookies.get('hiringToken')
    }
  }
export const fetchProfile = (url) => ({
  type: "FETCH_PROFILE",
  payload: axios.get(url, config)
})

export const updateAccount = (url,formData) => ({
  type: "UPDATE_ACCOUNT",
  payload: axios.put(url, formData, config)
})

export const deleteAccount = (url) => ({
  type: "DELETE_ACCOUNT",
  payload: axios.delete(url, config)
})


