import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FactoryIcon from "@mui/icons-material/Factory";
import BusinessIcon from "@mui/icons-material/Business";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PurchaseIcon from "@mui/icons-material/ShoppingCart";
import ComplaintIcon from "@mui/icons-material/ReportProblem";
import { ExpandLess, ExpandMore, Mail } from "@mui/icons-material";

export const ListItems = (props) => {
  const { setOpen } = props;
  const data = useSelector((state) => state.auth);
  const userData = data.profile;
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if userData and userData.groups are defined before rendering
  if (!userData || !userData.groups) {
    // You can return a loader, empty fragment, or any placeholder
    return <div>Loading...</div>; // or <></> for an empty fragment
  }
  const [submenuOpen, setSubmenuOpen] = useState({
    master: false,
    invoice: false,
    accounts: false,
    inventory: false,
    production: false,
    customer_complaint: false,
    sales: false,
    purchase: false,
  });

  const handleSubmenuClick = (menu) => {
    setSubmenuOpen((prev) => ({ [menu]: !prev[menu] }));
  };

  return (
    <div>
      {/* Staff */}
      {userData.groups.includes("Director") ? (
        <>
          {/* Report  */}
          <ListItem
            button
            component={RouterLink}
            to="/user/report"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/user/report")}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>
          {/* Analytics  */}
          <ListItem
            button
            component={RouterLink}
            to="/user/analytics"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/user/analytics")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>

          {/* master menu */}
          <ListItem button onClick={() => handleSubmenuClick("master")}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Master" />
            {submenuOpen.master ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.master} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/products/all-product"
                onClick={() => setOpen(false)}
                selected={isActive("/products/all-product")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Inventory Master" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/seller-account"
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/seller-account")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Company Master" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-currency"
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/view-currency")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Currency Master" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/user/profile-tab"
                onClick={() => setOpen(false)}
                selected={isActive("/user/profile-tab")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Employees Master" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/hr-model/hr-master"
                onClick={() => setOpen(false)}
                selected={isActive("/hr-model/hr-master")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="HR Master" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customer/complaints/ccp-capa"
                onClick={() => setOpen(false)}
                selected={isActive("/customer/complaints/ccp-capa")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="CCF Complaint Master" />
              </ListItem>
            </List>
          </Collapse>

          {/* invoice menu */}
          <ListItem button onClick={() => handleSubmenuClick("invoice")}>
            <ListItemIcon>
              <InsertDriveFileIcon />
            </ListItemIcon>
            <ListItemText primary="Invoice" />
            {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/performa-invoice-tab"
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/performa-invoice-tab")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Performa Invoice" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/sales-invoice"
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/sales-invoice")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Sales Invoice" />
              </ListItem>
            </List>
          </Collapse>

          {/* accounts menu */}
          <ListItem button onClick={() => handleSubmenuClick("accounts")}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
            {submenuOpen.accounts ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.accounts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/invoice/credit-debit-note"
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/credit-debit-note")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Debit-Credit" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/products/view-price-list"
                onClick={() => setOpen(false)}
                selected={isActive("/products/view-price-list")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Price List" />
              </ListItem>
            </List>
          </Collapse>

          {/* inventory menu */}
          <ListItem button onClick={() => handleSubmenuClick("inventory")}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
            {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.inventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-inventory"
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/view-inventory")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Inventory" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/inventory/physical"
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/physical")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Physical Inventory" />
              </ListItem>
            </List>
          </Collapse>

          {/* production menu */}
          <ListItem button onClick={() => handleSubmenuClick("production")}>
            <ListItemIcon>
              <FactoryIcon />
            </ListItemIcon>
            <ListItemText primary="Production" />
            {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.production} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-production"
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/view-production")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Production" />
              </ListItem>
            </List>
          </Collapse>

          {/* customer complaint menu */}
          <ListItem
            button
            onClick={() => handleSubmenuClick("customer_complaint")}
          >
            <ListItemIcon>
              <ComplaintIcon />
            </ListItemIcon>
            <ListItemText primary="Customer Complaint" />
            {submenuOpen.customer_complaint ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={submenuOpen.customer_complaint}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/customer/complaints/ccp-capa"
                onClick={() => setOpen(false)}
                selected={isActive("/customer/complaints/ccp-capa")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="CCF-CAPA" />
              </ListItem>
            </List>
          </Collapse>

          {/* sales menu */}
          <ListItem button onClick={() => handleSubmenuClick("sales")}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Sales" />
            {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                onClick={() => setOpen(false)}
                selected={isActive("/leads/all-lead")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Leads" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/customers/all-customer"
                onClick={() => setOpen(false)}
                selected={isActive("/customers/all-customer")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Customer" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/followp/view-followup"
                onClick={() => setOpen(false)}
                selected={isActive("/followp/view-followup")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Followup" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/forecast/view-product-forecast"
                onClick={() => setOpen(false)}
                selected={isActive("/forecast/view-product-forecast")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Forecast" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/market-analysis/competitor"
                onClick={() => setOpen(false)}
                selected={isActive("/market-analysis/competitor")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Market Analysis" />
              </ListItem>
            </List>
          </Collapse>

          {/* purchase menu */}
          <ListItem button onClick={() => handleSubmenuClick("purchase")}>
            <ListItemIcon>
              <PurchaseIcon />
            </ListItemIcon>
            <ListItemText primary="Purchase" />
            {submenuOpen.purchase ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenuOpen.purchase} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-vendor"
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/view-vendor")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Vendor" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-purchase"
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/view-purchase")}
                activeClassName="Mui-selected"
                sx={{ pl: 8 }}
              >
                <ListItemText primary="Purchase" />
              </ListItem>
            </List>
          </Collapse>

          {/* Order book */}
          <ListItem
            button
            component={RouterLink}
            to="/invoice/orderbook-tab"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/invoice/orderbook-tab")}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Order Book" />
          </ListItem>

          {/* Dispatch */}
          <ListItem
            button
            component={RouterLink}
            to="/dispatch/tab-view"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/dispatch/tab-view")}
          >
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Dispatch" />
          </ListItem>

          {/* sales return */}
          <ListItem
            button
            component={RouterLink}
            to="/inventory/sales-return"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/inventory/sales-return")}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Sales Return" />
          </ListItem>

          {/* Tasks */}
          <ListItem
            button
            component={RouterLink}
            to="/task/view-task"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/task/view-task")}
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
            selected={isActive("/user/faq")}
          >
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Script" />
          </ListItem>

          {/* Whatsapp Group */}
          <ListItem
            button
            component={RouterLink}
            to="/customers/whatsapp-tabs"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/customers/whatsapp-tabs")}
          >
            <ListItemIcon>
              <WhatsAppIcon />
            </ListItemIcon>
            <ListItemText primary="Whatsapp" />
          </ListItem>

          {/* hr model */}
          <ListItem
            button
            component={RouterLink}
            to="/hr-model"
            style={{ width: 300 }}
            onClick={() => setOpen(false)}
            selected={isActive("/hr-model")}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Recruitment" />
          </ListItem>
        </>
      ) : (
        <>
          {/* Hr */}
          {userData.groups.includes("HR") && (
            <>
              <ListItem button onClick={() => handleSubmenuClick("master")}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Master" />
                {submenuOpen.master ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.master} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/user/profile-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/user/profile-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="Employees Master" />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/hr-model/hr-master"
                    onClick={() => setOpen(false)}
                    selected={isActive("/hr-model/hr-master")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="HR Master" />
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
                selected={isActive("/task/view-task")}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Task" />
              </ListItem>

              <ListItem
                button
                component={RouterLink}
                to="/hr-model"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/hr-model")}
              >
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Recruitment" />
              </ListItem>
            </>
          )}
          {/* Factory orderbook */}
          {(userData.groups.includes("Factory-Delhi-OrderBook") ||
            userData.groups.includes("Factory-Mumbai-OrderBook")) && (
            <>
              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>
            </>
          )}

          {/* factory dispatch */}
          {(userData.groups.includes("Factory-Mumbai-Dispatch") ||
            userData.groups.includes("Factory-Delhi-Dispatch")) && (
            <>
              {/* Dispatch */}
              <ListItem
                button
                component={RouterLink}
                to="/dispatch/tab-view"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/dispatch/tab-view")}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
              </ListItem>
            </>
          )}

          {/* customer services */}
          {userData.groups.includes("Customer Service") && (
            <>
              <ListItem button onClick={() => handleSubmenuClick("master")}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Master" />
                {submenuOpen.master ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.master} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customer/complaints/ccp-capa"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customer/complaints/ccp-capa")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="CCF Complaint Master" />
                  </ListItem>
                </List>
              </Collapse>
              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/leads/all-lead"
                    onClick={() => setOpen(false)}
                    selected={isActive("/leads/all-lead")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Leads
"
                    />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/followp/view-followup"
                    onClick={() => setOpen(false)}
                    selected={isActive("/followp/view-followup")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Followup
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* customer complaint menu */}
              <ListItem
                button
                onClick={() => handleSubmenuClick("customer_complaint")}
              >
                <ListItemIcon>
                  <ComplaintIcon />
                </ListItemIcon>
                <ListItemText primary="Customer Complaint" />
                {submenuOpen.customer_complaint ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={submenuOpen.customer_complaint}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customer/complaints/ccp-capa"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customer/complaints/ccp-capa")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="CCF-CAPA" />
                  </ListItem>
                </List>
              </Collapse>
              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Dispatch */}
              <ListItem
                button
                component={RouterLink}
                to="/dispatch/tab-view"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/dispatch/tab-view")}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Whatsapp Group */}
              <ListItem
                button
                component={RouterLink}
                to="/customers/whatsapp-tabs"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/customers/whatsapp-tabs")}
              >
                <ListItemIcon>
                  <WhatsAppIcon />
                </ListItemIcon>
                <ListItemText primary="Whatsapp" />
              </ListItem>
            </>
          )}

          {/* purchase */}
          {userData.groups.includes("Purchase") && (
            <>
              {/* inventory menu */}
              <ListItem button onClick={() => handleSubmenuClick("inventory")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
                {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.inventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-inventory"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-inventory")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Inventory
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/physical"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/physical")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Physical Inventory
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleSubmenuClick("production")}>
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
                {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={submenuOpen.production}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-production"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-production")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Production
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* purchase menu */}
              <ListItem button onClick={() => handleSubmenuClick("purchase")}>
                <ListItemIcon>
                  <PurchaseIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
                {submenuOpen.purchase ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.purchase} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-vendor"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-vendor")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Vendor
  "
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-purchase"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-purchase")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Purchase
  "
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Currency */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/view-currency"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/view-currency")}
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
                selected={isActive("/task/view-task")}
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
              {/* inventory menu */}
              <ListItem button onClick={() => handleSubmenuClick("inventory")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
                {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.inventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-inventory"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-inventory")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Inventory
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleSubmenuClick("production")}>
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
                {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={submenuOpen.production}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-production"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-production")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Production
"
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
                selected={isActive("/task/view-task")}
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
              {/* inventory menu */}
              <ListItem button onClick={() => handleSubmenuClick("inventory")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
                {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.inventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-inventory"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-inventory")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Inventory
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleSubmenuClick("production")}>
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
                {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={submenuOpen.production}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-production"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-production")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Production
"
                    />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}

          {/* production */}
          {userData.groups.includes("Production") && (
            <>
              <>
                {/* inventory menu */}
                <ListItem
                  button
                  onClick={() => handleSubmenuClick("inventory")}
                >
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inventory" />
                  {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={submenuOpen.inventory}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      component={RouterLink}
                      to="/inventory/view-inventory"
                      onClick={() => setOpen(false)}
                      selected={isActive("/inventory/view-inventory")}
                      activeClassName="Mui-selected"
                      sx={{ pl: 8 }}
                    >
                      <ListItemText
                        primary="Inventory
"
                      />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem
                  button
                  onClick={() => handleSubmenuClick("production")}
                >
                  <ListItemIcon>
                    <FactoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Production" />
                  {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={submenuOpen.production}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      component={RouterLink}
                      to="/inventory/view-production"
                      onClick={() => setOpen(false)}
                      selected={isActive("/inventory/view-production")}
                      activeClassName="Mui-selected"
                      sx={{ pl: 8 }}
                    >
                      <ListItemText
                        primary="Production
"
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            </>
          )}

          {/* Sales Manager */}
          {userData.groups.includes("Sales Manager") && (
            <>
              {/* Report  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/report"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/report")}
              >
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItem>

              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>
              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/leads/all-lead"
                    onClick={() => setOpen(false)}
                    selected={isActive("/leads/all-lead")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Leads
"
                    />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/followp/view-followup"
                    onClick={() => setOpen(false)}
                    selected={isActive("/followp/view-followup")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Followup
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/market-analysis/competitor"
                    onClick={() => setOpen(false)}
                    selected={isActive("/market-analysis/competitor")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Market Analysis

"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Hr Recruitment Model */}
              <ListItem
                button
                component={RouterLink}
                to="/hr-model"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Recruitment" />
              </ListItem>
            </>
          )}

          {/* Sales Deputy Manager */}
          {userData.groups.includes("Sales Deputy Manager") && (
            <>
              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>

              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/leads/all-lead"
                    onClick={() => setOpen(false)}
                    selected={isActive("/leads/all-lead")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Leads
"
                    />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/followp/view-followup"
                    onClick={() => setOpen(false)}
                    selected={isActive("/followp/view-followup")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Followup
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>
            </>
          )}

          {/* Sales Assistant Deputy Manager */}
          {userData.groups.includes("Sales Assistant Deputy Manager") && (
            <>
              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>

              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/leads/all-lead"
                    onClick={() => setOpen(false)}
                    selected={isActive("/leads/all-lead")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Leads
"
                    />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/followp/view-followup"
                    onClick={() => setOpen(false)}
                    selected={isActive("/followp/view-followup")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Followup
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>
            </>
          )}

          {/* Sales Executives */}
          {userData.groups.includes("Sales Executive") && (
            <>
              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>

              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/leads/all-lead"
                    onClick={() => setOpen(false)}
                    selected={isActive("/leads/all-lead")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Leads
"
                    />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/followp/view-followup"
                    onClick={() => setOpen(false)}
                    selected={isActive("/followp/view-followup")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Followup
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>
            </>
          )}
          {/* Sales Manager without Leads  */}
          {userData.groups.includes("Sales Manager without Leads") && (
            <>
              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>

              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* sales menu */}
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/leads/all-lead"
                    onClick={() => setOpen(false)}
                    selected={isActive("/leads/all-lead")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Leads
"
                    />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/followp/view-followup"
                    onClick={() => setOpen(false)}
                    selected={isActive("/followp/view-followup")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Followup
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>
            </>
          )}
          {/* Sales Manager with Leads  */}
          {userData.groups.includes("Sales Manager with Lead") && (
            <>
              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>

              {/* Leads */}
              <ListItem
                button
                component={RouterLink}
                to="/leads/all-lead"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/leads/all-lead")}
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
                selected={isActive("/customers/all-customer")}
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
                selected={isActive("/followp/view-followup")}
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
                selected={isActive("/invoice/performa-invoice-tab")}
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
                selected={isActive("/forecast/view-product-forecast")}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItem>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
                selected={isActive("/user/faq")}
              >
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Script" />
              </ListItem>
            </>
          )}
          {/* accounts */}
          {userData.groups.includes("Accounts") && (
            <>
              {/* Report  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/report"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/report")}
              >
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItem>
              {/* Analytics  */}
              <ListItem
                button
                component={RouterLink}
                to="/user/analytics"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/user/analytics")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>
              <ListItem button onClick={() => handleSubmenuClick("master")}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Master" />
                {submenuOpen.master ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.master} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/products/all-product"
                    onClick={() => setOpen(false)}
                    selected={isActive("/products/all-product")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="Inventory Master" />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/seller-account"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/seller-account")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="Company Master" />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-currency"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-currency")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="Currency Master" />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customer/complaints/ccp-capa"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customer/complaints/ccp-capa")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="CCF Complaint Master" />
                  </ListItem>
                </List>
              </Collapse>
              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/sales-invoice"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/sales-invoice")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Sales Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* accounts menu */}
              <ListItem button onClick={() => handleSubmenuClick("accounts")}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
                {submenuOpen.accounts ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.accounts} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/credit-debit-note"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/credit-debit-note")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Debit-Credit
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/products/view-price-list"
                    onClick={() => setOpen(false)}
                    selected={isActive("/products/view-price-list")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Price List
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* inventory menu */}
              <ListItem button onClick={() => handleSubmenuClick("inventory")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
                {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.inventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-inventory"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-inventoryb")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Inventory
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/physical"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/physical")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Physical Inventory
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* customer complaint menu */}
              <ListItem
                button
                onClick={() => handleSubmenuClick("customer_complaint")}
              >
                <ListItemIcon>
                  <ComplaintIcon />
                </ListItemIcon>
                <ListItemText primary="Customer Complaint" />
                {submenuOpen.customer_complaint ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={submenuOpen.customer_complaint}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customer/complaints/ccp-capa"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customer/complaints/ccp-capa")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="CCF-CAPA" />
                  </ListItem>
                </List>
              </Collapse>
              {/* production menu */}
              <ListItem button onClick={() => handleSubmenuClick("production")}>
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
                {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={submenuOpen.production}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-production"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-production")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Production
"
                    />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/forecast/view-product-forecast"
                    onClick={() => setOpen(false)}
                    selected={isActive("/forecast/view-product-forecast")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Forecast
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* purchase menu */}
              <ListItem button onClick={() => handleSubmenuClick("purchase")}>
                <ListItemIcon>
                  <PurchaseIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
                {submenuOpen.purchase ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.purchase} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-vendor"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-vendor")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Vendor
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-purchase"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-purchase")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Purchase
"
                    />
                  </ListItem>
                </List>
              </Collapse>

              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>
              {/* Dispatch */}
              <ListItem
                button
                component={RouterLink}
                to="/dispatch/tab-view"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/dispatch/tab-view")}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
              </ListItem>

              {/* sales return */}
              <ListItem
                button
                component={RouterLink}
                to="/inventory/sales-return"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/inventory/sales-return")}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Return" />
              </ListItem>

              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
              <ListItem button onClick={() => handleSubmenuClick("master")}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Master" />
                {submenuOpen.master ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.master} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/products/all-product"
                    onClick={() => setOpen(false)}
                    selected={isActive("/products/all-product")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="Inventory Master" />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/sales-invoice"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/sales-invoice")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Sales Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>
              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
              <ListItem button onClick={() => handleSubmenuClick("master")}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Master" />
                {submenuOpen.master ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.master} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/products/all-product"
                    onClick={() => setOpen(false)}
                    selected={isActive("/products/all-product")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText primary="Inventory Master" />
                  </ListItem>
                </List>
              </Collapse>
              {/* inventory menu */}
              <ListItem button onClick={() => handleSubmenuClick("inventory")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
                {submenuOpen.inventory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.inventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-inventory"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-inventory")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Inventory
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* production menu */}
              <ListItem button onClick={() => handleSubmenuClick("production")}>
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
                {submenuOpen.production ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={submenuOpen.production}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-production"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-production")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Production
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleSubmenuClick("sales")}>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sales
"
                />
                {submenuOpen.sales ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.sales} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/customers/all-customer"
                    onClick={() => setOpen(false)}
                    selected={isActive("/customers/all-customer")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Customer
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* invoice menu */}
              <ListItem button onClick={() => handleSubmenuClick("invoice")}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
                {submenuOpen.invoice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/performa-invoice-tab"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/performa-invoice-tab")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Performa Invoice
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/invoice/sales-invoice"
                    onClick={() => setOpen(false)}
                    selected={isActive("/invoice/sales-invoice")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Sales Invoice
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* purchase menu */}
              <ListItem button onClick={() => handleSubmenuClick("purchase")}>
                <ListItemIcon>
                  <PurchaseIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase" />
                {submenuOpen.purchase ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={submenuOpen.purchase} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-vendor"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-vendor")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Vendor
"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/inventory/view-purchase"
                    onClick={() => setOpen(false)}
                    selected={isActive("/inventory/view-purchase")}
                    activeClassName="Mui-selected"
                    sx={{ pl: 8 }}
                  >
                    <ListItemText
                      primary="Purchase
"
                    />
                  </ListItem>
                </List>
              </Collapse>
              {/* Order book */}
              <ListItem
                button
                component={RouterLink}
                to="/invoice/orderbook-tab"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/invoice/orderbook-tab")}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Order Book" />
              </ListItem>
              {/* Tasks */}
              <ListItem
                button
                component={RouterLink}
                to="/task/view-task"
                style={{ width: 300 }}
                onClick={() => setOpen(false)}
                selected={isActive("/task/view-task")}
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
