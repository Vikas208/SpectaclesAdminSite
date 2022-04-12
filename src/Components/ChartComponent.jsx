import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
function ChartComponent({ Data, text }) {
  console.log(Data);

  return (
    <ResponsiveContainer>
      <LineChart data={Data} width="100%">
        <Line dataKey={"orderes"} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartComponent;
