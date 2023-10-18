import CustomAxios from "./api";

const getProfile = () => {
  return CustomAxios.get(`/api/user/profile/`);
};

const UserProfileService = {
  getProfile,
};

export default UserProfileService;
