import React, { useState, useEffect } from "react";
import { StyledLink, StyledLinkHome } from "../pages_styling/drinks";
import { useNavigate } from "react-router-dom";
import smoothieKingDrinks from "../images/smoothiekingdrinks.png";
import { MenuSlider } from "../components/Slider";
import {AiOutlineShoppingCart} from 'react-icons/ai';
import "../index.css";
import 'flowbite';
import axios from "axios";

const Drinks = () => {
  let port = process.env.REACT_APP_PRERELEASE_PORT;
  let port_url = port + "/drinks";
  const [drinks, setDrinks] = useState([]);
  const [drinkIds, setDrinkIds] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [prices, setPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [snackIds, setSnackIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const sectionNames = [
    "Feel Energized Blends",
    "Get Fit Blends",
    "Manage Weight Blends",
    "Be Well Blends",
    "Enjoy a Treat Blends",
    "Kids Blends",
    "Snacks",
    "Seasonal",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetch(port_url)
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${port}/snacks`)
      .then((res) => res.json())
      .then((data) => {
        setSnacks(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${port}/prices`)
      .then((res) => res.json())
      .then((data) => {
        setPrices(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const prices2 = {
    large: 8.49,
    medium: 7.29,
    small: 5.29,
    chips: 1.49
  }

  const handleClick = (id, size, price) => {
    if (size === "select") {
      window.alert("Please select a size when ordering a drink!");
    } else {
      let totalPrice1 = 0;
      let drinkSize = size === "large" ? " (large)" : size === "medium" ? " (medium)" : " (small)";
      let drink = id.split('(')[0].trim();
      let drinkItem = `${drink}${drinkSize} $${prices2[size]}`;
      setCartItems((prevCartItems) => [...prevCartItems, drinkItem]);
      totalPrice1 += prices2[size]; // update the total price
      //setCartItems((prevCartItems) => [...prevCartItems, `Total Price: $${totalPrice.toFixed(2)}`]);
      console.log(`Clicked drink ${id} and ${size}`);
    }
  };
  const handleCheckout = (size) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("sizes", JSON.stringify(sizes));
    setTotalPrice((prevTotalPrice) => prevTotalPrice + prices2[size]);
    navigate("/checkout", { state: { cartItems, sizes } });
  };
  const section1Drinks = drinks.filter(
    (drink) => drink.id >= 0 && drink.id <= 20
  );
  const section2Drinks = drinks.filter(
    (drink) => drink.id >= 21 && drink.id <= 45
  );
  const section3Drinks = drinks.filter(
    (drink) => drink.id >= 46 && drink.id <= 63
  );
  const section4Drinks = drinks.filter(
    (drink) => drink.id >= 64 && drink.id <= 82
  );
  const section5Drinks = drinks.filter(
    (drink) => drink.id >= 83 && drink.id <= 100
  );
  const section6Drinks = drinks.filter(
    (drink) => drink.id >= 101 && drink.id <= 106
  );

  const section7Snacks = snacks.filter(
    (snack) => snack.id >= 0 && snack.id < 6
  );
  const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;
  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?lat=30.61&lon=-96.34&units=imperial&appid=" + weatherAPIKey)
      .then((response) => {
        setWeatherLoaded(true);
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [weatherLoaded]);
  return (
    <div>
      <StyledLinkHome to="/" activestyle="true">
        Home
      </StyledLinkHome>
      <div> 
      {weatherLoaded && (
        <div className = "absolute top-2 right-2">
          <h1>Current Temperature: {weatherInfo.main.temp} °F</h1>
          <h1>Current Weather: {weatherInfo.weather[0].description}</h1>
          <h1>High Today: {weatherInfo.main.temp_max} °F</h1>
        </div>
      )}
      <button type = "button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example"  class = "text-center" className = "relative z-0">
        <div className="flex justify-center items-center rounded-full border-4 border-black-300" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example" class = "text-center">
        <AiOutlineShoppingCart size = {50} />
        </div>
      </button>
      </div>
      <div id="drawer-example" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-label">
         <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Checkout</h5>
         <button type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
            
         </button>
         <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            {item} <br></br>
            <button
              onClick={() => {
                const newCartItems = [...cartItems];
                newCartItems.splice(index, 1);  
                setCartItems(newCartItems);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <br></br>
      <button className="checkoutButton" onClick={handleCheckout}>
        Checkout
      </button>
        </div>

      <h1
        className="text-3xl"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Drinks Menu
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={smoothieKingDrinks}
          alt="Smoothie King drinks"
          width="500"
          height="500"
        />
      </div>
      {[
        { section: section1Drinks, name: sectionNames[0] },
        { section: section2Drinks, name: sectionNames[1] },
        { section: section3Drinks, name: sectionNames[2] },
        { section: section4Drinks, name: sectionNames[3] },
        { section: section5Drinks, name: sectionNames[4] },
        { section: section6Drinks, name: sectionNames[5] },
        { section: section7Snacks, name: sectionNames[6] },
      ].map((section, index) => (
        <MenuSlider
          key={index}
          section={section.section}
          sectionName={section.name}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};
export default Drinks;
