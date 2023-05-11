import React, { useState, useEffect} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Server = () => {
  const port_url = process.env.REACT_APP_PRERELEASE_PORT + "/orderqueue";
  const delete_url_base = process.env.REACT_APP_PRERELEASE_PORT + "/complete/";

  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [noOrders, setNoOrders] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userPrivileges = Cookies.get("userPrivileges");
  useEffect(() => {
    axios
      .get(port_url)
      .then((response) => {
        setOrders(response.data);
        if(orders.length === 0){
          console.log("no orders");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (!userPrivileges) {
      navigate("/customerView");
    } else {
      setIsLoggedIn(true);
    }
    if (userPrivileges !== "Server" && userPrivileges !== "Manager") {
      navigate("/customerView");
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (orders.length === 0) {
      timeoutId = setTimeout(() => {
        setNoOrders(true);
      }, 500);
    } else {
      setNoOrders(false);
    }
    return () => clearTimeout(timeoutId);
  }, [orders]);
   

  const handleLogout = () => {
    // Remove the userPrivileges cookie and navigate to the customer page
    Cookies.remove("userPrivileges");
    navigate("/customerView");
  };

  const handleComplete = (id) => {
    console.log(id);
    const delete_url = delete_url_base + id;
    axios
      .delete(delete_url)
      .then(() => {
        console.log("deleted id " + id);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const Card = ({ element }) => {
    const unformattedDate = `${element.date.substring(0,10)}T00:00:00`;
    const formattedDate = new Date(unformattedDate);
    let hasDrinkSize = false;
    if(element.drinksize === 'large' || element.drinksize === 'medium' || element.drinksize === 'small'){
      hasDrinkSize = true;
    }
    let chipInfo = "";
    let extraInfo = "";
    let drinkInfo = "";
    if (element.chips === "null") {
      chipInfo = "No Chips";
    } else {
      chipInfo = element.chips;
    }
    if (element.drinks === "null") {
      drinkInfo = "No Drink";
    } else {
      drinkInfo = element.drink;
    }
    if (element.extra === "null") {
      extraInfo = "No Add-ons";
    } else {
      extraInfo = element.extra;
    }
    return (
      <div className=" flex items-center justify-center space-x-4 p-8 text-slate-800">
        <div className=" h-full flex-col text-center mx-auto justify-center h-500 w-200 bg-blue-500 text-white p-4 rounded-md">
          <p className="mx-auto mb-4">Order ID : {element.id}</p>
          <p>
            Order Received Date: {formattedDate.toLocaleDateString()}
          </p>
          <p>Order Received Time: {element.time}</p>
          <p>Drink Name: {drinkInfo}</p>
          <p>Drink Extra: {extraInfo} </p>
          <p>Chips: {chipInfo}</p>
          {hasDrinkSize && (
            <p>Size: {element.drinksize}</p>
          )}
          <p>Order Price: ${element.cost}</p>
          <button
            className="mx-auto mt-6 px-8 bg-red-500 rounded-full"
            onClick={() => handleComplete(element.id)}
          >
            Complete Order
          </button>
        </div>
      </div>
    );
  };

  const Cards = () => {
    return (
      <div className="flex flex-wrap p-8 justify-center">
        {orders.map((element) => (
          <Card key={element.id} element={element} />
        ))}
      </div>
    );
  };

  return (
    <div>
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
      {noOrders ? (
      <div style={{marginTop: "15%"}}class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-red-500 text-white text-center py-4 text-center font-bold text-xl uppercase tracking-wide">
          Order Queue Empty!
        </div>
        <div class="py-4 px-6">
          <p class="text-gray-700 text-xl text-center">
            There are currently no orders in the queue. 
          </p>
        </div>
      </div>
    </div>
    ) : (
      <Cards />
    )}
    </div>
  );
};

export default Server;
