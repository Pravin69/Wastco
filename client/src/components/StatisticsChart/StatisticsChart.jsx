import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import userService from "../../services/user.service";
// import { rewardData } from "../../data";

const StatisticsChart = ({ timePeriod, user }) => {
  // Define the data based on the selected time period

  const [chartData, setChartData] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        let rewardData =""

        if (user) {
          const response = await userService.getRewardData(user._id);
          rewardData = response.data;
          console.log(rewardData);
        } else {
          const response = await userService.getRewardData();
          rewardData = response.data;
          console.log(rewardData);
        }

        console.log(rewardData);

        
        

        let data = [];
        let xAxisData = [];

        if (timePeriod === "1 week") {
          // Filter data for 1 week
          const currentDate = new Date();
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(currentDate.getDate() - 6); // Adjusted to include the current day

          data = rewardData
            .filter((data) => {
              const timestamp = parseTimestamp(data.Timestamp);
              return timestamp >= oneWeekAgo && timestamp <= currentDate;
            })
            .reduce((result, data) => {
              const date = formatDate(parseTimestamp(data.Timestamp));
              if (result[date]) {
                result[date] += data.BottleDispose;
              } else {
                result[date] = data.BottleDispose;
              }
              return result;
            }, {});

          xAxisData = Object.keys(data);

          
        } else if (timePeriod === "1 month") {
          // Filter data for 1 month
          const currentDate = new Date();
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(currentDate.getMonth() - 1);

          data = rewardData
            .filter((data) => {
              const timestamp = parseTimestamp(data.Timestamp);
              return timestamp >= oneMonthAgo && timestamp <= currentDate;
            })
            .reduce((result, data) => {
              const date = formatDate(parseTimestamp(data.Timestamp));
              if (result[date]) {
                result[date] += data.BottleDispose;
              } else {
                result[date] = data.BottleDispose;
              }
              return result;
            }, {});

          xAxisData = Object.keys(data);

        }

        function parseTimestamp(timestamp) {
          const [dayMonthYear, time] = timestamp.split(" ");
          const [day, month, year] = dayMonthYear.split("/");
          const [hours, minutes, seconds, period] = time.split(":");
          const hour = parseInt(hours) % 12;
          const periodOffset = period === "PM" ? 12 : 0;

          const formattedTimestamp = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            hour + periodOffset,
            parseInt(minutes),
            parseInt(seconds)
          );

          return formattedTimestamp;
        }

        function formatDate(date) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }

        setChartData(Object.values(data));
        setXAxisData(xAxisData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timePeriod,user]);

  // Find the greatest element in yAxisData
  const maxDataValue = Math.max(...chartData);

  // Generate an array of unique integer values from 0 to maxDataValue
  const uniqueYAxisLabels = Array.from(
    { length: maxDataValue + 1 },
    (_, index) => index
  );

  // console.log(uniqueYAxisLabels)

  const option = {
    color: ["var(--orange)"],

    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(0, 0, 0, 0.59)",
      borderWidth: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      show: false,
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
        name: "Date", // x-axis label
        nameLocation: "middle", // Position the label in the middle
        nameGap: 25, // Adjust the gap between the label and the axis
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        name: "Bottle", // y-axis label
        data: uniqueYAxisLabels,
        axisLabel: {
          formatter: (value, index) => {
            return uniqueYAxisLabels.includes(value) ? value : '';
          }
        },
      },
      
    ],
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "#F450D3",
            },
          ]),
          width: 4,
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            {
              offset: 0,
              color: "#FE4C00",
            },
            {
              offset: 1,
              color: "rgba(255,144,70,0.1)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        showSymbol: false,
        data: chartData, // Use the data based on the selected time period
      },
    ],
  };

  const chartStyle = {
    height: "400px", // Set the desired height here
  };

  return <ReactECharts option={option} style={chartStyle} />;
};

export default StatisticsChart;
