import CustomAxios from "./api";

// Whatsapp routes
const getAllWhatsappGroupData = () => {
  return CustomAxios.get(`/api/customer/whatsapp-group-list`);
};

const getAllWhatsappData = (page, searchQuery) => {
  // Constructing the query parameters
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page);
  }

  if (searchQuery) {
    params.append("search", searchQuery);
  }

  // Sending a GET request with query parameters
  return CustomAxios.get(`/api/user/script/?${params.toString()}`);
};

const createWhatsappData = (data) => {
  return CustomAxios.post("/api/customer/whatsapp-group-list/", data);
};

const updateWhatsappData = (id, data) => {
  return CustomAxios.patch(`/api/user/script/${id}/`, data);
};

const WhatsappGroupService = {
  getAllWhatsappGroupData,
  getAllWhatsappData,
  createWhatsappData,
  updateWhatsappData,
};

export default WhatsappGroupService;
