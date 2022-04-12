import React, { useLayoutEffect, useState } from "react";
import { loadDashBoard } from "../../API/LoadData";
import Card from "../../Components/Card";
import ChartComponent from "../../Components/ChartComponent";
import "../../Css/main.css";
function DashBoard() {
  const [{ basicDetails, ChartDetails }, setData] = useState({
    basicDetails: null,
    ChartDetails: null,
  });

  const loadData = async () => {
    let response = await loadDashBoard();
    if (response.status === 200) {
      let result = await response.json();
      // console.log(result);
      setData({
        basicDetails: result?.basicData,
        ChartDetails: result?.chartData,
      });
    }
  };
  //console.log(ChartDetails);
  useLayoutEffect(() => {
    loadData();
    return () => {
      setData({ ChartDetails: null, basicDetails: null });
    };
  }, []);
  return (
    <div>
      <div className="container pt-4 px-4 d-flex justify-content-center mt-4">
        <div className="row ">
          <Card
            Imageclass={"	fa fa-line-chart"}
            name={"Total Product Sales"}
            data={basicDetails?.totalSales}
          />
          <Card
            Imageclass={"fa fa-users"}
            name={"Total Users"}
            data={basicDetails?.totalUsers}
          />
          <Card
            Imageclass={"fa fa-bar-chart"}
            name={"Total Placed Orders"}
            data={basicDetails?.totalPlacedOrders}
          />

          <Card
            Imageclass={"fa fa-bar-chart"}
            name={"Total Shipped Orders"}
            data={basicDetails?.totalShippedOrders}
          />
          <Card
            Imageclass={"fa fa-bar-chart"}
            name={"Total Delivered Orders"}
            data={basicDetails?.totalDeliveredOrders}
          />
          <Card
            Imageclass={"fa fa-bar-chart"}
            name={"Total Canceled Orders"}
            data={basicDetails?.totalCanceledOrders}
          />
          <Card
            Imageclass={"	fa fa-th"}
            name={"Total Products"}
            data={basicDetails?.totalProducts}
          />

          <Card
            Imageclass={"	fa fa-area-chart"}
            name={"Total Revenue"}
            data={
              "₹ " + basicDetails?.totalRevenue === null
                ? basicDetails?.totalRevenue
                : 0
            }
          />
        </div>
      </div>
      <ChartComponent Data={ChartDetails} />
    </div>
  );
}

export default DashBoard;
