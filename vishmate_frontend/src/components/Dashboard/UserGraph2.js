import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const data = [
  { name: 'A', value: 20 },
  { name: 'B', value: 30 },
  { name: 'C', value: 15 },
  { name: 'D', value: 25 },
];

const useStyles = makeStyles((theme) => ({
  bar: {
    fill: 'url(#linear-gradient)',
  },
}));

const LinearGradientBarChart = () => {
  const classes = useStyles();

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#82ca9d" />
          <stop offset="100%" stopColor="#8884d8" />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" barSize={30} className={classes.bar} />
    </BarChart>
  );
};

export default LinearGradientBarChart;
