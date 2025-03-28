const CACHE_NAME = 'codigo-coding-test'

export const setToken = (token) => localStorage.setItem(CACHE_NAME, token)

export const getToken = () => localStorage.getItem(CACHE_NAME)

export const removeToken = () => localStorage.removeItem(CACHE_NAME)