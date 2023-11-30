import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { Chart } from "react-google-charts";
import CustomAxios from "../../../services/api";

export const MisReportView = () => {
  const [jobOpeningData, setJobOpeningData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [applicationSourcesData, setApplicationSourcesData] = useState([]);
  const [avgDaysToHire, setAvgDaysToHire] = useState([]);
  const [placementRate, setPlacementRate] = useState([]);
  const [ctcChartData, setCtcChartData] = useState([]);
  const [costAnalysisData, setCostAnalysisData] = useState([]);

  useEffect(() => {
    getMisReport()
      .then((response) => {
        const data = response.data;
        transformData(data);
      })
      .catch((error) => {
        console.error("Error fetching MIS report data:", error);
      });
  }, []);

  const getMisReport = async () => {
    return CustomAxios.get(`/api/hr/mis-report/`);
  };

  const transformData = (data) => {
    const jobData = [
      ["Category", "Count"],
      ["Total Job Openings", data.jobopening_count],
      ["Open Job Count", data.open_job_count],
      ["Closed Job Count", data.close_job_count],
      ["New Job Openings", data.new_jobopening_count],
    ];
    setJobOpeningData(jobData);

    const pipeline = [
      ["Stage", "Number"],
      ["Total Applicants", data.total_applicants],
      ["Shortlisted Applicants", data.shortlisted_applicants],
      ["Active Candidates", data.active_candidates_count],
      ["Interviewed Candidates", data.interviewed_candidates_count],
      ["Offered Candidates", data.offered_candidates_count],
      ["Applicants Joined", data.applicant_joined_count],
    ];
    setPipelineData(pipeline);

    const avgHireData = [
      ["Metric", "Days"],
      ["Average Days to Hire", parseFloat(data.avg_days_to_hire) / 86400],
    ];
    setAvgDaysToHire(avgHireData);

    const ctcData = [
      ["Category", "Count"],
      ["Candidates Hired Below CTC", parseInt(data.candidates_hired_below_ctc)],
      ["Candidates Hired Above CTC", parseInt(data.candidates_hired_above_ctc)],
    ];
    setCtcChartData(ctcData);

    const costAnalysis = [
      ["Type", "Amount"],
      ["Total Saved", parseInt(data.total_saved)],
      ["Total Extra Offered", parseInt(data.total_extra_offered)],
    ];
    setCostAnalysisData(costAnalysis);

    const placementData = [
      ["Label", "Value"],
      ["Placement Rate", data.placement_rate],
    ];
    setPlacementRate(placementData);

    const appSources = [["Source", "Total"]];
    data.application_sources.forEach((source) => {
      appSources.push([source.source__name, source.total]);
    });
    setApplicationSourcesData(appSources);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        MIS Report
      </Typography>
      <Grid container spacing={3}>
        {/* Job Opening Data Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="ColumnChart"
              data={jobOpeningData}
              options={{
                title: "Job Opening Details",
                hAxis: { title: "Category" },
                vAxis: { title: "Count" },
                legend: "none",
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>

        {/* Recruitment Pipeline Data Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="LineChart"
              data={pipelineData}
              options={{
                title: "Recruitment Pipeline",
                is3D: true,
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>

        {/* Application Sources Data Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="PieChart"
              data={applicationSourcesData}
              options={{
                title: "Application Sources",
                hAxis: { title: "Total Applications" },
                vAxis: { title: "Source" },
                legend: "none",
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>
        {/* Placement Rate Chart */}
        <Grid container justifyContent="center" item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="Gauge"
              data={placementRate}
              options={{
                title: "Placement Rate",
                redFrom: 0,
                redTo: 25,
                yellowFrom: 25,
                yellowTo: 50,
                greenFrom: 50,
                greenTo: 100,
                minorTicks: 5,
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>

        {/* CTC Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="ColumnChart"
              data={ctcChartData}
              options={{
                title: "CTC Comparison",
                vAxis: { title: "Count" },
                legend: "none",
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>
        {/* Cost Analysis Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="ColumnChart"
              data={costAnalysisData}
              options={{
                title: "Cost Analysis",
                vAxis: { title: "Amount" },
                legend: "none",
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>
        {/* Average Days to Hire Chart */}
        {/* <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="BarChart"
              data={avgDaysToHire}
              options={{
                title: "Average Days to Hire",
                legend: "none",
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid> */}
      </Grid>
    </Container>
  );
};
