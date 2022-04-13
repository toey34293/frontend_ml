import axios from 'axios'
import { notification } from 'antd'

const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

Axios.interceptors.request.use(
    async config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response && error.response.status !== 404) { //recheck error.res after connect backend
            notification.error({
                message: (error.response.data && error.response.data.detail) || 'Unknown Subject',
                description: (error.response.data && error.response.data.detail) || 'Unknown detail',
                duration: 5
            })
        } else if (!error.response) {
            notification.error({
                message: 'NETWORK_ERROR',
                description: 'Something went wrong. Please try again later.',
                duration: 5
            })
        }
        if (process.env.NODE_ENV === 'development') console.error('**interceptors error**', error.response)
        return Promise.reject(error)
    }
)

export { Axios }

