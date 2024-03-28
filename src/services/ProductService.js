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

const getColourById = (id) => {
  return CustomAxios.get(`/api/product/color/${id}`);
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

const getBrandById = (id) => {
  return CustomAxios.get(`/api/product/brand/${id}`);
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

const getBasicUnitById = (id) => {
  return CustomAxios.get(`/api/product/basic-unit/${id}`);
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

const getUnitById = (id) => {
  return CustomAxios.get(`/api/product/unit/${id}`);
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

const getPackingUnitById = (id) => {
  return CustomAxios.get(`/api/product/packing-unit/${id}`);
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

const getDescriptionById = (id) => {
  return CustomAxios.get(`/api/product/description/${id}`);
};

const updateDescription = (id, data) => {
  return CustomAxios.patch(`/api/product/description/${id}`, data);
};

const getAllProductCode = () => {
  return CustomAxios.get("/api/product/product-code");
};

const getAllPaginateProductCode = (all) => {
  return CustomAxios.get(`/api/product/product-code/?page=${all}`);
};

const getAllSearchProductCode = (search) => {
  return CustomAxios.get(`/api/product/product-code/?search=${search}`);
};

const getSearchWithPaginateProductCode = (all, search) => {
  return CustomAxios.get(
    `/api/product/product-code/?page=${all}&search=${search}`
  );
};

const createProductCode = (data) => {
  return CustomAxios.post("/api/product/product-code/", data);
};

const getProductCodeById = (id) => {
  return CustomAxios.get(`/api/product/product-code/${id}`);
};

const updateProductCode = (id, data) => {
  return CustomAxios.patch(`/api/product/product-code/${id}`, data);
};

const getAllConsumable = () => {
  return CustomAxios.get("/api/product/consumables");
};

const getAllSearchConsumable = (search) => {
  return CustomAxios.get(`/api/product/consumables/?search=${search}`);
};

const getConsumablePaginate = (currentPage) => {
  return CustomAxios.get(`/api/product/consumables/?page=${currentPage}`);
};

const getConsumablePaginateWithSearch = (currentPage, search) => {
  return CustomAxios.get(
    `/api/product/consumables/?page=${currentPage}&search=${search}`
  );
};

const getConsumableById = (id) => {
  return CustomAxios.get(`/api/product/consumables/${id}`);
};

const updateConsumable = (id, data) => {
  return CustomAxios.patch(`/api/product/consumables/${id}`, data);
};

const createConsumable = (data) => {
  return CustomAxios.post("/api/product/consumables/", data);
};

const getAllFinishGoods = () => {
  return CustomAxios.get("/api/product/finished-goods");
};

const getAllSearchFinishGoods = (search) => {
  return CustomAxios.get(`/api/product/finished-goods/?search=${search}`);
};

const getFinishGoodsPaginate = (currentPage) => {
  return CustomAxios.get(`/api/product/finished-goods/?page=${currentPage}`);
};

const getFinishGoodsPaginateWithSearch = (currentPage, search) => {
  return CustomAxios.get(
    `/api/product/finished-goods/?page=${currentPage}&search=${search}`
  );
};

const createFinishGoods = (data) => {
  return CustomAxios.post("/api/product/finished-goods/", data);
};

const getFinishGoodsById = (id) => {
  return CustomAxios.get(`/api/product/finished-goods/${id}`);
};

const updateFinishGoods = (id, data) => {
  return CustomAxios.patch(`/api/product/finished-goods/${id}`, data);
};

const getAllRawMaterials = () => {
  return CustomAxios.get("/api/product/raw-materials/");
};

const getAllSearchRawMaterials = (search) => {
  return CustomAxios.get(`/api/product/raw-materials/?search=${search}`);
};

const getRawMaterialsPaginate = (currentPage) => {
  return CustomAxios.get(`/api/product/raw-materials/?page=${currentPage}`);
};

const getRawMaterialsPaginateWithSearch = (currentPage, search) => {
  return CustomAxios.get(
    `/api/product/raw-materials/?page=${currentPage}&search=${search}`
  );
};

const createRawMaterials = (data) => {
  return CustomAxios.post("/api/product/raw-materials/", data);
};

const getRawMaterialsById = (id) => {
  return CustomAxios.get(`/api/product/raw-materials/${id}`);
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
  getColourById,
  createColour,
  updateColour,
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  getAllBasicUnit,
  getBasicUnitById,
  createBasicUnit,
  updateBasicUnit,
  getAllUnit,
  createUnit,
  getUnitById,
  updateUnit,
  getAllPackingUnit,
  createPackingUnit,
  getPackingUnitById,
  updatePackingUnit,
  getAllDescription,
  getYesDescription,
  getNoDescription,
  createDescription,
  getDescriptionById,
  updateDescription,
  getAllProductCode,
  getAllPaginateProductCode,
  getAllSearchProductCode,
  getSearchWithPaginateProductCode,
  createProductCode,
  getProductCodeById,
  updateProductCode,
  getAllConsumable,
  getAllSearchConsumable,
  getConsumablePaginate,
  getConsumablePaginateWithSearch,
  createConsumable,
  getConsumableById,
  updateConsumable,
  getAllFinishGoods,
  getAllSearchFinishGoods,
  getFinishGoodsPaginate,
  getFinishGoodsPaginateWithSearch,
  createFinishGoods,
  getFinishGoodsById,
  updateFinishGoods,
  getAllRawMaterials,
  getAllSearchRawMaterials,
  getRawMaterialsPaginate,
  getRawMaterialsPaginateWithSearch,
  createRawMaterials,
  getRawMaterialsById,
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
