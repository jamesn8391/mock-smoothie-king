import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function SalesReport() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [date, setDate] = useState("invalid");
  const [orderSales, setOrderSales] = useState([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userPrivileges = Cookies.get("userPrivileges");
  useEffect(() => {
    if (!userPrivileges) {
      navigate("/customerView");
    } else {
      setIsLoggedIn(true);
    }
    if (userPrivileges !== "Manager") {
      navigate("/customerView");
    }
  }, []);

  const handleLogout = () => {
    // Remove the userPrivileges cookie and navigate to the customer page
    Cookies.remove("userPrivileges");
    navigate("/customerView");
  };

  const navigate = useNavigate();
  const port = process.env.REACT_APP_PRERELEASE_PORT;

  const handleSubmit = (event) => {
    const url = port + "/excess/" + date;
    console.log(url);
    event.preventDefault();
    axios
      .get(url)
      .then((response) => {
        setOrderSales(response.data);
        setReportGenerated(true);

      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  };
  const filteredSales = orderSales
  ? orderSales.filter(item => item.Name.toLowerCase().includes(searchQuery.toLowerCase()))
  : [];
  return (
    <div className="grid-flow-row" >
      <div>
        <form  style={{marginLeft: "30%", marginTop: "1%"}}onSubmit={handleSubmit}>
          <label style={{paddingRight: "5%  "}}>
            Enter the Excess Report Starting Date
            <input
            style={{marginLeft: "10%", marginTop: "1%"}}
              type="date"
              value={date}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              onChange={(e) => {
                if (e.target.value === "") {
                  setDate("blank"); // Set a default value when the input field is cleared
                } else {
                  setDate(e.target.value);
                }
              }}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
      {reportGenerated && (
        <div class="flex justify-end table-container">
          <div class="w-full overflow-x-scroll">
            <h2 style={{ marginTop: "3%", marginLeft: "50%" }}>Excess Items</h2>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search items by name..."
              onChange={(e) => setSearchQuery(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-2 px-4 mr-2"
              style={{marginTop: "3%", marginLeft: "46%"}}
            />
            <table style={{ marginTop: "55px" }} class="w-full">
              <thead class="tablehead text-xs uppercase">
                <tr>
                  <th class="px-4 py-2">Name</th>
                  <th class="px-4 py-2">Amount Sold</th>
                </tr>
              </thead>
              <tbody className="sales-report-table">
                {filteredSales.map((item) => (
                  <tr key={item.Name}>
                    <td class="border px-4 py-2">{item.Name}</td>
                    <td class="border px-4 py-2">{item.Amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="absolute top-0 right-0 flex">
          <button className="x-3 text-white ">
            You are logged in as a {userPrivileges}
          </button>
          <button
            className="m-4 py-1 px-3 bg-red-500 text-white rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
