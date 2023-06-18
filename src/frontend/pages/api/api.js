const BASE_URL = "http://localhost:8000/";

//AUTH
const API_SIGN_UP = `${BASE_URL}auth/sign-up`;
const API_LOGIN = `${BASE_URL}auth/login`;
const API_PROFILE = `${BASE_URL}auth/profile/`;
const API_ALL_USERS = `${BASE_URL}user/all-users/`;
const API_CHANGE_ROLE = `${BASE_URL}user/userrole/`;
const API_RESET_PASSWORD = `${BASE_URL}auth/post-reset-password`;
const API_GET_NEW_PASSWORD = `${BASE_URL}auth/get-new-password/`;
const API_POST_NEW_PASSWORD = `${BASE_URL}auth/post-new-password`;
const API_ALL_SECTION_EDITORS = `${BASE_URL}user/all-section-editors`;
const API_CHANGE_SECTION_EDITOR_SECTION = `${BASE_URL}user/section-editor-change-section`;
const API_GET_SECTION_ID =`${BASE_URL}user/get-sectionid/`;

//PAPER
const API_POST_PAPER = `${BASE_URL}paper/post-paper`;
const API_GET_ALL_PAPERS = `${BASE_URL}paper/get-all-papers`;
const API_GET_SECTION_PAPERS = `${BASE_URL}paper/get-section-paper/`;
const API_GET_PAPER = `${BASE_URL}paper/get-paper/`;

//REVIEWER
const API_REVIEWER_GRADE = `${BASE_URL}reviewer/put-grade/`;
const API_REVIEWER_GET_GRADES = `${BASE_URL}reviewer/get-grade/`;


module.exports = {
  API_SIGN_UP,
  API_LOGIN,
  API_PROFILE,
  API_ALL_USERS,
  API_CHANGE_ROLE,
  API_RESET_PASSWORD,
  API_REVIEWER_GRADE,
  API_REVIEWER_GET_GRADES,
  API_GET_NEW_PASSWORD,
  API_POST_NEW_PASSWORD,
  API_ALL_SECTION_EDITORS,
  API_CHANGE_SECTION_EDITOR_SECTION,
  API_POST_PAPER,
  API_GET_SECTION_ID,
  API_GET_ALL_PAPERS,
  API_GET_SECTION_PAPERS,
  API_GET_PAPER,
};
