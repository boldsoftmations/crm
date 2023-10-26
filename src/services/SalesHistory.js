import CustomAxios from "./api";

const getSalesHistoryServiceData = (id, typeValue) => {
    return CustomAxios.get(`/api/customer/sales-history/${id}?type=${typeValue}`);
  };

  const SalesHistory = {
    getSalesHistoryServiceData
  };

  export default SalesHistory;