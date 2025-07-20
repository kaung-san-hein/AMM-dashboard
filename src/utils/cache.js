const CACHE_NAME = 'codigo-coding-test'

export const setToken = (token) => localStorage.setItem(CACHE_NAME, token)

export const getToken = () => localStorage.getItem(CACHE_NAME)

export const removeToken = () => localStorage.removeItem(CACHE_NAME)

const STOCK_ALERT_COUNT = 'stock-alert-count'

export const setStockAlertCount = (count) => localStorage.setItem(STOCK_ALERT_COUNT, count)

export const getStockAlertCount = () => localStorage.getItem(STOCK_ALERT_COUNT)

export const removeStockAlertCount = () => localStorage.removeItem(STOCK_ALERT_COUNT)