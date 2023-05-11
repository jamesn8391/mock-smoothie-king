import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function SalesReport() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredientsMax, setIngredientsMax] = useState();
  const [chipsMax, setChipsMax] = useState();
  const [utilitiesMax, setUtilitiesMax] = useState();
  const [percentage, setPercentage] = useState();
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
    const url = port + "/restock/" + ingredientsMax + "/" + chipsMax + "/" + utilitiesMax + "/" + percentage;
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
    ? orderSales.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
        >
        <div className="grid grid-cols-4 ">
            <div className="text-center">
              <label className = "block">
                Enter the Maximum Ingredients Threshold
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={ingredientsMax}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mx-auto"
                  onChange={(e) => {
                    setIngredientsMax(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="text-center">
              <label>
                Enter the Maximum Chips Threshold
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={chipsMax}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mx-auto"
                  onChange={(e) => {
                    setChipsMax(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="text-center">
            <label>
              Enter the Maximum utilities Threshold
              <input
                type="number"
                required
                min="0"
                step="1"
                value={utilitiesMax}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mx-auto"
                onChange={(e) => {
                  setUtilitiesMax(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="text-center">
            <label>
              Enter the Low percentage
              <input
                type="number"
                required
                min="0"
                step="1"
                value={percentage}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mx-auto"
                onChange={(e) => {
                  setPercentage(e.target.value);
                }}
              />
            </label>
          </div>
        </div>
        <input style={{marginLeft: "47%", marginTop: "5%", border: "solid black 1px", padding: ".2%", marginBottom: "2%"}}type="submit" />
        </form>
      </div>
      {reportGenerated && (
        <div class="flex justify-end table-container">
          <div class="w-full overflow-x-scroll">
            <h2 className="text-center">Items to be Restocked</h2>
            <div className = "flex flex-col justify-center items-center">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search items by name..."
              onChange={(e) => setSearchQuery(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-2 px-4 justify-center"
            />
            </div>
            <table style={{ marginTop: "55px" }} class="w-full">
              <thead class="tablehead text-xs uppercase">
                <tr>
                  <th class="px-4 py-2">Name</th>
                  <th class="px-4 py-2">Current Quantity</th>
                </tr>
              </thead>
              <tbody className="sales-report-table">
                {filteredSales.map((item) => (
                  <tr key={item.name}>
                    <td class="border px-4 py-2">{item.name}</td>
                    <td class="border px-4 py-2">{item.quantity}</td>
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
