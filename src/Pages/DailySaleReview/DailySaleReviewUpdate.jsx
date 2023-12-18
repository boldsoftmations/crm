import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import jsPDF from "jspdf";

const generateListItem = (label, value, maxValue) => {
  return (
    <ListItem key={label}>
      <ListItemText primary={label} />
      <ListItemSecondaryAction>
        <Typography variant="caption">{value}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const GridItemCard = ({ title, children, xs, sm, lg }) => (
  <Grid item xs={xs} sm={sm} lg={lg}>
    <Card raised>
      <CardContent>
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
        <Divider light />
        {children}
      </CardContent>
    </Card>
  </Grid>
);

const CallPerformanceTable = ({ callPerformanceData }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Today</TableCell>
            <TableCell align="right">Last 7 Days</TableCell>
            <TableCell align="right">Month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(callPerformanceData).map(([key, values]) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key.replace(/_/g, " ")}
              </TableCell>
              <TableCell align="right">{values.today}</TableCell>
              <TableCell align="right">{values.last_7_days}</TableCell>
              <TableCell align="right">{values.month}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PendingPaymentsCard = ({ payment }) => {
  const theme = useTheme();

  return (
    <Card style={{ margin: theme.spacing(1) }}>
      <CardContent>
        <Typography variant="h6">{payment.customer || "N/A"}</Typography>
        <Typography color="textSecondary">Amount: {payment.amount}</Typography>
        <Typography color="textSecondary">Date: {payment.date}</Typography>
        <Typography color="textSecondary">
          PI Number: {payment.pi_number}
        </Typography>
        <Typography color="textSecondary">Status: {payment.status}</Typography>
      </CardContent>
    </Card>
  );
};

export const DailySaleReviewUpdate = ({ recordForEdit }) => {
  const theme = useTheme();

  // ... your component code ...

  console.log("recordForEdit", recordForEdit);

  const noOrderCustomerData =
    recordForEdit & recordForEdit.no_order_customer
      ? recordForEdit.no_order_customer
      : {};

  const todayLeadEstimateOrder =
    recordForEdit & recordForEdit.today_lead_estimate_order
      ? recordForEdit.today_lead_estimate_order
      : [];
  const todayMissedCustomerOrder =
    recordForEdit & recordForEdit.today_missed_customer_order
      ? recordForEdit.today_missed_customer_order
      : [];
  const todayMissedLeadOrder =
    recordForEdit & recordForEdit.today_missed_lead_order
      ? recordForEdit.today_missed_lead_order
      : [];

  // Safely access top_customer array from recordForEdit or default to an empty array
  const topCustomers =
    recordForEdit && recordForEdit.top_customer
      ? recordForEdit.top_customer
      : [];

  // Safely access top_forecast_customer array from recordForEdit or default to an empty array
  const topForecastCustomers =
    recordForEdit && recordForEdit.top_forecast_customer
      ? recordForEdit.top_forecast_customer
      : [];

  const pendingPayments =
    recordForEdit && recordForEdit.pending_payments
      ? recordForEdit.pending_payments
      : [];

  const salesSummary =
    recordForEdit && recordForEdit.sales_summary
      ? recordForEdit.sales_summary
      : [];

  const addPageTitle = (doc, title, pageWidth) => {
    // Ensure the title is a string and the pageWidth is a number
    if (typeof title !== "string" || typeof pageWidth !== "number") {
      console.error("Invalid title or pageWidth:", title, pageWidth);
      return;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(title, pageWidth / 2, 10, "center"); // Center the title at the top
  };

  const addCard = (title, data, doc, x, y, pageWidth, pageHeight) => {
    // Card Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, x, y);

    // Card Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    let contentY = y + 10;

    // Check if data is an array and handle accordingly
    if (Array.isArray(data)) {
      data.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          doc.text(
            `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`,
            x,
            contentY
          );
          contentY += 5;
        });
        contentY += 5; // Add extra space between items
      });
    } else {
      // If data is not an array, proceed as before
      Object.entries(data).forEach(([key, value]) => {
        doc.text(
          `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`,
          x,
          contentY
        );
        contentY += 5;
      });
    }

    // Draw a border around the card content
    doc.rect(x - 5, y - 5, pageWidth - x * 2, contentY - y + 5);

    return contentY + 10; // Return the Y coordinate for the next section
  };

  // Signature Lines
  const addSignatures = (doc, x, y, spaceBetween) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    // Sales Person Signature
    doc.text("Sales Person", x, y);
    doc.line(x, y + 3, x + 60, y + 3); // Signature line for Sales Person

    // Reviewed By Signature
    doc.text("Reviewed By", x, y + spaceBetween);
    doc.line(x, y + spaceBetween + 3, x + 60, y + spaceBetween + 3); // Signature line for Reviewed By
  };

  const downloadPdfDocument = () => {
    const doc = new jsPDF();
    let x = 10,
      y = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add the title on the first page
    addPageTitle(doc, "Sales Review", pageWidth);

    // Example usage, adjust to your needs
    y = addCard(
      "Customer Overview",
      recordForEdit.existing_customer,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end
    y = addCard(
      "Call Performance Overview",
      recordForEdit.call_performance,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "No Order Customer Overview",
      recordForEdit.no_order_customer,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "PI Summary",
      recordForEdit.pi_summary,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Follow-up Summary",
      recordForEdit.followup_summary,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Pending Payments",
      recordForEdit.pending_payments,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "New Customer Summary",
      recordForEdit.new_customer_summary,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Top Customers",
      recordForEdit.top_customer,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Top Forecast Customers",
      recordForEdit.top_forecast_customer,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );

    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Today Missed Customer Order",
      recordForEdit.today_missed_customer_order,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Today Missed Lead Order",
      recordForEdit.today_missed_lead_order,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Today Lead Estimate Order",
      recordForEdit.today_lead_estimate_order,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end

    y = addCard(
      "Sales Summary",
      recordForEdit.sales_summary,
      doc,
      x,
      y,
      pageWidth,
      pageHeight
    );
    if (y + 40 > pageHeight) {
      doc.addPage();
      y = 10;
    } // Check for page end
    addSignatures(doc, x, y, 15); // 15 is the space between signature lines

    doc.save("sales_review.pdf");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={downloadPdfDocument}>
        Download as PDF
      </Button>

      <div style={{ padding: theme.spacing(3) }} id="divToPrint">
        <Grid container spacing={3}>
          <GridItemCard title="Customer Overview" xs={12} sm={6} lg={4}>
            <List>
              {recordForEdit && recordForEdit.existing_customer ? (
                Object.entries(recordForEdit.existing_customer).map(
                  ([key, value]) =>
                    generateListItem(key.replace(/_/g, " "), value) // Assuming a default max value of 10
                )
              ) : (
                <Typography>No Customer Data Available</Typography>
              )}
            </List>
          </GridItemCard>

          <GridItemCard title="Call Performance Overview" xs={12} sm={6} lg={4}>
            <CallPerformanceTable
              callPerformanceData={recordForEdit.call_performance}
            />
          </GridItemCard>

          <GridItemCard
            title="No Order Customer Overview"
            xs={12}
            sm={6}
            lg={4}
          >
            {Object.entries(noOrderCustomerData).map(([timeRange, count]) => (
              <Box key={timeRange} mb={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  {timeRange.replace(/_/g, " ")}
                </Typography>
                {/* <LinearProgress
                variant="determinate"
                value={(count / maxCount) * 100}
                style={{ height: 10, borderRadius: 5, marginBottom: 4 }}
              /> */}
                <Typography variant="caption">{`Count: ${count}`}</Typography>
              </Box>
            ))}
          </GridItemCard>

          <GridItemCard title="PI Summary" xs={12} sm={6} lg={4}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Drop"
                  secondary={recordForEdit.pi_summary.drop}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Month Drop"
                  secondary={recordForEdit.pi_summary.month_drop}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Raised"
                  secondary={recordForEdit.pi_summary.raised}
                />
              </ListItem>
            </List>
          </GridItemCard>

          <GridItemCard title="Follow-up Summary" xs={12} sm={6} lg={4}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Overdue Follow-up"
                  secondary={recordForEdit.followup_summary.overdue_followup}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Overdue Task"
                  secondary={recordForEdit.followup_summary.overdue_task}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Today"
                  secondary={recordForEdit.followup_summary.today}
                />
              </ListItem>
            </List>
          </GridItemCard>
          {/* Pending Payments */}
          <GridItemCard title="Pending Payments" xs={12}>
            {pendingPayments.map((payment, index) => (
              <PendingPaymentsCard key={index} payment={payment} />
            ))}
          </GridItemCard>
          <GridItemCard title="New Customer Summary" xs={12} sm={6} lg={4}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Last Month"
                  secondary={recordForEdit.new_customer_summary.last_month}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Month"
                  secondary={recordForEdit.new_customer_summary.month}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Sales Invoice"
                  secondary={recordForEdit.new_customer_summary.sales_invoice}
                />
              </ListItem>
            </List>
          </GridItemCard>
          <GridItemCard title="Top Customers" xs={12} sm={6} lg={4}>
            <List>
              {topCustomers.length ? (
                topCustomers.map((customer, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Customer: ${customer.customer}`}
                      secondary={
                        <span>
                          {`Amount: ${customer.amount}`}
                          <br />
                          {`Billed This Month: ${
                            customer.is_billed_this_month ? "Yes" : "No"
                          }`}
                        </span>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>No Top Customer Data Available</Typography>
              )}
            </List>
          </GridItemCard>

          <GridItemCard title="Top Forecast Customers" xs={12} sm={6} lg={4}>
            <List>
              {topForecastCustomers.length ? (
                topForecastCustomers.map((forecastCustomer, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Customer: ${forecastCustomer.customer}`}
                      secondary={
                        <span>
                          {`Amount: ${forecastCustomer.amount}`}
                          <br />
                          {`Billed This Month: ${
                            forecastCustomer.is_billed_this_month ? "Yes" : "No"
                          }`}
                        </span>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>No Top Forecast Customer Data Available</Typography>
              )}
            </List>
          </GridItemCard>
          <GridItemCard
            title="Today Missed Customer Order"
            xs={12}
            sm={8}
            lg={6}
          >
            <TableContainer>
              <Table aria-label="Missed Customer Orders">
                <TableHead>
                  <TableRow>
                    <TableCell>Forecast</TableCell>
                    <TableCell>Estimated Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Product</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayMissedCustomerOrder.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.forecast}</TableCell>
                      <TableCell>{order.estimated_date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.description}</TableCell>
                      <TableCell>{order.product}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GridItemCard>
          <GridItemCard title="Today Missed Lead Order" xs={12} sm={8} lg={6}>
            <TableContainer>
              <Table aria-label="Missed Customer Orders">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Anticipated Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Product</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayMissedLeadOrder.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.anticipated_date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.description}</TableCell>
                      <TableCell>{order.product}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GridItemCard>
          <GridItemCard title="Today Lead Estimate Order" xs={12} sm={6} lg={4}>
            {todayLeadEstimateOrder.map((order, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card raised>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {order.leadcompany || "No Company"}
                    </Typography>
                    <Chip
                      label={order.lead_stage || "No Stage"}
                      color="primary"
                    />
                    <Typography color="textSecondary">
                      Anticipated Date:{" "}
                      {order.anticipated_date || "Not Provided"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </GridItemCard>
          <GridItemCard title="Sales Summary" xs={12} sm={10} lg={8}>
            <TableContainer>
              <Table aria-label="Sales Summary Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Forecast Quantity</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Sales Quantity</TableCell>
                    <TableCell>Daily Target</TableCell>
                    <TableCell>Today PI</TableCell>
                    <TableCell>Today Sales Invoice</TableCell>
                    <TableCell>Monthly Sales Invoice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesSummary.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.forecast_quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.sales_quantity}</TableCell>
                      <TableCell>{item.daily_target}</TableCell>
                      <TableCell>{item.today_pi.join(", ")}</TableCell>
                      <TableCell>
                        {item.today_sales_invoice.join(", ")}
                      </TableCell>
                      <TableCell>
                        {item.monthly_sales_invoice.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GridItemCard>
        </Grid>

        {/* Signature section with underlines */}
        <Box
          display="flex"
          justifyContent="space-between"
          mt={4}
          alignItems="center"
        >
          <Box width="50%" textAlign="center">
            <Typography variant="h6">Sales Person</Typography>
            <Box borderBottom={1} width="50%" mx="auto" mt={4} />
          </Box>

          <Box width="50%" textAlign="center">
            <Typography variant="h6">Reviewed By</Typography>
            <Box borderBottom={1} width="50%" mx="auto" mt={4} />
          </Box>
        </Box>
      </div>
    </div>
  );
};
