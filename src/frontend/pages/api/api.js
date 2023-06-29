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
const API_GET_SECTION_ID = `${BASE_URL}user/get-sectionid/`;
const API_GET_ALL_ORGANIZATIONS = `${BASE_URL}user/get-all-organizations`;
const API_POST_NEW_ORGANIZATION = `${BASE_URL}user/post-new-organization`;
const API_UPDATE_EMAILS = `${BASE_URL}user/change-organization-emails`;
const API_DELETE_ACCOUNT = `${BASE_URL}user/delete-account/`;
const API_GET_ALL_SECTIONS = `${BASE_URL}user/get-all-sections`;
const API_MAKE_FULL_REVIEW = `${BASE_URL}user/make-full-review`;
const API_MAKE_LIGHT_REVIEW = `${BASE_URL}user/make-light-review`;
const API_GET_ONE_REVIEW = `${BASE_URL}user/get-one-review/`;
const API_GET_ALL_REVIEWS_OF_A_PAPER = `${BASE_URL}user/get-all-reviews-of-a-paper/`;
const API_USER_GET_ASSIGNED_PAPERS = `${BASE_URL}user/get-assigned-papers/`;

//SELECTION ASSISTANT EDITOR
const API_ALL_SECTION_EDITORS = `${BASE_URL}sae/all-section-editors`;
const API_GET_ALL_CHIEF_EDITORS = `${BASE_URL}sae/get-all-chief-editors`;
const API_GET_ALL_REVIEWERS = `${BASE_URL}sae/get-all-reviewers`;
const API_CHANGE_SECTION_EDITOR_SECTION = `${BASE_URL}sae/section-editor-change-section`;
const API_CHANGE_ROLE = `${BASE_URL}sae/userrole/`;
const API_PUT_CHIEF_EDITOR_SECTION = `${BASE_URL}sae/put-chief-editor`;
const API_ASSIGN_REVIEWERS_BY_ALGO = `${BASE_URL}sae/assign-reviewers-by-algo`;
const API_ASSIGN_PAPERS_BY_ALGO = `${BASE_URL}sae/assign-papers-by-algo`;
const API_ASSIGN_PAPERS_TO_EDITORAL = `${BASE_URL}sae/assign-editoral-by-algo`;
const API_SEND_REMINDER = `${BASE_URL}sae/send-reminder`;

//PAPER
const API_POST_PAPER = `${BASE_URL}paper/post-paper`;
const API_GET_ALL_PAPERS = `${BASE_URL}paper/get-all-papers`;
const API_GET_SECTION_PAPERS = `${BASE_URL}paper/get-section-paper/`;
const API_GET_PAPER = `${BASE_URL}paper/get-paper/`;
const API_SORT_BEST_PAPERS = `${BASE_URL}paper/sort-best-papers`;
const API_GET_SECTIONS_BEST_PAPERS = `${BASE_URL}paper/get-sections-best-papers/`;

//REVIEWER
const API_REVIEWER_GRADE = `${BASE_URL}reviewer/put-grade/`;
const API_REVIEWER_GET_GRADES = `${BASE_URL}reviewer/get-grade/`;
const API_REVIEWER_PUT_BID_LEVEL = `${BASE_URL}reviewer/put-bid-level/`;
const API_REVIEWER_GET_ALL_PAPERITEMS =`${BASE_URL}reviewer/get-paper-items/`;

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
  API_DELETE_ACCOUNT,
  API_GET_ALL_ORGANIZATIONS,
  API_POST_NEW_ORGANIZATION,
  API_UPDATE_EMAILS,
  API_PUT_NEW_PASSWORD,
  API_CHANGE_USER_INFO,
  API_GET_ALL_CHIEF_EDITORS,
  API_GET_ALL_SECTIONS,
  API_ASSIGN_REVIEWERS_BY_ALGO,
  API_PUT_CHIEF_EDITOR_SECTION,
  API_GET_ALL_REVIEWERS,
  API_REVIEWER_PUT_BID_LEVEL,
  API_REVIEWER_GET_ALL_PAPERITEMS,
  API_ASSIGN_PAPERS_BY_ALGO,
  API_USER_GET_ASSIGNED_PAPERS,
  API_MAKE_FULL_REVIEW,
  API_GET_ONE_REVIEW,
  API_ASSIGN_PAPERS_TO_EDITORAL,
  API_GET_ALL_REVIEWS_OF_A_PAPER,
  API_MAKE_LIGHT_REVIEW,
  API_SEND_REMINDER,
  API_SORT_BEST_PAPERS,
  API_GET_SECTIONS_BEST_PAPERS,
};
