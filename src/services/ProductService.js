import CustomAxios from "./api";

const getAllColour = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/color/?${params.toString()}`);
};

const createColour = (data) => {
  return CustomAxios.post("/api/product/color/", data);
};

const updateColour = (id, data) => {
  return CustomAxios.patch(`/api/product/color/${id}`, data);
};

const getAllBrand = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/brand/?${params.toString()}`);
};

const createBrand = (data) => {
  return CustomAxios.post("/api/product/brand/", data);
};

const updateBrand = (id, data) => {
  return CustomAxios.patch(`/api/product/brand/${id}`, data);
};

const getAllBasicUnit = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/basic-unit/?${params.toString()}`);
};

const createBasicUnit = (data) => {
  return CustomAxios.post("/api/product/basic-unit/", data);
};

const updateBasicUnit = (id, data) => {
  return CustomAxios.patch(`/api/product/basic-unit/${id}`, data);
};

const getAllUnit = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/unit/?${params.toString()}`);
};

const createUnit = (data) => {
  return CustomAxios.post("/api/product/unit/", data);
};

const updateUnit = (id, data) => {
  return CustomAxios.patch(`/api/product/unit/${id}`, data);
};

const getAllPackingUnit = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/packing-unit/?${params.toString()}`);
};

const createPackingUnit = (data) => {
  return CustomAxios.post("/api/product/packing-unit/", data);
};

const updatePackingUnit = (id, data) => {
  return CustomAxios.patch(`/api/product/packing-unit/${id}`, data);
};

const getAllDescription = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/description/?${params.toString()}`);
};

const getYesDescription = () => {
  return CustomAxios.get("/api/product/description-yes");
};

const getNoDescription = () => {
  return CustomAxios.get("/api/product/description-no");
};

const createDescription = (data) => {
  return CustomAxios.post("/api/product/description/", data);
};

const updateDescription = (id, data) => {
  return CustomAxios.patch(`/api/product/description/${id}`, data);
};

const getAllProductCode = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/product-code/?${params.toString()}`);
};

const createProductCode = (data) => {
  return CustomAxios.post("/api/product/product-code/", data);
};

const updateProductCode = (id, data) => {
  return CustomAxios.patch(`/api/product/product-code/${id}`, data);
};

const getAllConsumable = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/consumables/?${params.toString()}`);
};

const updateConsumable = (id, data) => {
  return CustomAxios.patch(`/api/product/consumables/${id}`, data);
};

const createConsumable = (data) => {
  return CustomAxios.post("/api/product/consumables/", data);
};

const getAllFinishGoods = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/finished-goods/?${params.toString()}`);
};

const createFinishGoods = (data) => {
  return CustomAxios.post("/api/product/finished-goods/", data);
};

const updateFinishGoods = (id, data) => {
  return CustomAxios.patch(`/api/product/finished-goods/${id}`, data);
};

const getAllRawMaterials = (page, searchQuery) => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  return CustomAxios.get(`api/product/raw-materials/?${params.toString()}`);
};

const createRawMaterials = (data) => {
  return CustomAxios.post("/api/product/raw-materials/", data);
};

const updateRawMaterials = (id, data) => {
  return CustomAxios.patch(`/api/product/raw-materials/${id}`, data);
};

const getAllPriceList = () => {
  return CustomAxios.get("/api/product/pricelist/");
};

const getAllPaginatePriceList = (filter, all) => {
  return CustomAxios.get(`/api/product/pricelist/?${filter}=${all}`);
};

const getAllSearchPriceList = (type, search) => {
  return CustomAxios.get(`/api/product/pricelist/?${type}=${search}`);
};

const getAllPriceListPaginate = (currentPage, type, search) => {
  return CustomAxios.get(
    `/api/product/pricelist/?page=${currentPage}&${type}=${search}`
  );
};

const getPriceListPaginate = (currentPage) => {
  return CustomAxios.get(`/api/product/pricelist/?page=${currentPage}`);
};

const createPriceList = (data) => {
  return CustomAxios.post("/api/product/pricelist/", data);
};

const getPriceListById = (id) => {
  return CustomAxios.get(`/api/product/pricelist/${id}`);
};

const getAllValidPriceList = (all) => {
  return CustomAxios.get(`/api/product/pricelist/?page=${all}`);
};

const updatePriceList = (id, data) => {
  return CustomAxios.patch(`/api/product/pricelist/${id}`, data);
};

const getAllProduct = () => {
  return CustomAxios.get("/api/product/product/");
};

const ProductService = {
  getAllColour,
  createColour,
  updateColour,
  getAllBrand,
  createBrand,
  updateBrand,
  getAllBasicUnit,
  createBasicUnit,
  updateBasicUnit,
  getAllUnit,
  createUnit,
  updateUnit,
  getAllPackingUnit,
  createPackingUnit,
  updatePackingUnit,
  getAllDescription,
  getYesDescription,
  getNoDescription,
  createDescription,
  updateDescription,
  getAllProductCode,
  createProductCode,
  updateProductCode,
  getAllConsumable,
  createConsumable,
  updateConsumable,
  getAllFinishGoods,
  createFinishGoods,
  updateFinishGoods,
  getAllRawMaterials,
  createRawMaterials,
  updateRawMaterials,
  getAllPriceList,
  getAllPaginatePriceList,
  getAllSearchPriceList,
  getAllPriceListPaginate,
  getPriceListPaginate,
  createPriceList,
  getPriceListById,
  getAllValidPriceList,
  updatePriceList,
  getAllProduct,
};

export default ProductService;
