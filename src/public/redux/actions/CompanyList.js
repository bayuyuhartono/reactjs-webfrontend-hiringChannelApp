import axios from 'axios'
import Cookies from 'js-cookie'

const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "email":  Cookies.get('hiringEmail'),
      "Authorization": "Bearer " + Cookies.get('hiringToken')
    }
  }

export const fetchCompanys = (url) => ({
    type: "FETCH_COMPANYS",
    payload: axios.get(url, config)
})

export const fetchCompanySingle = (url) => ({
  type: "FETCH_SINGLE_COMPANY",
  payload: axios.get(url, config)
})
