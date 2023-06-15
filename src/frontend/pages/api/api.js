const BASE_URL = "http://localhost:8000/";

//AUTH
const API_SIGN_UP = `${BASE_URL}auth/sign-up`;
const API_LOGIN = `${BASE_URL}auth/login`;
const API_PROFILE = `${BASE_URL}auth/profile/`;
const API_ALL_USERS = `${BASE_URL}user/all-users/`;
const API_CHANGE_ROLE = `${BASE_URL}user/userrole/`;
const API_REVIEWER_GRADE = `${BASE_URL}reviewer/put-grade/`;
const API_REVIEWER_GET_GRADES = `${BASE_URL}reviewer/get-grade/`;

module.exports = {
  API_SIGN_UP,
  API_LOGIN,
  API_PROFILE,
  API_ALL_USERS,
  API_CHANGE_ROLE,
  API_REVIEWER_GRADE,
  API_REVIEWER_GET_GRADES,
};
