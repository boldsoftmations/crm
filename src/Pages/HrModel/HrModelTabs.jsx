import React, { useState } from "react";
import { CustomTabs } from "../../Components/CustomTabs.jsx";
import { JobOpeningView } from "./../HrModel/JobOpening/JobOpeningView.jsx";
import { InterviewStatusView } from "./InterviewStatus/InterviewStatusView.jsx";
import { OfferStatusView } from "./OfferStatus/OfferStatusView.jsx";
import { MisReportView } from "./MisReport/MisReportView.jsx";
import { ApplicantListView } from "./ApplicantList/ApplicantListView.jsx";
import { ShortListedCandidateView } from "./ShortlistedCandidate/ShortListedCandidateView.jsx";
export const HrModelTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    { label: "Job Opening" },
    { label: "Applicant List" },
    { label: "Interview Status" },
    { label: "Shortlisted Candidate" },
    { label: "Offer Status" },
    { label: "MIS Report" },
  ];

  return (
    <div>
      <div>
        <CustomTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div style={{ marginTop: "10px" }}>
          {activeTab === 0 && (
            <div>
              <JobOpeningView />
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <ApplicantListView />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <InterviewStatusView />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <ShortListedCandidateView />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <OfferStatusView />
            </div>
          )}
          {activeTab === 5 && (
            <div>
              <MisReportView />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
