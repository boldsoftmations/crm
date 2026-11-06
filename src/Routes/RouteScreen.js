import WorkPulseAuthorize from "../Pages/Auth/WorkPulseAuthorize";
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ForgotPassword } from "./../Pages/Auth/ForgotPassword";
import { Auths } from "../Pages/Auth/Auths";
import Maintaince from "../Pages/Maintanace/Maintaince";
import { CustomLoader } from "../Components/CustomLoader";
import {
  canUseTransporterFinder,
  canViewPinMaster,
  canViewTransporterMaster,
} from "../utility/masterAccess";

const ChangePassword = lazy(() =>
  import("./../Pages/Auth/ChangePassword").then((m) => ({
    default: m.ChangePassword,
  }))
);
const SellerAccount = lazy(() =>
  import("./../Pages/Invoice/Seller Account/SellerAccount").then((m) => ({
    default: m.SellerAccount,
  }))
);
const Profile = lazy(() =>
  import("./../Pages/Profile/Profile").then((m) => ({
    default: m.Profile,
  }))
);
const VendorView = lazy(() =>
  import("../Pages/Vendor/VendorInventoryDetail/VendorView").then((m) => ({
    default: m.VendorView,
  }))
);
const ProductForecastViewAll = lazy(() =>
  import("../Pages/ProductForecast/ProductForecastViewAll").then((m) => ({
    default: m.ProductForecastViewAll,
  }))
);
const TaskView = lazy(() =>
  import("../Pages/Task/TaskView").then((m) => ({
    default: m.TaskView,
  }))
);
const Followup = lazy(() =>
  import("../Pages/FollowUp/Followup").then((m) => ({
    default: m.Followup,
  }))
);
const ActivePI = lazy(() =>
  import("../Pages/Invoice/ProformaInvoice/ActivePI").then((m) => ({
    default: m.ActivePI,
  }))
);
const ApprovePi = lazy(() =>
  import("../Pages/Invoice/ProformaInvoice/ApprovePi").then((m) => ({
    default: m.ApprovePi,
  }))
);
const CompetitorView = lazy(() =>
  import("../Pages/MarketAnalysis/CompetitorView").then((m) => ({
    default: m.CompetitorView,
  }))
);
const PriceApprovalPI = lazy(() =>
  import("../Pages/Invoice/ProformaInvoice/PriceApprovalPI").then((m) => ({
    default: m.PriceApprovalPI,
  }))
);
const FaqAllTab = lazy(() =>
  import("../Pages/Faq/FaqAllTab/FaqAllTab").then((m) => ({
    default: m.FaqAllTab,
  }))
);
const DailySaleReviewView = lazy(() =>
  import("../Pages/DailySaleReview/DailySaleReviewView").then((m) => ({
    default: m.DailySaleReviewView,
  }))
);
const HrModelTabs = lazy(() =>
  import("../Pages/HrModel/HrModelTabs").then((m) => ({
    default: m.HrModelTabs,
  }))
);
const CurrencyView = lazy(() =>
  import("../Pages/Currency/CurrencyView").then((m) => ({
    default: m.CurrencyView,
  }))
);
const PhysicalInventoryView = lazy(() =>
  import("../Pages/Physcical Inventory/PhysicalInventoryView").then((m) => ({
    default: m.PhysicalInventoryView,
  }))
);
const AllLeadsTabView = lazy(() =>
  import("../Pages/Leads/AllLeadsTabView").then((m) => ({
    default: m.AllLeadsTabView,
  }))
);
const AllProductsTabView = lazy(() =>
  import("../Pages/Products/AllProductsTabView").then((m) => ({
    default: m.AllProductsTabView,
  }))
);
const AllCustomerTabView = lazy(() =>
  import("../Pages/Cutomers/CompanyDetails/AllCustomerTabView").then((m) => ({
    default: m.AllCustomerTabView,
  }))
);
const AllPerformaInvoiceTabView = lazy(() =>
  import("../Pages/Invoice/ProformaInvoice/AllPerformaInvoiceTabView").then(
    (m) => ({
      default: m.AllPerformaInvoiceTabView,
    })
  )
);
const PurchaseReturnAllTabView = lazy(() =>
  import("../Pages/ReturnOrders/PurchaseReturn/PurchaseReturnAllTabView").then(
    (m) => ({
      default: m.PurchaseReturnAllTabView,
    })
  )
);
const ProductionAllTabView = lazy(() =>
  import("../Pages/Production/ProductionAllTabView").then((m) => ({
    default: m.ProductionAllTabView,
  }))
);
const InventoryAllTabView = lazy(() =>
  import("../Pages/Inventory/InventoryAllTabView").then((m) => ({
    default: m.InventoryAllTabView,
  }))
);
const HrMasterTabView = lazy(() =>
  import("../Pages/HrModel/HrMasterTabView").then((m) => ({
    default: m.HrMasterTabView,
  }))
);
const AllWhatsappTabs = lazy(() =>
  import("../Pages/WhatsappGroup/AllWhatsappTabs").then((m) => ({
    default: m.AllWhatsappTabs,
  }))
);
const AllOrderBookTabView = lazy(() =>
  import("../Pages/OrderBooks/AllOrderBookTabView").then((m) => ({
    default: m.AllOrderBookTabView,
  }))
);
const Report = lazy(() =>
  import("../Pages/Report/Report").then((m) => ({
    default: m.Report,
  }))
);
const AnalyticsAllTabView = lazy(() =>
  import("../Pages/Analytics/AnalyticsAllTabView").then((m) => ({
    default: m.AnalyticsAllTabView,
  }))
);
const AllDispatchTabView = lazy(() =>
  import("../Pages/Dispatch/AllDispatchTabView").then((m) => ({
    default: m.AllDispatchTabView,
  }))
);
const AllProfileTabView = lazy(() =>
  import("../Pages/Users/AllProfileTabView").then((m) => ({
    default: m.AllProfileTabView,
  }))
);
const SalesReturnAllTabView = lazy(() =>
  import("../Pages/ReturnOrders/SalesReturn/SalesReturnAllTabView").then(
    (m) => ({
      default: m.SalesReturnAllTabView,
    })
  )
);
const DebitCreditAllTabView = lazy(() =>
  import("../Pages/DebitCredit/DebitCreditAllTabView").then((m) => ({
    default: m.DebitCreditAllTabView,
  }))
);
const AllCCFtab = lazy(() =>
  import("../Pages/CCF/AllCCFtab").then((m) => ({
    default: m.AllCCFtab,
  }))
);
// import { AllComplaintListView } from "../Pages/CCF/AllComplaintListView";
const AllComplaintListView = lazy(() =>
  import("../Pages/CCF/CCF_CAPA_Master/AllComplaintListView").then((m) => ({
    default: m.AllComplaintListView,
  }))
);
const SalesInvoiceAllTab = lazy(() =>
  import("../Pages/Invoice/SalesInvoice/SalesInvoiceAllTab").then((m) => ({
    default: m.SalesInvoiceAllTab,
  }))
);
const AllTabView = lazy(() =>
  import("../Pages/StateAndCity/AllTAbView").then((m) => ({
    default: m.AllTabView,
  }))
);
const ViewMasterActivitiesList = lazy(() =>
  import("../Pages/MasterActivityList/ViewMasterActivitiesList").then((m) => ({
    default: m.ViewMasterActivitiesList,
  }))
);
const FieldSalesAllTabView = lazy(() =>
  import("../Pages/FieldSales/FieldSalesAllTab").then((m) => ({
    default: m.FieldSalesAllTabView,
  }))
);
const AllSRFTab = lazy(() =>
  import("../Pages/Cutomers/SRF/AllSRFTab").then((m) => ({
    default: m.AllSRFTab,
  }))
);
const ViewMasterBeat = lazy(() =>
  import("../Pages/FieldSales/BeatMaster/ViewMasterBeat").then((m) => ({
    default: m.ViewMasterBeat,
  }))
);
const LeadSummary = lazy(() => import("../Pages/MasterLeadSummary/LeadSummary"));
const FactoryMaster = lazy(() => import("../Pages/MasterFactory/FactoryMaster"));
const AllInventoryReportTabs = lazy(() =>
  import("../Pages/InventoryReport/AllInventoryReportTabs").then((m) => ({
    default: m.AllInventoryReportTabs,
  }))
);
const AllPriceListTabView = lazy(() =>
  import("../Pages/PriceList/AllPriceListTabView").then((m) => ({
    default: m.AllPriceListTabView,
  }))
);
const PurchaseAllTabView = lazy(() =>
  import("../Pages/Purchase/PurchaseAllTabView").then((m) => ({
    default: m.PurchaseAllTabView,
  }))
);
const ViewPackagingMaster = lazy(() =>
  import("../Pages/MasterPackaging/ViewPackagingMaster").then((m) => ({
    default: m.ViewPackagingMaster,
  }))
);
const AllTransportMasterTabView = lazy(() =>
  import("../Pages/MasterTransport/AllTransportMasterTabView").then((m) => ({
    default: m.AllTransportMasterTabView,
  }))
);
const TransporterFinder = lazy(() =>
  import("../Pages/MasterTransport/TransporterFinder")
);
// import PurchaseReturnAllTabView from "../Pages/ReturnOrders/PurchaseReturn/PurchaseReturnAllTabView";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const tokenData = useSelector((state) => state.auth);
  const token = tokenData.user;
  return token ? children : <Navigate to={redirectTo} replace />;
};

export const RouteScreen = () => {
  const tokenData = useSelector((state) => state.auth);
  const token = tokenData.user;
  const profile = tokenData.profile;
  const profileReady = profile && Array.isArray(profile.groups);

  return (
    <Suspense fallback={<CustomLoader open />}>
    <Routes>
      <Route path="/workpulse/authorize" element={<WorkPulseAuthorize />} />
      {token ? (
        <>
          {/* Preferred private route when token exists */}
          <Route
            path="/user/analytics"
            exact
            element={
              <PrivateRoute>
                <AnalyticsAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            exact
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile-tab"
            exact
            element={
              <PrivateRoute>
                <AllProfileTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/leads/all-lead"
            element={
              <PrivateRoute>
                <AllLeadsTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/all-product"
            element={
              <PrivateRoute>
                <AllProductsTabView />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/view-price-list"
            element={
              <PrivateRoute>
                <AllPriceListTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/all-customer"
            element={
              <PrivateRoute>
                <AllCustomerTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/followp/view-followup"
            element={
              <PrivateRoute>
                <Followup />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/seller-account"
            element={
              <PrivateRoute>
                <SellerAccount />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/performa-invoice-tab"
            element={
              <PrivateRoute>
                <AllPerformaInvoiceTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/approve-pi"
            element={
              <PrivateRoute>
                <ApprovePi />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/active-pi"
            element={
              <PrivateRoute>
                <ActivePI />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/price-approval-pi"
            element={
              <PrivateRoute>
                <PriceApprovalPI />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/sales-invoice"
            element={
              <PrivateRoute>
                <SalesInvoiceAllTab />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/orderbook-tab"
            element={
              <PrivateRoute>
                <AllOrderBookTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/dispatch/tab-view"
            element={
              <PrivateRoute>
                <AllDispatchTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/view-purchase"
            element={
              <PrivateRoute>
                <PurchaseAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/view-production"
            element={
              <PrivateRoute>
                <ProductionAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/view-inventory"
            element={
              <PrivateRoute>
                <InventoryAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/view-vendor"
            element={
              <PrivateRoute>
                <VendorView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/view-currency"
            element={
              <PrivateRoute>
                <CurrencyView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/physical"
            element={
              <PrivateRoute>
                <PhysicalInventoryView />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/stock-alert"
            element={
              <PrivateRoute>
                <AllInventoryReportTabs />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/sales-return"
            element={
              <PrivateRoute>
                <SalesReturnAllTabView />
              </PrivateRoute>
            }
          />

          <Route
            path="/inventory/purchase-return"
            element={
              <PrivateRoute>
                <PurchaseReturnAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/credit-debit-note"
            element={
              <PrivateRoute>
                <DebitCreditAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/complaints/ccp-capa"
            element={
              <PrivateRoute>
                <AllCCFtab />
              </PrivateRoute>
            }
          />
          <Route
            path="/master/package-master"
            element={<ViewPackagingMaster />}
          />
          <Route
            path="/customer/complaints/ccp-capa/master"
            element={
              <PrivateRoute>
                <AllComplaintListView />
              </PrivateRoute>
            }
          />
          <Route
            path="/forecast/view-product-forecast"
            element={
              <PrivateRoute>
                <ProductForecastViewAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/task/view-task"
            element={
              <PrivateRoute>
                <TaskView />
              </PrivateRoute>
            }
          />
          <Route
            path="/market-analysis/competitor"
            element={
              <PrivateRoute>
                <CompetitorView />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/faq"
            element={
              <PrivateRoute>
                <FaqAllTab />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/sale-review"
            element={
              <PrivateRoute>
                <DailySaleReviewView />
              </PrivateRoute>
            }
          />
          <Route
            path="/hr-model"
            element={
              <PrivateRoute>
                <HrModelTabs />
              </PrivateRoute>
            }
          />
          <Route
            path="/hr-model/hr-master"
            element={
              <PrivateRoute>
                <HrMasterTabView />
              </PrivateRoute>
            }
          />

          <Route
            path="/county-state-city/master-tab"
            element={
              <PrivateRoute>
                {!profileReady ? null : canViewPinMaster(profile) ? (
                  <AllTabView />
                ) : (
                  <Navigate to="/user/analytics" replace />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/master/factory"
            element={
              <PrivateRoute>
                <FactoryMaster />
              </PrivateRoute>
            }
          />

          <Route
            path="/customers/whatsapp-tabs"
            element={
              <PrivateRoute>
                <AllWhatsappTabs />
              </PrivateRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />

          <Route
            path="/master/activity-list"
            element={
              <PrivateRoute>
                <ViewMasterActivitiesList />
              </PrivateRoute>
            }
          />

          <Route
            path="/Transport-Finder"
            element={
              <PrivateRoute>
                <TransporterFinder />
              </PrivateRoute>
            }
          />

          <Route
            path="/master/customer-visit"
            element={
              <PrivateRoute>
                <FieldSalesAllTabView />
              </PrivateRoute>
            }
          />
          <Route
            path="/lead/list-references"
            element={
              <PrivateRoute>
                <LeadSummary />
              </PrivateRoute>
            }
          />

          <Route
            path="/customer/srf"
            element={
              <PrivateRoute>
                <AllSRFTab />
              </PrivateRoute>
            }
          />
          <Route
            path="/master/beat"
            element={
              <PrivateRoute>
                <ViewMasterBeat />
              </PrivateRoute>
            }
          />
          <Route
            path="/master/transport"
            element={
              <PrivateRoute>
                {!profileReady ? null : canViewTransporterMaster(profile) ? (
                  <AllTransportMasterTabView />
                ) : (
                  <Navigate to="/user/analytics" replace />
                )}
              </PrivateRoute>
            }
          />
        </>
      ) : (
        <>
          {/* Public and authentication routes */}
          <Route path="/" exact element={<Auths />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/maintainance" element={<Maintaince />} />
        </>
      )}
      {/* Redirect unknown routes to login or analytics based on token presence */}
      <Route
        path="*"
        element={
          token ? (
            <PrivateRoute>
              <AnalyticsAllTabView />
            </PrivateRoute>
          ) : (
            <Auths />
          )
        }
      />
    </Routes>
    </Suspense>
  );
};
