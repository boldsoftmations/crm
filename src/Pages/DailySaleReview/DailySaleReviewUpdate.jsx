import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
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

const generateListItem = (label, value, maxValue) => {
  const theme = useTheme();
  const progress = (value / (maxValue || 10)) * 100; // Fallback to 10 if maxValue is undefined

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
  console.log("recordForEdit", recordForEdit);

  const noOrderCustomerData = recordForEdit
    ? recordForEdit.no_order_customer
    : {};

  const maxCount = Math.max(...Object.values(noOrderCustomerData));
  const todayLeadEstimateOrder = recordForEdit
    ? recordForEdit.today_lead_estimate_order
    : [];
  const todayMissedCustomerOrder = recordForEdit
    ? recordForEdit.today_missed_customer_order
    : [];
  const todayMissedLeadOrder = recordForEdit
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
    recordForEdit && Array.isArray(recordForEdit.pending_payments)
      ? recordForEdit.pending_payments
      : [];

  return (
    <div style={{ padding: theme.spacing(3) }}>
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

        <GridItemCard title="No Order Customer Overview" xs={12} sm={6} lg={4}>
          {Object.entries(noOrderCustomerData).map(([timeRange, count]) => (
            <Box key={timeRange} mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                {timeRange.replace(/_/g, " ")}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(count / maxCount) * 100}
                style={{ height: 10, borderRadius: 5, marginBottom: 4 }}
              />
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
        <GridItemCard title="Today Missed Customer Order" xs={12} sm={8} lg={6}>
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
                    Anticipated Date: {order.anticipated_date || "Not Provided"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </GridItemCard>
      </Grid>
    </div>
  );
};
