const BASE_URL = "http://localhost:8000/";

//AUTH
const API_SIGN_UP = `${BASE_URL}auth/sign-up`;
const API_LOGIN = `${BASE_URL}auth/login`;
const API_ALL_USERS = `${BASE_URL}user/all-users/`;
const API_RESET_PASSWORD = `${BASE_URL}auth/post-reset-password`;
const API_GET_NEW_PASSWORD = `${BASE_URL}auth/get-new-password/`;
const API_POST_NEW_PASSWORD = `${BASE_URL}auth/post-new-password`;
const API_PUT_NEW_PASSWORD =`${BASE_URL}auth/put-new-password`;
const API_CHANGE_USER_INFO =`${BASE_URL}auth/change-user-information`;

//USER
const API_PROFILE = `${BASE_URL}user/profile/`;
const API_CHANGE_ROLE = `${BASE_URL}user/userrole/`;
const API_ALL_SECTION_EDITORS = `${BASE_URL}user/all-section-editors`;
const API_CHANGE_SECTION_EDITOR_SECTION = `${BASE_URL}user/section-editor-change-section`;
const API_GET_SECTION_ID = `${BASE_URL}user/get-sectionid/`;
const API_GET_ALL_ORGANIZATIONS = `${BASE_URL}user/get-all-organizations`;
const API_POST_NEW_ORGANIZATION = `${BASE_URL}user/post-new-organization`;
const API_UPDATE_EMAILS = `${BASE_URL}user/change-organization-emails`;

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
  API_GET_ALL_ORGANIZATIONS,
  API_POST_NEW_ORGANIZATION,
  API_UPDATE_EMAILS,
  API_PUT_NEW_PASSWORD,
  API_CHANGE_USER_INFO,
};
