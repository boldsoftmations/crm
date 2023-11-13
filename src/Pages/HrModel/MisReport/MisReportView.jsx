import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { CustomChart } from "../../../Components/CustomChart";

export const MisReportView = () => {
  const positions = [
    { title: "Software Developer", candidates: 12, source: "Naukri" },
    { title: "Backend Developer", candidates: 18, source: "JobHai" },
    { title: "Devops Engineer", candidates: 3, source: "LinkdIn" },
  ];

  const pipelineData = [
    ["Stage", "Number"],
    ["Called", 30],
    ["Selected for Interview", 15],
    ["Selected for Offer", 10],
    ["Offered", 8],
    ["Joined", 5],
  ];

  const positionsChartData = [
    ["Position", "Candidates"],
    ...positions.map((position) => [position.title, position.candidates]),
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        MIS Report
      </Typography>
      <Grid container spacing={3}>
        {/* Pipeline Chart */}
        <Grid item xs={12}>
          <CustomChart
            chartType="PieChart"
            data={pipelineData}
            options={{
              title: "Pipeline Status",
              hAxis: { title: "Stage" },
              vAxis: { title: "Number of Candidates" },
              legend: "none",
            }}
            widthStyle="100%"
            heightStyle="400px"
          />
        </Grid>

        {/* Positions Chart */}
        <Grid item xs={12}>
          <CustomChart
            chartType="BarChart"
            data={positionsChartData}
            options={{
              title: "Candidates Shortlisted for Positions",
              hAxis: { title: "Position" },
              vAxis: { title: "Number of Candidates" },
              legend: "none",
            }}
            widthStyle="100%"
            heightStyle="400px"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
