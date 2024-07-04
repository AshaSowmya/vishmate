import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts";
import React, { useState } from "react";
import { Col } from "react-bootstrap";

const PaymentGraph = () => {
  const datasetMonth = {
    xLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [1500, 2300, 5600, 4300, 10000, 0, 0, 0, 0, 0, 0, 0],
  };

  const datasetYear = {
    xLabels: [
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],
    data: [
      2333, 17500, 35000, 32500, 40000, 45500, 52500, 35500, 40500, 45000,
      62500, 20250,
    ],
  };

  const [dataset, setDataset] = useState({ data: datasetMonth, key: "month" });

  const paymentReportHandler = (e) => {
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
          {dataset.key === "month" ? "Monthly" : "Yearly"} Payment Report
        </p>
        <select
          style={{
            height: "100%",
            padding: ".25rem 1.25rem .25rem 0",
            borderRadius: "6px",
            border: "none",
          }}
          onClick={paymentReportHandler}
        >
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: dataset.data.xLabels,
          },
        ]}
        series={[
          {
            data: dataset.data.data,
          },
        ]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: "#302b63",
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: "#302b63",
            scale: "0.6",
            fill: "#302b63",
            strokeWidth: 2,
          },
        }}
        height={450}
      />
    </Col>
  );
};

export default PaymentGraph;
