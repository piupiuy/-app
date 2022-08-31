import requests from '@/api/request'

export const reqRegister = (params) => requests({url: '/register', method: 'post', data: params})
export const reqLogin = (params) => requests({url: '/storelogin', method: 'post', data: params})
export const reqStoreInfo = (params) => requests({url: `/info`, method: 'post', data: params})
export const reqStoreDiscount = (params) => requests({url: '/discount', method: 'post', data: params})
export const reqDishList = (params) => requests({url: '/dishlist', method: 'post', data: params})
