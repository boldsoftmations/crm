import React, { useState } from "react";

export const ApplicantListUpdate = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    highestEducation: "",
    candidateSource: "",
    interested: "",
    notInterestedReason: "",
    interestedDesignation: "",
    callbackTime: "",
    noticePeriod: "",
    currentLocation: "",
    willingToRelocate: "",
    currentSalary: "",
    expectedSalary: "",
    latestCompany: "",
    spokenEnglish: "",
    stage: "",
    rejectionReason: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your server
    console.log(formData);
    alert("Form submitted! Check the console for the form data.");
  };

  return (
    <div>
      <h2>Applicant List Update</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name of Candidate:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Highest Education Qualification:
          <input
            type="text"
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Candidate Source:
          <select
            name="candidateSource"
            value={formData.candidateSource}
            onChange={handleChange}
            required
          >
            <option value="">Select Source</option>
            <option value="jobBoard">Job Board</option>
            <option value="referral">Referral</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Interested:
          <select
            name="interested"
            value={formData.interested}
            onChange={handleChange}
            required
          >
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="callback">Yes, but call back Later</option>
          </select>
        </label>
        <br />
        {/* Conditional fields can be shown based on the 'interested' state */}
        {formData.interested === "no" && (
          <label>
            Reason:
            <select
              name="notInterestedReason"
              value={formData.notInterestedReason}
              onChange={handleChange}
              required
            >
              <option value="notLooking">Not Looking for Change</option>
              <option value="differentProfile">
                Not Looking to work in this profile
              </option>
              <option value="companyIssue">
                Not interested to work in our company
              </option>
              <option value="other">Other</option>
            </select>
          </label>
        )}
        <br />
        {formData.interested === "callback" && (
          <label>
            Call back Time and Date:
            <input
              type="datetime-local"
              name="callbackTime"
              value={formData.callbackTime}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <br />
        <label>
          Notice Period:
          <input
            type="text"
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Current Location:
          <input
            type="text"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Willing to Relocate:
          <select
            name="willingToRelocate"
            value={formData.willingToRelocate}
            onChange={handleChange}
            required
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />
        <label>
          Current Salary:
          <input
            type="number"
            name="currentSalary"
            value={formData.currentSalary}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Expected Salary:
          <input
            type="number"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Latest Company Employed:
          <input
            type="text"
            name="latestCompany"
            value={formData.latestCompany}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Spoken English:
          <select
            name="spokenEnglish"
            value={formData.spokenEnglish}
            onChange={handleChange}
            required
          >
            <option value="bad">Bad</option>
            <option value="average">Average</option>
            <option value="good">Good</option>
          </select>
        </label>
        <br />
        <label>
          Stage:
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
          >
            <option value="shortlisted">Selected for Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <br />
        {formData.stage === "rejected" && (
          <label>
            Rejection Reason:
            <textarea
              name="rejectionReason"
              value={formData.rejectionReason}
              onChange={handleChange}
              required
            ></textarea>
          </label>
        )}
        <br />
        <button type="submit">Update Applicant</button>
      </form>
    </div>
  );
};
