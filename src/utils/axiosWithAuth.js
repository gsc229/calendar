import axios from 'axios'
import {routinesBaseUrl} from '../config/config'
const jwt = JSON.parse(localStorage.getItem('jtw'))

const axiosWithAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: jwt ? `Bearer ${jwt.token}` : '',    
    Accept: 'application/json'
  },
  
  responseType: 'json'
})