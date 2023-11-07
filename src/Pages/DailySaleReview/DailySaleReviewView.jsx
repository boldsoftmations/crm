import React, { useEffect, useState } from "react";
import { CustomLoader } from "../../Components/CustomLoader";
import { CustomTable } from "../../Components/CustomTable";
import { CustomSearch } from "../../Components/CustomSearch";
import UserProfileService from "../../services/UserProfileService";

export const DailySaleReviewView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailySalesReviews, setDailySalesReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getDailySaleReviewData();
  }, []);

  const getDailySaleReviewData = async () => {
    setIsLoading(true);
    try {
      const response = await UserProfileService.getDailySaleReviewData();
      console.log(response); // Add this line to log the response
      if (Array.isArray(response.data)) {
        // Check if the response.data is an array
        setDailySalesReviews(response.data);
      } else {
        console.error("Data is not an array", response.data);
        setDailySalesReviews([]); // Set to empty array if not an array
      }
    } catch (err) {
      console.error("Error fetching daily sales review data", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const Tableheaders = ["SALES PERSON", "LAST NAME", "EMAIL", "ACTION"];

  const filteredDailySalesReviews = dailySalesReviews.filter((review) =>
    review.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = filteredDailySalesReviews.map((review) => ({
    first_name: review.sales_person_name || "-",
    last_name: review.total_answer_count || "-",
    email: review.email || "-",
  }));

  return (
    <>
      <CustomLoader open={isLoading} />
      <div style={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1em",
          }}
        >
          <CustomSearch
            filterSelectedQuery={searchQuery}
            handleInputChange={handleInputChange}
            getResetData={() => setSearchQuery("")}
          />
        </div>
        {/* {filteredDailySalesReviews.length > 0 ? ( */}
        <CustomTable headers={Tableheaders} data={data} />

        {/* )} */}
      </div>
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
  // Add any other styles you need here
};
