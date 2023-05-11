import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const port = process.env.REACT_APP_PRERELEASE_PORT;

function DrinksTable({ data }) {
  const [drinkName, setDrinkName] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const rowClickName = (item) => {
    const oldName = item.name;
    const newName = prompt("Enter the new name for the drink:");
    if (newName) {
      const data = {
        table: "drinks",
        oldName: oldName,
        newName: newName,
      };
      axios
        .patch(port + "/update/name", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const rowClickIngredients = (item) => {
    const name = item.name;
    const secondary = prompt("Enter new ingredients: ");
    if (secondary) {
      const data = {
        table: "drinks",
        name: name,
        secondary: secondary,
      };
      axios
        .patch(port + "/update/secondary", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitNew = (drinkName, ingredientList) => {
    const data = {
      table: "drinks",
      name: drinkName,
      secondary: ingredientList,
    };
    axios
      .post(port + "/add/item", data)
      .then((response) => {
        // Handle the response data if needed
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  };
  return (
    <>
      <input
        placeholder="Drink Name"
        value={drinkName}
        style={{ marginTop: "2%", marginRight: "3%", marginLeft: "15%" }}
        type="text"
        onChange={(e) => setDrinkName(e.target.value)}
      ></input>
      <input
        placeholder="Ingredients List"
        value={ingredientList}
        style={{ marginTop: "2%", marginRight: "3%" }}
        type="text"
        onChange={(e) => setIngredientList(e.target.value)}
      ></input>
      <button onClick={() => submitNew(drinkName, ingredientList)}>
        Submit item
      </button>

      <div className="flex justify-end table-container">
        <div className="w-full overflow-x-scroll">
          <table style={{ marginTop: "55px" }} className="w-full">
            <thead className="tablehead text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Ingredients List</th>
              </tr>
            </thead>
            <tbody className="sales-report-table">
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td onClick={() => rowClickName(item)}>{item.name}</td>
                  <td onClick={() => rowClickIngredients(item)}>
                    {item.ingredients_list}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function IngredientsTable({ data }) {
  const [drinkName, setDrinkName] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const rowClickName = (item) => {
    const oldName = item.name;
    const newName = prompt("Enter the new name for the ingredient:");
    if (newName) {
      const data = {
        table: "ingredients",
        oldName: oldName,
        newName: newName,
      };
      axios
        .patch(port + "/update/name", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const rowClickQuantity = (item) => {
    const name = item.name;
    const secondary = prompt("Enter new quantity: ");
    if (secondary) {
      const data = {
        table: "ingredients",
        name: name,
        secondary: secondary,
      };
      axios
        .patch(port + "/update/secondary", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitNew = (drinkName, ingredientList) => {
    const data = {
      table: "ingredients",
      name: drinkName,
      secondary: ingredientList,
    };
    axios
      .post(port + "/add/item", data)
      .then((response) => {
        // Handle the response data if needed
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  };
  return (
    <>
      <input
        placeholder="Ingredient Name"
        value={drinkName}
        style={{ marginTop: "2%", marginRight: "3%", marginLeft: "15%" }}
        type="text"
        onChange={(e) => setDrinkName(e.target.value)}
      ></input>
      <input
        placeholder="Quantity"
        value={ingredientList}
        style={{ marginTop: "2%", marginRight: "3%" }}
        type="number"
        onChange={(e) => setIngredientList(e.target.value)}
      ></input>
      <button onClick={() => submitNew(drinkName, ingredientList)}>
        Submit item
      </button>

      <div className="flex justify-end table-container">
        <div className="w-full overflow-x-scroll">
          <table style={{ marginTop: "55px" }} className="w-full">
            <thead className="tablehead text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody className="sales-report-table">
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td onClick={() => rowClickName(item)}>{item.name}</td>
                  <td onClick={() => rowClickQuantity(item)}>
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SnacksTable({ data }) {
  const [drinkName, setDrinkName] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const rowClickName = (item) => {
    const oldName = item.name;
    const newName = prompt("Enter the new name for the snack:");
    if (newName) {
      const data = {
        table: "snacks",
        oldName: oldName,
        newName: newName,
      };
      axios
        .patch(port + "/update/name", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const rowClickQuantity = (item) => {
    const name = item.name;
    const secondary = prompt("Enter new quantity: ");
    if (secondary) {
      const data = {
        table: "snacks",
        name: name,
        secondary: secondary,
      };
      axios
        .patch(port + "/update/secondary", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitNew = (drinkName, ingredientList) => {
    const data = {
      table: "snacks",
      name: drinkName,
      secondary: ingredientList,
    };
    axios
      .post(port + "/add/item", data)
      .then((response) => {
        // Handle the response data if needed
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  };
  return (
    <>
      <input
        placeholder="Snack Name"
        value={drinkName}
        style={{ marginTop: "2%", marginRight: "3%", marginLeft: "15%" }}
        type="text"
        onChange={(e) => setDrinkName(e.target.value)}
      ></input>
      <input
        placeholder="Quantity"
        value={ingredientList}
        style={{ marginTop: "2%", marginRight: "3%" }}
        type="number"
        onChange={(e) => setIngredientList(e.target.value)}
      ></input>
      <button onClick={() => submitNew(drinkName, ingredientList)}>
        Submit item
      </button>
      <div className="flex justify-end table-container">
        <div className="w-full overflow-x-scroll">
          <table style={{ marginTop: "55px" }} className="w-full">
            <thead className="tablehead text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody className="sales-report-table">
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td onClick={() => rowClickName(item)}>{item.name}</td>
                  <td onClick={() => rowClickQuantity(item)}>
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TablewareTable({ data }) {
  const [drinkName, setDrinkName] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const rowClickName = (item) => {
    const oldName = item.name;
    const newName = prompt("Enter the new name for the tableware:");
    if (newName) {
      const data = {
        table: "utilities",
        oldName: oldName,
        newName: newName,
      };
      axios
        .patch(port + "/update/name", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const rowClickQuantity = (item) => {
    const name = item.name;
    const secondary = prompt("Enter new quantity: ");
    if (secondary) {
      const data = {
        table: "utilities",
        name: name,
        secondary: secondary,
      };
      axios
        .patch(port + "/update/secondary", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitNew = (drinkName, ingredientList) => {
    const data = {
      table: "utilities",
      name: drinkName,
      secondary: ingredientList,
    };
    axios
      .post(port + "/add/item", data)
      .then((response) => {
        // Handle the response data if needed
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  };
  return (
    <>
      <input
        placeholder="Tableware Name"
        value={drinkName}
        style={{ marginTop: "2%", marginRight: "3%", marginLeft: "15%" }}
        type="text"
        onChange={(e) => setDrinkName(e.target.value)}
      ></input>
      <input
        placeholder="Quantity"
        value={ingredientList}
        style={{ marginTop: "2%", marginRight: "3%" }}
        type="number"
        onChange={(e) => setIngredientList(e.target.value)}
      ></input>
      <button onClick={() => submitNew(drinkName, ingredientList)}>
        Submit item
      </button>

      <div className="flex justify-end table-container">
        <div className="w-full overflow-x-scroll">
          <table style={{ marginTop: "55px" }} className="w-full">
            <thead className="tablehead text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody className="sales-report-table">
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td onClick={() => rowClickName(item)}>{item.name}</td>
                  <td onClick={() => rowClickQuantity(item)}>
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function PricesTable({ data }) {
  const [drinkName, setDrinkName] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const rowClickName = (item) => {
    const oldName = item.name;
    const newName = prompt("Enter the new name for the price:");
    if (newName) {
      const data = {
        table: "prices",
        oldName: oldName,
        newName: newName,
      };
      axios
        .patch(port + "/update/name", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const rowClickQuantity = (item) => {
    const name = item.name;
    const secondary = prompt("Enter new price: ");
    if (secondary) {
      const data = {
        table: "prices",
        name: name,
        secondary: secondary,
      };
      axios
        .patch(port + "/update/secondary", data)
        .then((response) => {
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitNew = (drinkName, ingredientList) => {
    const data = {
      table: "prices",
      name: drinkName,
      secondary: ingredientList,
    };
    axios
      .post(port + "/add/item", data)
      .then((response) => {
        // Handle the response data if needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <input
        placeholder="Name"
        value={drinkName}
        style={{ marginTop: "2%", marginRight: "3%", marginLeft: "15%" }}
        type="text"
        onChange={(e) => setDrinkName(e.target.value)}
      ></input>
      <input
        placeholder="Price"
        value={ingredientList}
        style={{ marginTop: "2%", marginRight: "3%" }}
        type="number"
        onChange={(e) => setIngredientList(e.target.value)}
      ></input>
      <button onClick={() => submitNew(drinkName, ingredientList)}>
        Submit item
      </button>
      <div className="flex justify-end table-container">
        <div className="w-full overflow-x-scroll">
          <table style={{ marginTop: "55px" }} className="w-full">
            <thead className="tablehead text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody className="sales-report-table">
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td onClick={() => rowClickName(item)}>{item.name}</td>
                  <td onClick={() => rowClickQuantity(item)}>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function InventoryView() {
  const [items, setItems] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [table, setTable] = useState(""); // Add table state
  let port = process.env.REACT_APP_PRERELEASE_PORT + "/";

  const location = useLocation();
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
  useEffect(() => {
    console.log(items);
  }, [items]);
  const generateButton = (table_name) => {
    const port_url = port + table_name;
    console.log(port_url);
    axios
      .get(port_url)
      .then((response) => {
        setItems(response.data);
        setTable(table_name);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="grid grid-flow-col justify-items-center">
        <div>
          <button
            className="mt-[2vh] py-[3vh] px-[5vw] bg-red-600 text-white rounded-md justify-center"
            onClick={() => generateButton("drinks")}
          >
            Drinks
          </button>
        </div>
        <div>
          <button
            className="mt-[2vh] py-[3vh] px-[5vw] bg-red-600 text-white rounded-md"
            onClick={() => generateButton("ingredients")}
          >
            Ingredients
          </button>
        </div>
        <div>
          <button
            className="mt-[2vh] py-[3vh] px-[5vw] bg-red-600 text-white rounded-md"
            onClick={() => generateButton("prices")}
          >
            Prices
          </button>
        </div>
        <div>
          <button
            className="mt-[2vh] py-[3vh] px-[5vw] bg-red-600 text-white rounded-md"
            onClick={() => generateButton("snacks")}
          >
            Snacks
          </button>
        </div>
        <div>
          <button
            className="mt-[2vh] py-[3vh] px-[5vw] bg-red-600 text-white rounded-md"
            onClick={() => generateButton("utilities")}
          >
            Tableware
          </button>
        </div>
      </div>

      {/* Render the appropriate table based on the table state */}
      {table === "drinks" && <DrinksTable data={items} />}
      {table === "ingredients" && <IngredientsTable data={items} />}
      {table === "prices" && <PricesTable data={items} />}
      {table === "snacks" && <SnacksTable data={items} />}
      {table === "utilities" && <TablewareTable data={items} />}
    </div>
  );
}
