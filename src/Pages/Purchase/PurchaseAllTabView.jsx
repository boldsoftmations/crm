import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PurchaseOrderView } from "./Purchase Order/PurchaseOrderView";
import { GRNView } from "./GRN/GRNView";
import { PurchaseInvoiceView } from "./Purchase Invoice/PurchaseInvoiceView";
import { ChallanRegisterView } from "./Challan Register/ChallanRegisterView";
import { ChalanInvoiceView } from "./ChallanInvoice/ChalanInvoiceView";
import { CustomTabs } from "../../Components/CustomTabs";

export const PurchaseAllTabView = () => {
  const userData = useSelector((state) => state.auth.profile);

  const isInGroups = (...groups) =>
    groups.some((group) => userData.groups.includes(group));

  const tabs = [
    {
      label: "Purchase Order Book",
      roles: ["Director", "Purchase"],
      component: <PurchaseOrderView />,
    },
    {
      label: "Purchase Invoice",
      roles: ["Director", "Accounts", "Accounts Executive"],
      component: <PurchaseInvoiceView />,
    },
    {
      label: "Purchase Register",
      roles: [
        "Director",
        "Accounts",
        "Stores Delhi",
        "Production Delhi",
        "Accounts Executive",
      ],
      component: <GRNView />,
    },
    {
      label: "Challan Register",
      roles: ["Director", "Accounts", "Purchase"],
      component: <ChallanRegisterView />,
    },
    {
      label: "Job Work Challan Invoice",
      roles: ["Director", "Accounts"],
      component: <ChalanInvoiceView />,
    },
  ];

  const visibleTabs = tabs.filter((tab) => isInGroups(...tab.roles));

  // Simplified active tab state to always start with the first item of visibleTabs if available
  const [activeTab, setActiveTab] = useState(0);

  const onTabChange = (newIndex) => {
    setActiveTab(newIndex);
  };

  return (
    <>
      <CustomTabs
        tabs={visibleTabs.map((tab) => ({
          label: tab.label,
          index: tab.index,
        }))}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      {visibleTabs.length > 0 && visibleTabs[activeTab] ? (
        <div>{visibleTabs[activeTab].component}</div>
      ) : null}
    </>
  );
};
