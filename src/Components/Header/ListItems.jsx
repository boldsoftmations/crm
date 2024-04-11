import {
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import BarChartIcon from "@mui/icons-material/BarChart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StorageIcon from "@mui/icons-material/Storage";

export const ListItems = (props) => {
  const { setOpen } = props;
  const [expandDashboard, setExpandDashboard] = useState(false);
  const [expandOrderBook, setExpandOrderBook] = useState(false);
  const [dispatchDetails, setDispatchDetails] = useState(false);
  const [expandInventory, setExpandInventory] = useState(false);
  const [expandUser, setExpandUser] = useState(false);
  const [expandHr, setExpandHr] = useState(false);
  const [expandWhatsapp, setExpandWhastapp] = useState(false);
  const data = useSelector((state) => state.auth);
  const userData = data.profile;

  // Check if userData and userData.groups are defined before rendering
  if (!userData || !userData.groups) {
    // You can return a loader, empty fragment, or any placeholder
    return <div>Loading...</div>; // or <></> for an empty fragment
  }

  return (
    <div>
      {/* Staff */}
      {userData.groups.includes("Director") ? (
        <>
          {/* Dashboard */}
          <ListItem
            button
            onClick={() => setExpandDashboard(!expandDashboard)}
            style={{ width: 300 }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/user/dashoard"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Reports"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Sales Person Analytics"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/team-analytics"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Sales Team Analytics"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/retailer-data"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Distribution Customer Data"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/dasboard-lead-data"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Lead Data"
                />
              </ListItem>
            </List>
          </Collapse>

          {/* Products */}
          <ListItem
            button
            component={RouterLink}
            to="/products/all-product"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>

          {/* SKU CODES */}
          <ListItem
            button
            component={RouterLink}
            to="/products/all-sku-codes"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="SKU Code" />
          </ListItem>

          {/* Price List */}
          <ListItem
            button
            component={RouterLink}
            to="/products/view-price-list"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Price List" />
          </ListItem>

          {/* Leads */}
          <ListItem
            button
            component={RouterLink}
            to="/leads/all-lead"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Leads" />
          </ListItem>

          {/* Customer */}
          <ListItem
            button
            component={RouterLink}
            to="/customers/all-customer"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItem>

          {/* All Followup */}
          <ListItem
            button
            component={RouterLink}
            to="/followp/view-followup"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <FollowTheSignsIcon />
            </ListItemIcon>
            <ListItemText primary="Followup" />
          </ListItem>

          {/*Proforma Invoice  */}
          <ListItem
            button
            component={RouterLink}
            to="/invoice/performa-invoice-tab"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <InsertDriveFileIcon />
            </ListItemIcon>
            <ListItemText primary="Performa Invoice" />
          </ListItem>
          {/*Sales Invoice  */}
          <ListItem
            button
            component={RouterLink}
            to="/invoice/sales-invoice"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Sales Invoice" />
          </ListItem>

          {/* Forecast */}
          <ListItem
            button
            component={RouterLink}
            to="/forecast/view-product-forecast"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Forecast" />
          </ListItem>
          {/* Seller Account */}
          <ListItem
            button
            component={RouterLink}
            to="/invoice/seller-account"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Seller Account" />
          </ListItem>

          {/* Order book */}
          <ListItem
            button
            onClick={() => setExpandOrderBook(!expandOrderBook)}
            style={{ width: 300 }}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Order Book" />
            {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/customer-order-book"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Customer Wise Order Book"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/product-order-book"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Product Wise Order Book"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/pi-order-book"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="PI Wise Order Book"
                />
              </ListItem>
            </List>
          </Collapse>
          {/* Dispatch */}
          <ListItem
            button
            onClick={() => setDispatchDetails(!dispatchDetails)}
            style={{ width: 300 }}
          >
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Dispatch" />
            {dispatchDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={dispatchDetails} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/dispatch/view-dispatch"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Pending Dispatch"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/dispatch/view-dispatched"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Dispatched"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/dispatch/view-sales-register"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Sales Register"
                />
              </ListItem>
            </List>
          </Collapse>

          {/* Vendor */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/view-vendor"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Vendor" />
          </ListItem>

          {/* Purchase */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/view-purchase"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Purchase" />
          </ListItem>

          {/* Production */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/view-production"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <FactoryIcon />
            </ListItemIcon>
            <ListItemText primary="Production" />
          </ListItem>

          {/* Inventory */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/view-inventory"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>

          {/* Physical Inventory */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/physical"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Physical Inventory" />
          </ListItem>

          {/* Currency */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/view-currency"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Currency" />
          </ListItem>

          {/* Tasks */}
          <ListItem
            button
            component={RouterLink}
            to="/task/view-task"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Task" />
          </ListItem>

          {/* Market Analysis */}
          <ListItem
            button
            component={RouterLink}
            to="/market-analysis/competitor"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Market Analysis" />
          </ListItem>

          {/* Users */}
          <ListItem
            button
            onClick={() => setExpandUser(!expandUser)}
            style={{ width: 300 }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            {expandUser ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>

          <Collapse in={expandUser} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/user/active-user"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Active Users"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/inactive-user"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="InActive Users"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/personal-profile"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Personal Profile"
                />
              </ListItem>
            </List>
          </Collapse>

          {/* Script */}
          <ListItem
            button
            component={RouterLink}
            to="/user/faq"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Script" />
          </ListItem>

          {/* Daily Sale Review */}
          <ListItem
            button
            component={RouterLink}
            to="/user/sale-review"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Sales Review" />
          </ListItem>
          {/* Whatsapp Group */}
          <ListItem
            button
            onClick={() => setExpandWhastapp(!expandWhatsapp)}
            style={{ width: 300 }}
          >
            <ListItemIcon>
              <WhatsAppIcon />
            </ListItemIcon>
            <ListItemText primary="WhatsApp" />
            {expandWhatsapp ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>

          <Collapse in={expandWhatsapp} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/customers/whatsapp-group"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Group Info"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customers/no-whatsapp-group"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Customer Not Having Group"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customers/no-sales-person-group"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Sales Person Not In Group"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customers/not-in-whatsapp-group"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Customer Not In Group"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customers/whatsapp"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Bulk Message"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customers/automation"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Scheduler"
                />
              </ListItem>
            </List>
          </Collapse>
          {/* <ListItem
            button
            component={RouterLink}
            to="/user/sales-history"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Sales History" />
          </ListItem> */}

          {/* Hr Recruitment Model */}
          <ListItem
            button
            onClick={() => setExpandHr(!expandHr)}
            style={{ width: 300 }}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Recruitment" />
            {expandHr ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>

          <Collapse in={expandHr} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/hr-model"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Hr Model"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/hr-model/designation"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Designation"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/hr-model/department"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Department"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/hr-model/source"
                style={{ width: 300 }}
              >
                <ListItemText
                  component={Button}
                  onClick={() => setOpen(false)}
                  inset
                  primary="Source"
                />
              </ListItem>
            </List>
          </Collapse>
        </>
      ) : (
        <>
          {/* Hr */}
          {userData.groups.includes("HR") && (
            <>
              {/* Users */}
              <ListItem
                button
                onClick={() => setExpandUser(!expandUser)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
                {expandUser ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandUser} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/active-user"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Active Users"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/inactive-user"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="InActive Users"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/personal-profile"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Personal Profile"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
              {/* Hr Recruitment Model */}
              <ListItem
                button
                onClick={() => setExpandHr(!expandHr)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Recruitment" />
                {expandHr ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandHr} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/hr-model"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Hr Model"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/hr-model/designation"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Designation"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/hr-model/department"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Department"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/hr-model/source"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Source"
                    />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}
          {/* Factory orderbook */}
          {(userData.groups.includes("Factory-Delhi-OrderBook") ||
            userData.groups.includes("Factory-Mumbai-OrderBook")) && (
            <>
              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-safety-stock"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Safety Stock Level"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              {/* <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem> */}
            </>
          )}

          {/* factory dispatch */}
          {(userData.groups.includes("Factory-Mumbai-Dispatch") ||
            userData.groups.includes("Factory-Delhi-Dispatch")) && (
            <>
              {/* Dispatch */}
              <ListItem
                button
                onClick={() => setDispatchDetails(!dispatchDetails)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
                {dispatchDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={dispatchDetails} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatch"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Pending Dispatch"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatched"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Dispatched"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* customer services */}
          {userData.groups.includes("Customer Service") && (
            <>
              {/* Customer */}

              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Seller Account */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/seller-account"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Seller Account" />
              </ListItem>
              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Dispatch */}
              <ListItem
                button
                onClick={() => setDispatchDetails(!dispatchDetails)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
                {dispatchDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={dispatchDetails} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  {/* <ListItem
               button
               component={RouterLink}
               to="/dispatch/view-dispatch"
               style={{ width: 300 }}
             >
               <ListItemText inset primary="Peding Dispatch" />
             </ListItem> */}
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatched"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Dispatched"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-sales-register"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Register"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Whatsapp Group */}
              <ListItem
                button
                onClick={() => setExpandWhastapp(!expandWhatsapp)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <WhatsAppIcon />
                </ListItemIcon>
                <ListItemText primary="WhatsApp" />
                {expandWhatsapp ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandWhatsapp} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/not-in-whatsapp-group"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Not In Group"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/no-sales-person-group"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Not In Group"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/no-whatsapp-group"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Not Having Group"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/whatsapp"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Bulk Message"
                    />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}

          {/* purchase */}
          {userData.groups.includes("Purchase") && (
            <>
              {/* Vendor */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-vendor"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Vendor" />
              </ListItem>

              {/* Purchase */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-purchase"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>

              {/* Production */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>

              {/* Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItem>

              {/* Currency */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-currency"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Currency" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* stores */}
          {userData.groups.includes("Stores") && (
            <>
              {/* Production */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>

              {/* Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* stores */}
          {(userData.groups.includes("Stores Delhi") ||
            userData.groups.includes("Production Delhi")) && (
            <>
              {/* Purchase */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-purchase"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>

              {/* Production */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>

              {/* Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Dispatch */}
              <ListItem
                button
                onClick={() => setDispatchDetails(!dispatchDetails)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
                {dispatchDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={dispatchDetails} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatch"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Pending Dispatch"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatched"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Dispatched"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* production */}
          {userData.groups.includes("Production") && (
            <>
              {/* Production */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>

              {/* Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* Sales Manager */}
          {userData.groups.includes("Sales Manager") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/dashoard"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Reports"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Analytics"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/team-analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Team Analytics"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>

              {/* Customer */}

              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>
              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>
              {/* Seller Account */}

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* Dispatch */}

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              {/* Market Analysis */}
              <ListItem
                button
                component={RouterLink}
                to="/market-analysis/competitor"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Market Analysis" />
              </ListItem>

              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Daily Sale Review */}
              <ListItem
                button
                component={RouterLink}
                to="/user/sale-review"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Review" />
              </ListItem>
              {/* Hr Recruitment Model */}
              <ListItem
                button
                onClick={() => setExpandHr(!expandHr)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Recruitment" />
                {expandHr ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandHr} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/hr-model"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Hr Model"
                    />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}

          {/* Sales Deputy Manager */}
          {userData.groups.includes("Sales Deputy Manager") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Analytics"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/team-analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Team Analytics"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>

              {/* Customer */}

              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>
              {/* Daily Sale Review */}
              <ListItem
                button
                component={RouterLink}
                to="/user/sale-review"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Review" />
              </ListItem>
            </>
          )}

          {/* Sales Assistant Deputy Manager */}
          {userData.groups.includes("Sales Assistant Deputy Manager") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Analytics"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>

              {/* Customer */}

              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Daily Sale Review */}
              <ListItem
                button
                component={RouterLink}
                to="/user/sale-review"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Review" />
              </ListItem>
            </>
          )}

          {/* Sales Executives */}
          {userData.groups.includes("Sales Executive") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Analytics"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>

              {/* Customer */}
              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Daily Sale Review */}
              <ListItem
                button
                component={RouterLink}
                to="/user/sale-review"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Review" />
              </ListItem>
            </>
          )}
          {/* Sales Manager without Leads  */}
          {userData.groups.includes("Sales Manager without Leads") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Analytics"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>
              {/* Customer */}
              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Daily Sale Review */}
              <ListItem
                button
                component={RouterLink}
                to="/user/sale-review"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Review" />
              </ListItem>
            </>
          )}
          {/* Sales Manager with Leads  */}
          {userData.groups.includes("Sales Manager with Lead") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/analytics"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Person Analytics"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>

              {/* Customer */}
              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/* All Followup */}
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary="Followup" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              {/* Script */}
              <ListItem
                button
                component={RouterLink}
                to="/user/faq"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Daily Sale Review */}
              {/* <ListItem
                button
                component={RouterLink}
                to="/user/sale-review"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Review" />
              </ListItem> */}
            </>
          )}
          {/* accounts */}
          {userData.groups.includes("Accounts") && (
            <>
              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setExpandDashboard(!expandDashboard)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {expandDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandDashboard} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/dashoard"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Reports"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Products */}
              <ListItem
                button
                component={RouterLink}
                to="/products/all-product"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>

              {/* SKU CODES */}
              <ListItem
                button
                component={RouterLink}
                to="/products/all-sku-codes"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText primary="SKU Code" />
              </ListItem>

              {/* Price List */}
              <ListItem
                button
                component={RouterLink}
                to="/products/view-price-list"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Price List" />
              </ListItem>

              {/* Customer */}
              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>
              {/*Sales Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/sales-invoice"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Invoice" />
              </ListItem>
              {/* Forecast */}
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Seller Account */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/seller-account"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Seller Account" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Dispatch */}
              <ListItem
                button
                onClick={() => setDispatchDetails(!dispatchDetails)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
                {dispatchDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={dispatchDetails} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatch"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Pending Dispatch"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-dispatched"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Dispatched"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/dispatch/view-sales-register"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Sales Register"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Vendor */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-vendor"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Vendor" />
              </ListItem>

              {/* Purchase */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-purchase"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>

              {/* Production */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>

              {/* Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItem>

              {/* Physical Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/physical"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Physical Inventory" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* Accounts Billing Department*/}
          {userData.groups.includes("Accounts Billing Department") && (
            <>
              {/* Products */}
              <ListItem
                button
                component={RouterLink}
                to="/products/all-product"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>

              {/* SKU CODES */}
              <ListItem
                button
                component={RouterLink}
                to="/products/all-sku-codes"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText primary="SKU Code" />
              </ListItem>

              {/* Price List */}
              <ListItem
                button
                component={RouterLink}
                to="/products/view-price-list"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Price List" />
              </ListItem>

              {/* Customer */}
              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>

              {/*Proforma Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Performa Invoice" />
              </ListItem>

              {/*Sales Invoice  */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/sales-invoice"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Invoice" />
              </ListItem>
              {/* Order book */}
              <ListItem
                button
                onClick={() => setExpandOrderBook(!expandOrderBook)}
                style={{ width: 300 }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
                {expandOrderBook ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expandOrderBook} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/customer-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Customer Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/product-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="Product Wise Order Book"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/pi-order-book"
                    style={{ width: 300 }}
                  >
                    <ListItemText
                      component={Button}
                      onClick={() => setOpen(false)}
                      inset
                      primary="PI Wise Order Book"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}

          {/* accounts */}
          {userData.groups.includes("Accounts Executive") && (
            <>
              {/* Products */}
              <ListItem
                button
                component={RouterLink}
                to="/products/all-product"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>

              {/* SKU CODES */}
              <ListItem
                button
                component={RouterLink}
                to="/products/all-sku-codes"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText primary="SKU Code" />
              </ListItem>

              {/* Price List */}
              <ListItem
                button
                component={RouterLink}
                to="/products/view-price-list"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Price List" />
              </ListItem>

              {/* Vendor */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-vendor"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Vendor" />
              </ListItem>

              {/* Purchase */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-purchase"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>

              {/* Production */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>

              {/* Inventory */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>
            </>
          )}
        </>
      )}
    </div>
  );
};
