import React from 'react';
import { useLocation } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const location = useLocation();
  const drinkIds = location.state.cartItems;
  const sizes = [];
  const navigate = useNavigate();
  //const nav_page = useHistory();

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < drinkIds.length; i++) {
      console.log(drinkIds[i]);
      const parts = drinkIds[i].split(/[\(\)]+/);
      console.log(parts);
      console.log(totalPrice);
      const price = parseFloat(parts[2].trim().substring(1));
      totalPrice += price;
      console.log(totalPrice);
    }
    return totalPrice.toFixed(2);
  }

  const handleBuy = async () => {
    fetch(process.env.REACT_APP_PRERELEASE_PORT+"/buy", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drinkIds: drinkIds, sizes:sizes})
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });

    //nav_page.push('/drinks');

    };

  const backBuy = async () => {
    navigate('/success');
  };

  const comboButton = async () => {
    handleBuy();
    backBuy();
  };
  const count = 0;
  return (
    <div class="flex flex-col items-center mt-10">
    <h1 class="text-2xl font-bold mb-4">Checkout Page</h1>
    <div class="bg-gray-200 p-10 rounded-md mb-4">
      <ul>
        {drinkIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
    <div class="bg-gray-200 p-10 rounded-md mb-4">
      <p class="text-xl font-bold">Total Price: ${getTotalPrice()}</p>
    </div>
    <button
      onClick={comboButton}
      class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Buy
    </button>
  </div>
  );
};

export default Checkout;