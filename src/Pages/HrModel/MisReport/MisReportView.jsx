import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { CustomChart } from "../../../Components/CustomChart";
import Chart from "react-google-charts";

export const MisReportView = () => {
  const jobOpeningData = [
    ["Job Category", "Count"],
    ["Total Job Openings", 21],
    ["Open Job Count", 3],
    ["New Job Openings", 2],
  ];

  const pipelineData = [
    ["Stage", "Number"],
    ["Total Applicants", 14],
    ["Shortlisted Applicants", 9],
  ];

  const applicationSourcesData = [
    ["Source", "Total"],
    ["GlassDoor", 1],
    ["Indeed", 2],
    ["JobHai", 2],
    ["Naukri", 7],
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        MIS Report
      </Typography>
      <Grid container spacing={3}>
        {/* Pipeline Data Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <CustomChart
              chartType="PieChart"
              data={pipelineData}
              options={{
                title: "Recruitment Pipeline",
                hAxis: { title: "Stage" },
                vAxis: { title: "Number" },
                legend: "none",
              }}
              widthStyle="100%"
              heightStyle="400px"
            />
          </Box>
        </Grid>

        {/* Job Opening Data Chart */}
        <Grid item xs={12} md={6}>
          <Box boxShadow={3}>
            <Chart
              chartType="PieChart"
              data={jobOpeningData}
              options={{
                title: "Job Opening Details",
                pieHole: 0.4,
              }}
              width="100%"
              height="400px"
            />
          </Box>
        </Grid>
        {/* Application Sources Chart */}
        <Grid item xs={12}>
          <Box boxShadow={3}>
            <CustomChart
              chartType="BarChart"
              data={applicationSourcesData}
              options={{
                title: "Application Sources",
                vAxis: { title: "Source" },
                hAxis: { title: "Total Applications" },
                legend: "none",
              }}
              widthStyle="100%"
              heightStyle="400px"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
