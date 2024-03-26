import { useState, useCallback, useEffect, useMemo } from "react";
import ProductService from "../services/ProductService";

const values = {
  someDate: new Date().toISOString().substring(0, 10),
};

const useDynamicFormFields = (initialFields) => {
  const [products, setProducts] = useState(initialFields);
  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = useCallback(async () => {
    try {
      const res = await ProductService.getAllValidPriceList("all");
      setProductOption(res.data);
    } catch (err) {
      console.error("error potential", err);
    }
  }, []);

  const handleAutocompleteChange = useCallback(
    (index, event, value) => {
      let data = [...products];
      const productObj = productOption.find((item) => item.product === value);
      data[index] = {
        ...data[index],
        product: value,
        unit: productObj ? productObj.unit : "",
      };
      setProducts(data);
    },
    [products, productOption]
  );

  const handleFormChange = useCallback(
    (index, event) => {
      let data = [...products];
      data[index][event.target.name ? event.target.name : "product"] = event
        .target.value
        ? event.target.value
        : event.target.textContent;
      setProducts(data);
    },
    [products]
  );

  const addFields = useCallback(() => {
    let newfield = {
      product: "",
      unit: "",
      quantity: "",
      rate: "",
      requested_date: values.someDate,
      special_instructions: "",
    };
    setProducts((prevProducts) => [...prevProducts, newfield]);
  }, []);

  const removeFields = useCallback((index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);

  return {
    products: memoizedProducts,
    handleAutocompleteChange,
    handleFormChange,
    addFields,
    removeFields,
    productOption,
  };
};

export default useDynamicFormFields;
