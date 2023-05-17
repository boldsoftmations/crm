import React, { useEffect, useState } from "react";
import { CustomLoader } from "../Components/CustomLoader";
import { CustomTable } from "../Components/CustomTable";
import { CustomPagination } from "../Components/CustomPagination";
import LeadServices from "../services/LeadService";
import { useNavigate } from "react-router-dom";

export const SalesFunnel = (props) => {
  const { funnelDataByID, setOpenPopup } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    getleads();
  }, []);

  const getleads = async () => {
    try {
      setOpen(true);
      const filterValue = funnelDataByID.name;
      if (funnelDataByID.name && funnelDataByID.name !== "total") {
        const response = await LeadServices.getAllSearchLeads(
          "stage",
          funnelDataByID.name
        );
        setLeads(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      } else {
        // let response = await LeadServices.getAllLeads();
        // setLeads(response.data.results);
        // const total = response.data.count;
        // setpageCount(Math.ceil(total / 25));
        navigate("/leads/view-lead");
      }
      setOpen(false);
    } catch (err) {
      setOpen(false);
      console.log("err", err);
    }
  };
  const handlePageClick = async (event, value) => {
    try {
      const page = value;
      setOpen(true);
      const filterValue = funnelDataByID.name;
      const response = await LeadServices.getFilterPaginateLeads(
        page,
        "stage",
        filterValue
      );
      setLeads(response.data.results);
      const total = response.data.count;
      setpageCount(Math.ceil(total / 25));
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const PriorityColor = leads.map((row) => {
    let color = "";
    switch (row.priority) {
      case "High":
        color = "#ffcccc";
        break;
      case "Medium":
        color = "#ccccff";
        break;
      case "Low":
        color = "#ffffcc";
        break;
      default:
        color = "#ffffff";
    }
    return { priority: color };
  });

  const Tabledata = leads.map((row, i) => ({
    id: row.lead_id,
    name: row.name,
    contact: row.contact,
    alternate_contact: row.alternate_contact,
    email: row.email,

    assigned_to: row.assigned_to,
    priority: row.priority,
    company: row.company,
  }));

  const Tableheaders = [
    "ID",
    "NAME",
    "CONTACT",
    "ALTERNATE CONTACT",
    "EMAIL",
    "ASSIGNED TO",
    "PRIORITY",
    "COMPANY",
  ];
  return (
    <>
      <CustomLoader open={open} />

      <CustomTable
        headers={Tableheaders}
        data={Tabledata}
        PriorityColor={PriorityColor}
      />
      <CustomPagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
      />
    </>
  );
};