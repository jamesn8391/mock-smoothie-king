import React, { useState } from "react";
import axios from "axios";

function XReport() {
  const [orderSales, setOrderSales] = useState([]);
  const [zReport, setZReport] = useState([]);
  const [isXReportGenerated, setIsXReportGenerated] = useState(false);
  const [isZReportGenerated, setIsZReportGenerated] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const port = process.env.REACT_APP_PRERELEASE_PORT;

  const handleGenerateXReport = () => {
    axios
      .get(port + "/x-report")
      .then((response) => {
        setOrderSales(response.data.transactions);
        setIsXReportGenerated(true);
        setIsZReportGenerated(false);
        setTotalSales(response.data.total_sales);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGenerateZReport = () => {
    axios
      .get(port + "/z-report")
      .then((response) => {
        setZReport(response.data.sales_report);
        setIsZReportGenerated(true);
        setIsXReportGenerated(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    
    <div>
      <h1 style={{marginTop: "3%", textAlign: "center"}}>X AND Z Reports</h1>
      <button className="reportBtn" style={{marginLeft: "80px", padding: ".2%"}}onClick={handleGenerateXReport}>Generate X Report</button>
      <button className="reportBtn" style={{marginLeft: "75%", padding: ".2%", marginRight: "1% "}}onClick={handleGenerateZReport}>Generate Z Report</button>
  
      {isXReportGenerated && (
        <>
        <div style={{marginLeft: "50%", padding: ".2%"}}>Total Sales: ${totalSales.toFixed(2)}</div>

        <div className="flex justify-end table-container">
          <div className="w-full overflow-x-scroll">
            <table style={{ marginTop: "55px" }} className="w-full">
              <thead className="tablehead text-xs uppercase">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Drink</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Extra</th>
                  <th className="px-4 py-2">Chips</th>
                  <th className="px-4 py-2">Cost</th>
                </tr>
              </thead>
              <tbody className="sales-report-table">
                {orderSales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.date}</td>
                    <td>{sale.time}</td>
                    <td>{sale.id}</td>
                    <td>{sale.drink}</td>
                    <td>{sale.drinksize}</td>
                    <td>{sale.extra}</td>
                    <td>{sale.chips}</td>
                    <td>{sale.cost}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="7">Total Sales</td>
                  <td>
                    {orderSales.reduce((acc, sale) => acc + sale.cost, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}
  
      {isZReportGenerated && (
        <div className="flex justify-end table-container">
          <div className="w-full overflow-x-scroll">
            <table style={{ marginTop: "55px" }} className="w-full">
              <thead className="tablehead text-xs uppercase">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Total Sales</th>
                </tr>
              </thead>
              <tbody className="sales-report-table">
                {zReport.map((day) => (
                  <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>${day.total_sales.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default XReport;
