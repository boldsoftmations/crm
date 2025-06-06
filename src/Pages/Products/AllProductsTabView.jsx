import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomTabs } from "../../Components/CustomTabs";
import { ViewColors } from "./Color/ViewColors";
import { ViewBrand } from "./Brand/ViewBrand";
import { ViewBasicUnit } from "./BasicUnit/ViewBasicUnit";
import { ViewUnit } from "./Unit/ViewUnit";
import { ViewPackingUnit } from "./PackingUnit/ViewPackingUnit";
import { ViewDescription } from "./Description/ViewDescription";
import { ViewProductCode } from "./ProductCode/ViewProductCode";
import { ViewRawMaterials } from "../SKU Codes/RawMaterials/ViewRawMaterials";
import { ViewFinishGoods } from "../SKU Codes/FinishGoods/ViewFinishGoods";
import { ViewConsumable } from "../SKU Codes/Consumable/ViewConsumable";
import { ViewSamleProduct } from "../SKU Codes/SampleProduct/ViewSampleProduct";

export const AllProductsTabView = () => {
  const userData = useSelector((state) => state.auth.profile);

  // Function to check if user belongs to any of the specified groups
  const isInGroups = (...groups) =>
    groups.some((group) => userData.groups.includes(group));

  // Determine the user's roles and permissions
  const isAdmin = isInGroups(
    "Director",
    "Accounts",
    "Accounts Billing Department",
    "Accounts Executive"
  );

  // Initial active tab based on user role
  const [activeTab, setActiveTab] = useState(isAdmin ? 0 : 4);

  // Define all possible tabs with visibility conditions
  const tabs = [
    {
      label: "Raw Materials",
      visible: isAdmin,
      index: 0,
    },
    {
      label: "Finish Goods",
      visible: isAdmin,
      index: 1,
    },
    {
      label: "Consumable",
      visible: isAdmin,
      index: 2,
    },
    {
      label: "Description",
      visible: isAdmin,
      index: 3,
    },
    { label: "Product Code", visible: isAdmin, index: 4 },
    {
      label: "Brand",
      visible: isAdmin,
      index: 5,
    },
    {
      label: "Color",
      visible: isAdmin,
      index: 6,
    },
    { label: "Unit", visible: isAdmin, index: 7 },
    {
      label: "Packing Unit",
      visible: isAdmin,
      index: 8,
    },
    {
      label: "Basic Unit",
      visible: isAdmin,
      index: 9,
    },
    {
      label: "Sample Product",
      visible: isAdmin,
      index: 10,
    },
  ];

  // Filter tabs based on visibility
  const visibleTabs = tabs.filter((tab) => tab.visible);
  const visibleTabIndexes = visibleTabs.map((tab) => tab.index);

  // Tab components mapping
  const tabComponents = {
    0: <ViewRawMaterials />,
    1: <ViewFinishGoods />,
    2: <ViewConsumable />,
    3: <ViewDescription />,
    4: <ViewProductCode />,
    5: <ViewBrand />,
    6: <ViewColors />,
    7: <ViewUnit />,
    8: <ViewPackingUnit />,
    9: <ViewBasicUnit />,
    10: <ViewSamleProduct />,
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
