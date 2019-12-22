import axios from 'axios'

export const fetchSeries = _ => ({
    type: "FETCH_ENGINEERS",
    payload: axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/engineer`)
})