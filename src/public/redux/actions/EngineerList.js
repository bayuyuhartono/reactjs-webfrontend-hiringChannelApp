import axios from 'axios'
import Cookies from 'js-cookie'

const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "email":  Cookies.get('hiringEmail'),
      "Authorization": "Bearer " + Cookies.get('hiringToken')
    }
  }

export const fetchEngineers = (url) => ({
    type: "FETCH_ENGINEERS",
    payload: axios.get(url, config)
})

export const fetchEngineerSingle = (url) => ({
  type: "FETCH_SINGLE_ENGINEER",
  payload: axios.get(url, config)
})
