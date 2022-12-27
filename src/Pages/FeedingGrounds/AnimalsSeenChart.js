import React from "react";
import { Tooltip } from "react-bootstrap";
import { Calendar, ResponsiveCalendar } from "@nivo/calendar";
import './AnimalsInFeedingGrounds.css'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const AnimalsSeenChart = ({ data /* see data tab */, startDate, endDate }) => {
  console.log("pristigli data", data);
  console.log("START DATE", startDate);
  console.log("END DATE : ", endDate);
  return (
    <ResponsiveCalendar
      // className="w-100 h-100 index"
      data={data}
      from={startDate}
      to={endDate}
      emptyColor="#1f3826"
      colors={["#61cdbb", "#9753d5", "#e8c1a0", "#3270ab"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffff"
      dayBorderWidth={2}
      dayBorderColor="#000"
      
      tooltip={function (n) {
        return (
          <p className="p-2 bg-dark text-white">
            {n.value}-first seen on {n.day}{" "}
          </p>
        );
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
          itemTextColor:"#ffffff"
          
        },
      ]}
    />
  );
};
export default AnimalsSeenChart;
