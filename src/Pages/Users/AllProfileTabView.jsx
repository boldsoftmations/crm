import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomTabs } from "../../Components/CustomTabs";
import { ActiveUsers } from "./ActiveUsers";
import { InActiveUsers } from "./InActiveUsers";
import { UserProfileView } from "../Profile/UserProfile/UserProfileView";
import { ViewEmployeesAttendance } from "./Attendance/ViewAttendance";

export const AllProfileTabView = () => {
  const userData = useSelector((state) => state.auth.profile);

  const isInGroups = (...groups) =>
    groups.some((group) => userData.groups.includes(group));

  const allTabs = isInGroups("Director", "HR");
  const managerTabs = isInGroups("Sales Manager");

  const [activeTab, setActiveTab] = useState(allTabs ? 0 : 4);

  const tabs = [
    {
      label: "Active Employees",
      visible: allTabs,
      index: 0,
    },
    {
      label: "InActive Employees",
      visible: allTabs,
      index: 1,
    },

    {
      label: "Personal Profiles",
      visible: allTabs,
      index: 2,
    },
    {
      label: "Employees Attendance",
      visible: allTabs || managerTabs,
      index: 3,
    },
  ];

  const visibleTabs = tabs.filter((tab) => tab.visible);
  const visibleTabIndexes = visibleTabs.map((tab) => tab.index);

  const tabComponents = {
    0: <ActiveUsers />,
    1: <InActiveUsers />,
    2: <UserProfileView />,
    3: <ViewEmployeesAttendance />,
  };

  return (
    <div>
      <CustomTabs
        tabs={visibleTabs}
        activeTab={activeTab}
        onTabChange={(index) => setActiveTab(visibleTabIndexes[index])}
      />
      {visibleTabIndexes.includes(activeTab) && (
        <div>{tabComponents[activeTab]}</div>
      )}
    </div>
  );
};
