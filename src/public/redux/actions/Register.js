import axios from 'axios'

const config = {
    headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
  }

export const login = (url,formDataLogin) => ({
    type: "LOGIN_ACCOUNT",
    payload: axios.post(url, {'email':'lampard@gmail.com'}, config)
})

export const addAccount = (url,formData) => ({
  type: "CREATE_ACCOUNT",
  payload: axios.post(url, formData, config)
})

