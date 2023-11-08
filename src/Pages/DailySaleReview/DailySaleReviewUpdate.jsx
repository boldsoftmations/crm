import React, { useState, useEffect } from "react";
import UserProfileService from "../../services/UserProfileService";

export const DailySaleReviewUpdate = () => {
  const [dailySalesReviewData, setDailySalesReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("Error fetching daily sales review data: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderForecast = () => {
    return dailySalesReviewData.forecast.map((item, index) => (
      <div key={index}>
        {item.description} - Forecast: {item.forecast}, Actual: {item.actual},
        Percentage: {item.percentage}%
      </div>
    ));
  };

  const renderPendingOrders = () => {
    return dailySalesReviewData.pending_order.map((order, index) => (
      <div key={index}>
        {order.product__description__name} - Pending Quantity:{" "}
        {order.total_pending_quantity}
      </div>
    ));
  };
  return (
    <div>
      <h1>Daily Sales Review Update</h1>
      <div>
        <strong>Sales Person:</strong> {dailySalesReviewData.sales_person_name}
      </div>
      <div>
        <strong>
          1. No. of new customer till from the start of the month:
        </strong>{" "}
        {dailySalesReviewData.new_customer}
      </div>
      <div>
        <strong>2. No. of new customers added today:</strong>{" "}
        {dailySalesReviewData.today_new_customer}
      </div>
      <div>
        <strong>3. No of customer assign:</strong>{" "}
        {dailySalesReviewData.assigned_customer}
      </div>
      <div>
        <strong>4. No of dead customer:</strong>{" "}
        {dailySalesReviewData.dead_customer}
      </div>
      <div>
        <strong>5. Kyc pending – no of customer where kyc pending:</strong>{" "}
        {dailySalesReviewData.incomplete_kyc}
      </div>
      <div>
        <strong>
          6. Potential pending - no of customer where potential pending:
        </strong>{" "}
        {dailySalesReviewData.incomplete_potential}
      </div>
      <div>
        <strong>7. Total call (Answered):</strong>{" "}
        {dailySalesReviewData.total_answer_count}
      </div>
      <div>
        <strong>8. Follow Up Call :</strong>{" "}
        {dailySalesReviewData.total_answer_count}
      </div>
      <div>
        <strong>9. Forecast achieved till now:</strong>

        {renderForecast()}
      </div>
      <div>
        <strong>10. Pending orders (orderbook):</strong>
        {renderPendingOrders()}
      </div>
      <div>
        <strong>11. Today billing in Qty Product wise (nos.):</strong>{" "}
      </div>
      <div>
        <strong>12. Today PI given in Qty Product wise (nos.):</strong>{" "}
      </div>
      <div>
        <strong>13. Total PI pending for payment with Details:</strong>{" "}
      </div>
      <div>
        <strong>
          14. Total billing till today in Qty Product wise (nos.):
        </strong>{" "}
      </div>
      <div className="review-footer">
        <div>
          <strong>Sales person:</strong>{" "}
          {dailySalesReviewData.sales_person_name}
        </div>
        <div>
          <strong>Reporting manager:</strong>{" "}
          {dailySalesReviewData.reporting_manager}
        </div>
      </div>
    </div>
  );
};
