import axios from 'axios'
import { AUTH_USER, AUTH_ERROR } from './types'

export const signup = (formProps, callback) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/api/Authentication', { username: formProps.email, password: formProps.password })
        console.log(res)
        dispatch({ type: AUTH_USER, payload: res.data.data.token })
        localStorage.setItem('token', res.data.data.token)
        callback()
    } catch (e) {
        // TODO: Log Error
        dispatch({ type: AUTH_ERROR, payload: 'Email in use'})
    }
}

export const signout = () => {
    localStorage.removeItem('token')
    return {
        type: AUTH_USER,
        payload: ''
    }
}

export const signin = (formProps, callback) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/api/Authentication/login', { username: formProps.email, password: formProps.password })
        console.log(res)
        dispatch({ type: AUTH_USER, payload: res.data.data.token })
        localStorage.setItem('token', res.data.data.token)
        callback()
    } catch (e) {
        // TODO: Log Error
        dispatch({ type: AUTH_ERROR, payload: 'invalid login credentials'})
    }
}