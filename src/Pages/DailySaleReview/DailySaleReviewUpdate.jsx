import React, { useState, useEffect } from "react";
import CustomAxios from "../../services/api";

export const DailySaleReviewUpdate = () => {
  const [dailySalesReviewData, setDailySalesReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDailySaleReviewData = async () => {
      try {
        const response = await CustomAxios.get(
          "api/user/daily-sales-review/?email=sales_executive@glutape.com"
        );
        setDailySalesReviewData(response.data);
      } catch (error) {
        setError("Error fetching daily sales review data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDailySaleReviewData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to render forecast data
  const renderForecast = () => {
    return dailySalesReviewData.forecast.map((item, index) => (
      <div key={index}>
        {item.description} - Forecast: {item.forecast}, Actual: {item.actual},
        Percentage: {item.percentage}%
      </div>
    ));
  };

  // Function to render pending orders
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
        <strong>1. Total call (Answered):</strong>{" "}
        {dailySalesReviewData.total_answer_count}
      </div>
      <div>
        <strong>2. Follow Up Call :</strong>{" "}
      </div>
      <div>
        <strong>3. Today billing in Qty Product wise (nos.):</strong>{" "}
        {/* Map through invoice_product_quantity if available */}
      </div>
      <div>
        <strong>4. Today PI given in Qty Product wise (nos.):</strong>{" "}
        {/* Map through today_product_pi if available */}
      </div>
      <div>
        <strong>5. Total PI pending for payment with Details:</strong>{" "}
        {/* Map through approved_pi if available */}
      </div>
      <div>
        <strong>6. Total billing till today in Qty Product wise (nos.):</strong>{" "}
        {/* Render billing details here */}
      </div>
      <div>
        <strong>
          7. No. of new customer till from the start of the month:
        </strong>{" "}
        {dailySalesReviewData.new_customer}
      </div>
      <div>
        <strong>8. No. of new customers added today:</strong>{" "}
        {dailySalesReviewData.today_new_customer}
      </div>
      <div>
        <strong>9. No of customer assign:</strong>{" "}
        {dailySalesReviewData.assigned_customer}
      </div>
      <div>
        <strong>10. No of dead customer:</strong>{" "}
        {dailySalesReviewData.dead_customer}
      </div>
      <div>
        <strong>11. Forecast achieved till now:</strong>
        {renderForecast()}
      </div>
      <div>
        <strong>12. Kyc pending – no of customer where kyc pending:</strong>{" "}
        {dailySalesReviewData.incomplete_kyc}
      </div>
      <div>
        <strong>
          13. Potential pending - no of customer where potential pending:
        </strong>{" "}
        {dailySalesReviewData.incomplete_potential}
      </div>
      <div>
        <strong>14. Pending orders (orderbook):</strong>
        {renderPendingOrders()}
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
