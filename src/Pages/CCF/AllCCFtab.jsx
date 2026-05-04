import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomTabs } from "../../Components/CustomTabs";
// import { CCFView } from "./CCFView";

import { CapaView } from "./CAPA/CapaView";
import { ClosedComplaint } from "./Close-Complaint/ClosedComplaint";
import { CCFView } from "./CCF/CCFView";
import TrainingCapaView from "./TrainingCAPA/TrainingCapaView";
export const AllCCFtab = () => {
  const userData = useSelector((state) => state.auth.profile);

  const isInGroups = (...groups) =>
    groups.some((group) => userData.groups.includes(group));

  const tabs = [
    {
      label: "Customer Complaint Form",
      roles: [
        "Director",
        "Sales Manager",
        "Sales Manager(Retailer)",
        "Accounts",
        "Production",
        "Customer Service",
        "QA",
        "Operations & Supply Chain Manager",
        "Sales Executive",
      ],
      component: <CCFView />,
    },
    {
      label: "CAPA",
      roles: [
        "Director",

        "Accounts",
        "Customer Service",
        "Production",
        "QA",
        "Operations & Supply Chain Manager",
      ],
      component: <CapaView />,
    },
    {
      label: "Closed Complaints",
      roles: [
        "Director",
        "Accounts",
        "Sales Manager",
        "Sales Manager(Retailer)",
        "Customer Service",
        "Production",
        "QA",
        "Operations & Supply Chain Manager",
        "Sales Executive",
      ],
      component: <ClosedComplaint />,
    },

    {
      label: "Training CAPA",
      roles: [
        "Director",

        "Production",
        "QA",
        "Operations & Supply Chain Manager",
      ],
      component: <TrainingCapaView />,
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
