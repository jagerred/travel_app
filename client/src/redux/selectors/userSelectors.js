export const selectUserInfo = state => state.user.userInfo;
export const selectUserEmail = state => state.user.userInfo.email;
export const selectUserCities = state => state.user.userInfo.cities;
export const selectUserServerError = state => state.user.serverError;
