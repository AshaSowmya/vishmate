import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import React, { useState } from "react";
import { Col } from "react-bootstrap";

const UserGraph = () => {
  const datasetMonth = [
    [21, "Jan"],
    [28, "Feb"],
    [41, "Mar"],
    [73, "Apr"],
    [99, "May"],
    [144, "June"],
    [319, "July"],
    [249, "Aug"],
    [131, "Sept"],
    [55, "Oct"],
    [48, "Nov"],
    [25, "Dec"],
  ].map(([seoul, month]) => ({
    seoul,
    month,
  }));

  const datasetYear = [
    [1221, "2013"],
    [2013, "2014"],
    [3012, "2015"],
    [1438, "2016"],
    [599, "2017"],
    [6472, "2018"],
    [12332, "2019"],
    [235, "2020"],
    [3222, "2021"],
    [6354, "2022"],
    [9909, "2023"],
    [8431, "2024"],
  ].map(([seoul, month]) => ({
    seoul,
    month,
  }));

  const [dataset, setDataset] = useState({ data: datasetMonth, key: "month" });
  const valueFormatter = (value) => `${value} Users`;

  const chartSetting = {
    series: [{ dataKey: "seoul", valueFormatter }],
    height: 450,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  const userReportHandler = (e) => {
    if (e.target.value === "Year") {
      setDataset({ data: datasetYear, key: "year" });
    } else {
      setDataset({ data: datasetMonth, key: "month" });
    }
  };

  return (
    <Col
      className="mx-3"
      style={{
        background:
          "linear-gradient(to bottom, rgba(49, 44, 99, 0.2), rgba(255, 255, 255, 0), rgba(90, 86, 130, 0.2))",
        borderRadius: "10px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center pt-4">
        <p
          className="h2 px-2"
          style={{ color: "rgba(48, 43, 99, 1)", fontFamily: "Lora" }}
        >
          {dataset.key === "month" ? "Monthly" : "Yearly"} User Report
        </p>
        <select
          style={{
            height: "100%",
            padding: ".25rem 1.25rem .25rem 0",
            borderRadius: "6px",
            border: "none",
          }}
          onChange={userReportHandler}
        >
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>
      <BarChart
        dataset={dataset.data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            colorMap: {
              type: "piecewise",
              thresholds: ["all"],
              colors: ["#302B63"],
            },
          },
        ]}
        {...chartSetting}
        slotProps={{
          bar: {
            clipPath: `inset(0px round 50px 50px 0px 0px)`,
          },
        }}
      />
    </Col>
  );
};

export default UserGraph;
