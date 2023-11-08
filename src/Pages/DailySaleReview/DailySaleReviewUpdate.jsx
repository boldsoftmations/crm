import React, { useState, useEffect } from "react";
import UserProfileService from "../../services/UserProfileService";

export const DailySaleReviewUpdate = ({ recordForEdit, setOpenPopup }) => {
  // Function to render forecast data
  const renderForecast = () => {
    // Check if recordForEdit and recordForEdit.forecast are defined and is an array
    if (recordForEdit && Array.isArray(recordForEdit.forecast)) {
      return recordForEdit.forecast.map((item, index) => (
        <div key={index}>
          {item.description} - Forecast: {item.forecast}, Actual: {item.actual},
          Percentage: {item.percentage}%
        </div>
      ));
    }
    return <div>No forecast data available.</div>; // Return this if forecast data is not available
  };

  const renderPendingOrders = () => {
    // Check if recordForEdit.pending_order is defined and is an array before mapping
    if (
      recordForEdit.pending_order &&
      Array.isArray(recordForEdit.pending_order)
    ) {
      return recordForEdit.pending_order.map((order, index) => (
        <div key={index}>
          {order.product__description__name} - Pending Quantity:{" "}
          {order.total_pending_quantity}
        </div>
      ));
    }
    return <div>No pending orders.</div>; // Return this if pending orders data is not available
  };
  return (
    <div>
      <h1>Daily Sales Review Update</h1>
      <div>
        <strong>Sales Person:</strong> {recordForEdit.sales_person_name}
      </div>
      <div>
        <strong>1. Total call (Answered):</strong>{" "}
        {recordForEdit.total_answer_count}
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
          1. No. of new customer till from the start of the month:
        </strong>{" "}
        {recordForEdit.new_customer}
      </div>
      <div>
        <strong>8. No. of new customers added today:</strong>{" "}
        {recordForEdit.today_new_customer}
      </div>
      <div>
        <strong>9. No of customer assign:</strong>{" "}
        {recordForEdit.assigned_customer}
      </div>
      <div>
        <strong>10. No of dead customer:</strong> {recordForEdit.dead_customer}
      </div>
      <div>
        <strong>11. Forecast achieved till now:</strong>
        {renderForecast()}
      </div>
      <div>
        <strong>12. Kyc pending – no of customer where kyc pending:</strong>{" "}
        {recordForEdit.incomplete_kyc}
      </div>
      <div>
        <strong>
          6. Potential pending - no of customer where potential pending:
        </strong>{" "}
        {recordForEdit.incomplete_potential}
      </div>
      <div>
        <strong>7. Total call (Answered):</strong>{" "}
        {recordForEdit.total_answer_count}
      </div>
      <div>
        <strong>8. Follow Up Call :</strong> {recordForEdit.total_answer_count}
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
          <strong>Sales person:</strong> {recordForEdit.sales_person_name}
        </div>
        <div>
          <strong>Reporting manager:</strong> {recordForEdit.reporting_manager}
        </div>
      </div>
    </div>
  );
};
