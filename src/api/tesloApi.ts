import axios from 'axios'

const tesloApi = axios.create({
  baseURL: '/api',

  headers: {
    'Content-Type': 'application/json',
    // Clickjacking Defense Cheat Sheet
    "X-Frame-Options": "DENY",
    // Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet
    // "X-XSRF-TOKEN": "teslo",

  },
})

export default tesloApi
