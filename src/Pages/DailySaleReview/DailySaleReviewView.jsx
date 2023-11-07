import React, { useEffect, useState } from "react";
import { CustomLoader } from "../../Components/CustomLoader";
import { CustomTable } from "../../Components/CustomTable";
import { CustomSearch } from "../../Components/CustomSearch";
import UserProfileService from "../../services/UserProfileService";
import { DailySaleReviewUpdate } from "./DailySaleReviewUpdate";
import { Popup } from "../../Components/Popup";

export const DailySaleReviewView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailySalesReviewData, setDailySalesReviewData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState();
  useEffect(() => {
    getDailySaleReviewData();
  }, []);

  const getDailySaleReviewData = async () => {
    setIsLoading(true);
    try {
      const response = await UserProfileService.getDailySaleReviewData();
      console.log(response);
      if (response && response.data) {
        setDailySalesReviewData(response.data);
      }
    } catch (err) {
      console.error("Error fetching daily sales review data", err);
    } finally {
      setIsLoading(false);
    }
  };
  const openInPopup = (item) => {
    setRecordForEdit(item.id);
    setOpenPopup(true);
  };
  const Tableheaders = ["Sales Person", "Reporting Manager", "Action"];

  const tableData = dailySalesReviewData
    ? [
        {
          "Sales Person": dailySalesReviewData.sales_person_name || "-",
          "Reporting Manager": dailySalesReviewData.reporting_manager || "-",
        },
      ]
    : [];

  return (
    <>
      <CustomLoader open={isLoading} />
      <div style={styles.container}>
        <CustomSearch
          filterSelectedQuery={searchQuery}
          handleInputChange={(event) => setSearchQuery(event.target.value)}
          getResetData={() => setSearchQuery("")}
        />
        {dailySalesReviewData && (
          <CustomTable
            headers={Tableheaders}
            data={tableData}
            openInPopup={openInPopup}
          />
        )}
      </div>
      <Popup
        fullScreen={true}
        title={"Update Review"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <DailySaleReviewUpdate
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
        />
      </Popup>
    </>
  );
};
const styles = {
  container: {
    padding: "16px",
    margin: "16px",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(255, 255, 255)",
  },
};
