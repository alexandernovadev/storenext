import axios from 'axios'

const tesloApi = axios.create({
  baseURL: '/api',

  headers: {
    // API7:2023 Server Side Request Forgery
    'Content-Security-Policy': "default-src 'self'; script-src 'none'; object-src 'none';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  }
})

export default tesloApi
