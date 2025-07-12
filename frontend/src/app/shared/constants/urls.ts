const BASE_URL = 'http://localhost:5000';

// Users URLs
export const USER_LOGIN_URL = BASE_URL + '/api/user/login';
export const USER_REGISTER_URL = BASE_URL + '/api/user/register';

// Account URLs
export const GET_ALL_ACOUNTS_URL = BASE_URL + '/api/account/';
export const CREATE_NEW_ACCOUNT = BASE_URL + '/api/account/add-account';
export const DELETE_ACOUNTS_BY_ID_URL = BASE_URL + '/api/account/delete-account/:id';

// Bank URLs
export const CREATE_NEW_BANK = BASE_URL + '/api/bank/add-bank';
export const GET_ALL_BANKS_URL = BASE_URL + '/api/bank/';
