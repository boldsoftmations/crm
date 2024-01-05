import { Box, Button, Chip, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../../Components/CustomTextField";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import { styled } from "@mui/material/styles";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const PurchaseInvoiceCreate = (props) => {
  const { setOpenPopup, recordForEdit } = props;
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(
    recordForEdit.products.map((product) => ({
      ...product,
      amount: product.order_quantity * product.rate,
    }))
  );

  const handleFormChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...products];
    list[index][name] = value;
    if (list[index].order_quantity !== "" && list[index].rate !== "") {
      list[index].amount = (
        list[index].order_quantity * list[index].rate
      ).toFixed(2);
    }

    setProducts(list);
  };

  const createPackingListDetails = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const req = {
        grn: recordForEdit.grn_no,
        products_data: recordForEdit.products,
        rate: recordForEdit.rate,
      };
      await InventoryServices.createPurchaseInvoiceData(req);
      console.log("createing Packing list");
      setOpenPopup(false);
      setOpen(false);
    } catch (error) {
      console.log("createing Packing list error", error);
      setOpen(false);
    }
  };

  return (
    <div>
      <CustomLoader open={open} />

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createPackingListDetails(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Vendor"
              variant="outlined"
              value={recordForEdit.vendor ? recordForEdit.vendor : ""}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Invoice No"
              variant="outlined"
              value={
                recordForEdit.packing_list_no
                  ? recordForEdit.packing_list_no
                  : ""
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="PRODUCT" />
              </Divider>
            </Root>
          </Grid>
          {products.map((input, index) => {
            return (
              <>
                <Grid key={index} item xs={12} sm={4}>
                  <CustomTextField
                    fullWidth
                    name="product"
                    size="small"
                    label="Product"
                    variant="outlined"
                    value={input.products || ""}
                    disabled={true}
                  />
                </Grid>
                <Grid key={index} item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    size="small"
                    label="Unit"
                    variant="outlined"
                    value={input.unit || ""}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="order_quantity"
                    size="small"
                    label="Quantity"
                    variant="outlined"
                    value={input.order_quantity || ""}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="rate"
                    size="small"
                    label="Rate"
                    variant="outlined"
                    value={input.rate}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="amount"
                    size="small"
                    label="Amount"
                    variant="outlined"
                    value={
                      input.order_quantity !== "" && input.rate !== ""
                        ? (input.order_quantity * input.rate).toFixed(2)
                        : ""
                    }
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};
