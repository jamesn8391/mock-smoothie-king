const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { parse } = require('dotenv');

const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)



// Create express app
const app = express();
const port = 3001;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.use(cors({
    origin: ["http://localhost:3000","https://csce331-smoothieking.onrender.com"] 
}));

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for SmoothieKing POS System',
    version: '1.0.0',
    description:
      'This is a REST API for the SmoothieKing POS System',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'https://csce331-smoothieking-api.onrender.com',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  const data = {name: 'Mario', id: '5'};
  res.send(JSON.stringify(data));
});

//routes/index.js
/**
 * @swagger
 * /drinks:
 *   get:
 *     summary: Get a list of all drinks
 *     description: Retrieve a list of all drinks from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of drinks
 *         schema:
 *           type: array
 *       400:
 *         description: Error in database query
 *     tags:
 *       - Viewing
 */
app.get('/drinks', (request, res) => {
    pool.query('select * from drinks order by id;', (error, results) => {
        if (error) {
          res.status(400).json("error in database query");
          throw error
        }
        res.status(200).json(results.rows)
      })
});

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get a list of all ingredients
 *     description: Retrieve a list of all ingredients from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of ingredients
 *         schema:
 *           type: array
 *       400:
 *         description: Error in database query
 *     tags:
 *       - Viewing
 */
app.get('/ingredients', (request, res) => {
    pool.query('select * from ingredients order by id;', (error, results) => {
        if (error) {
          res.status(400).json("error in database query");
          throw error
        }
        res.status(200).json(results.rows)
      })
});

/**
 * @swagger
 * /prices:
 *   get:
 *     summary: Get a list of all prices
 *     description: Retrieve a list of all prices from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of prices
 *         schema:
 *           type: array
 *       400:
 *         description: Error in database query
 *     tags:
 *       - Viewing
 */
app.get('/prices', (request, res) => {
    pool.query('select * from prices order by id;', (error, results) => {
        if (error) {
          res.status(400).json("error in database query");
          throw error
        }
        res.status(200).json(results.rows)
      })
});

/**
 * @swagger
 * /snacks:
 *   get:
 *     summary: Get a list of all snacks
 *     description: Retrieve a list of all snacks from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of snacks
 *         schema:
 *           type: array
 *       400:
 *         description: Error in database query
 *     tags:
 *       - Viewing
 */
app.get('/snacks', (request, res) => {
    pool.query('select * from snacks order by id;', (error, results) => {
        if (error) {
          res.status(400).json("error in database query");
          throw error
        }
        res.status(200).json(results.rows)
      })
});

/**
 * @swagger
 * /utilities:
 *   get:
 *     summary: Get a list of all utilities
 *     description: Retrieve a list of all utilities from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of utilities
 *         schema:
 *           type: array
 *       400:
 *         description: Error in database query
 *     tags:
 *       - Viewing
 */
app.get('/utilities', (request, res) => {
    pool.query('select * from utilities order by id;', (error, results) => {
        if (error) {
          res.status(400).json("error in database query");
          throw error
        }
        res.status(200).json(results.rows)
      })
});

/**
 * @swagger
 * /orderqueue:
 *   get:
 *     summary: Get a list of all orders in the queue
 *     description: Retrieve a list of order_queue table from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of orders in the queue
 *         schema:
 *           type: array
 *       400:
 *         description: Error in database query
 *     tags:
 *       - Viewing
 */
app.get('/orderqueue', (request, res) => {
  pool.query('select * from order_queue order by id;', (error, results) => {
      if (error) {
        res.status(400).json("error in database query");
        throw error
      }
      res.status(200).json(results.rows)
    })
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /buy:
 *   post:
 *     summary: Buy drinks/snacks
 *     description: This endpoint is used to purchase one or more drinks/snacks.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               drinkIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Ingredients updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: An error occurred while updating ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     tags:
 *       - Buying
 */
app.post('/buy', async (req, res) => {
    const currDate = dayjs();
    const drinkIds = req.body.drinkIds;
    //const sizes = req.body.sizes;
    try{
      await pool.query('UPDATE utilities SET quantity=quantity-3 WHERE name=$1', ['napkins']);
    }
    catch(error){
      console.log(error.message);
    }
    try {
      // Go through each drink ID
      var cost = 0;
      for (const drinkId of drinkIds) {
        
        const parts = drinkId.split(/[\(\)]+/);
        console.log(parts);
        const drinkName = parts[0].trim(); // "Drink"
        const size = parts[1].trim(); // size
        const drinkTmp = await pool.query('SELECT * FROM drinks WHERE name=$1', [drinkName]);
        const drink = drinkTmp.rows[0];
        if(size == "small")
          cost = 5.29;
        else if(size == "medium")
          cost = 7.29;
        else if(size =="large")
          cost = 8.49;
        else
          cost = 1.49;
        if(drink){
          // Retrieve ingredients_list for the current drink ID
          const result = await pool.query('SELECT ingredients_list FROM drinks WHERE name=$1', [drinkName]);
          const ingredientsList = result.rows[0].ingredients_list;
          await pool.query('UPDATE utilities SET quantity=quantity-1 WHERE name=$1', ['straws']);
          // Decrease quantity for each ingredient in the list
          const ingredientNames = ingredientsList.split(',');
          for (const ingredientName of ingredientNames) {
            await pool.query('UPDATE ingredients SET quantity=quantity-1 WHERE name=$1', [ingredientName]);
          }
          const idVal = await pool.query('SELECT MAX(id) FROM order_history');
          const maxId = idVal.rows[0].max + 1;
          try{
            const newDrinkQuery = `INSERT INTO order_queue VALUES (
              '${currDate.format('YYYY-MM-DD')}',
              '${currDate.tz("America/Chicago").format('HH:mm:ss')}',
              '${maxId}',
              '${drinkName}',
              '${size}',
              'null',
              'null',
              '${cost}'
            )`;

            const secondDrinkQuery = `INSERT INTO order_history VALUES (
              '${currDate.format('YYYY-MM-DD')}',
              '${currDate.tz("America/Chicago").format('HH:mm:ss')}',
              '${maxId}',
              '${drinkName}',
              '${size}',
              'null',
              'null',
              '${cost}'
            )`;
            await pool.query(newDrinkQuery);
            await pool.query(secondDrinkQuery);
          }
          catch (error){
              console.log(error);
          }

        }
        else{
          await pool.query('UPDATE snacks SET quantity=quantity-1 WHERE name=$1', [drinkId]);
          const idVal = await pool.query('SELECT MAX(id) FROM order_history');
          const maxId = idVal.rows[0].max + 1;
          const newDrinkQuery = `INSERT INTO order_queue VALUES (
            '${currDate.format('YYYY-MM-DD')}',
            '${currDate.tz("America/Chicago").format('HH:mm:ss')}',
            '${maxId}',
            'null',
            'null',
            'null',
            '${drinkName}',
            '${cost}'
          )`;
          const secondDrinkQuery = `INSERT INTO order_history VALUES (
            '${currDate.format('YYYY-MM-DD')}',
            '${currDate.tz("America/Chicago").format('HH:mm:ss')}',
            '${maxId}',
            'null',
            'null',
            'null',
            '${drinkName}',
            '${cost}'
          )`;
          await pool.query(newDrinkQuery);
          await pool.query(secondDrinkQuery);
        }

      }
  
      res.status(200).json({ message: 'Ingredients updated successfully.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'An error occurred while updating ingredients.' });
    }

  
  });

  /**
 * @swagger
 * /add/item:
 *   post:
 *     summary: Add a new item to the database
 *     description: Add a new drink, ingredient, price, utility, or snack to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item to add.
 *               table:
 *                 type: string
 *                 description: The name of the table to add the item to. Valid tables are 'drinks', 'ingredients', 'prices', 'utilities', and 'snacks'.
 *               secondary:
 *                 type: string
 *                 description: The secondary quality of the item to add. This depends on the type of item being added. For example, if the item being added is a drink, this would be a comma-separated list of the ingredients in the drink.
 *             required:
 *               - name
 *               - table
 *               - secondary
 *     responses:
 *       200:
 *         description: The item was added successfully.
 *       400:
 *         description: The JSON request is malformed or the item name is already in the database.
 *       500:
 *         description: There was an error adding the item to the database.
 *     tags:
 *       - Adding
 */
app.post('/add/item', async (req, res) => { //add a new drink to the database
  let validTables = ['drinks','ingredients','prices','utilities','snacks'];

    let nameUntrimmed = req.body.name;
    const table = req.body.table;
    const secondaryQuality = req.body.secondary;

    if(nameUntrimmed == null || table == null || secondaryQuality == null){
      res.status(400).json("Your json request is malformed");
      return;
    }

    const name = nameUntrimmed.trim();
    /* JSON Example
    {
      "table":"ingredients",
      "name:":"Peaches",
      "secondary":"500"
    }
    */

  //check if table entered is a valid table in the database
  let tableIsValid = false;
  for(let i = 0; i < validTables.length; i++){
    if(validTables[i] == table){
      tableIsValid = true;
    }
  }
  if(!tableIsValid){
    res.status(500).json("The database \'" + table + "\' that you are trying to create a new item in does not exist.");
    return;
  }

  //check if item is already in database
  let result = '';
  const nameQuery = 'select name from ' + table + ' order by id;';
  try{ //get names from database for error checking
    result = await pool.query({
      rowMode: 'array',
      text: nameQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting names from " + table + "database.");
    console.log(error);
    return;
  }
  let names_list = [];
  for(let i = 0; i < result.rows.length; i++){
    names_list[i] = result.rows[i][0];
  }
  let nameFound = false;
  for(let i = 0; i < names_list.length;i++){ //check if oldname is in database before query is made
    if(names_list[i] == name){
      nameFound = true;
    }
  }
  if(nameFound){
    res.status(400).json('The item name \'' + name + '\' is already in the database \'' + table + '\'.');
    return;
  }

  //get id from database for creating new item
  let id = 0;
  const idQuery = 'select id from ' + table + ' order by id desc limit 1;';
  try{ //get id from database to use
    const result = await pool.query({
      rowMode: 'array',
      text: idQuery,
    })
    id = result.rows[0][0];
    id ++;
  } catch (error){
    res.status(500).json("error in getting last id from \'" + table + "\' database");
    return;
  }
  
  if(table == 'drinks'){ //secondary quality is list of ingredients
    //get list of ingredients from ingredients database and check if input ingredients are correct
    let ingredients = ''; //get names from database to check if item exists
    const ingredientsQuery = 'select name from ingredients order by id;';
    try{ //get names from database for error checking
      ingredients = await pool.query({
        rowMode: 'array',
        text: ingredientsQuery,
      })
    } catch (error){
      res.status(500).json("Error in getting valid ingredients from database.");
      console.log(error);
      return;
    }
    let ingredients_list = [];
    for(let i = 0; i < ingredients.rows.length; i++){
      ingredients_list[i] = ingredients.rows[i][0].trim(); 
      //get ingredients trimmed just in case but ingredients should be trimmed by postgres
    }
    let inputtedIngredients = secondaryQuality.split(',');
    for(let i = 0; i < inputtedIngredients.length; i++){
      inputtedIngredients[i] = inputtedIngredients[i].trim();
    }
    for(let inputIndex = 0; inputIndex < inputtedIngredients.length; inputIndex++){  
      //checks if the ingredients inputted are in the ingredients databse
      let isValid = false;
      for(let validIndex = 0; validIndex < ingredients_list.length; validIndex++){
        if(ingredients_list[validIndex] == inputtedIngredients[inputIndex]){
          isValid = true;
        }
      }
      if(!isValid){
        res.status(500).json('The drink ingredient \'' + inputtedIngredients[inputIndex] + 
          '\' is not in the ingredients database. Make sure your ingredients are comma separated');
        return; 
      }
    }

    const validIngredients = inputtedIngredients.join();
    const newDrinkQuery = 'insert into drinks values (' + id + ', \'' + name + '\', ' + '\'' + validIngredients + '\');';
    try{
      await pool.query(newDrinkQuery);
    } catch (error){
      console.log(newDrinkQuery);
      res.status(500).json("error in creating new drink \'" + name + "\', problem with database query.");
      return;
    }

    res.status(200).json("Successfully created new drink \'" + name + "\' with ingredients \'" + validIngredients + '\'.');
    return;
  }
  else if(table == 'ingredients' || table == 'snacks' || table == 'utilities'){ //all these have second quality of quantity which is integer

    const parsedQuantity = parseInt(secondaryQuality, 10); //parse value to integer to make sure it is valid
    if(isNaN(parsedQuantity)){ //error if parsing is Nan - meaning not an integer
      res.status(500).json('The quantity you entered for \'' + name + '\' is not a valid integer');
      return;
    }
    const newItemQuery = 'insert into ' + table + ' values (' + id + ', \'' + name + '\', ' + '\'' + parsedQuantity + '\');';
    console.log(newItemQuery);
    try{
      await pool.query(newItemQuery);
    } catch (error){
      console.log(newItemQuery);
      res.status(500).json("error in creating new item \'" + name + "\', problem with database query.");
      return;
    }

    res.status(200).json("Successfully created new item \'" + name + "\' with quantity \'" + parsedQuantity + '\' in the ' + table + ' database.');
    return;
  }
  else if(table == 'prices'){ //this has a secondary quantity which is a cost

    const parsedPrice = parseFloat(secondaryQuality).toFixed(2);
    if(isNaN(parsedPrice)){
      res.status(500).json('The quantity you entered for \'' + name + '\' is not a valid price in the form x.xx');
      return;
    }

    const newPriceQuery = 'insert into ' + table + ' values (' + id + ', \'' + name + '\', ' + '\'' + parsedPrice + '\');';
    try{
      await pool.query(newPriceQuery);
    } catch (error){
      res.status(500).json("error in creating " + name + ", problem with database query.");
      return;
    }
    res.status(200).json("Successfully created price \'" + name + "\' with cost \'" + parsedPrice + "\'.");
    return;
  } 

  res.status(500).json("error in creating new item \'" + name + "\'.");
});

/**
 * @swagger
 *
 * /update/name:
 *   patch:
 *     summary: Update name of item.
 *     description: Update the name of an item in a specified table.
 *     tags: [Updating]
 *     requestBody:
 *       description: JSON object containing the table name, old name and new name of the item to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table:
 *                 type: string
 *                 description: The table name where the item to be updated is located.
 *               oldName:
 *                 type: string
 *                 description: The current name of the item to be updated.
 *               newName:
 *                 type: string
 *                 description: The new name to update the item with.
 *             example:
 *               table: "drinks"
 *               oldName: "Watermelon Slush"
 *               newName: "Watermelon Blueberry Slush"
 *     responses:
 *       '200':
 *         description: Successfully updated the item name.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Successfully renamed Watermelon Slush to Watermelon Blueberry Slush in the 'drinks' database."
 *       '400':
 *         description: Malformed JSON body or item not found in the specified table.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "The item name 'Peach Freeze' is not in the database 'drinks'."
 *       '500':
 *         description: Internal server error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error in getting names from drinks database."
 */
app.patch('/update/name', async (req, res) => { //update name of item (should be made generic)
  let validTypes = ['drinks','ingredients','prices','utilities','snacks'];
  const type = req.body.table;
  const oldNameUntrimmed = req.body.oldName;
  const newNameUntrimmed = req.body.newName;
  if(type == null || oldNameUntrimmed == null || newNameUntrimmed == null){
    res.status(400).json("Please check your json body, it is malformed.");
    return;
  }

  const oldName = oldNameUntrimmed.trim();
  const newName = newNameUntrimmed.trim();

  /* JSON example
  {
    "table":"ingredients",
    "oldName":"Watermelon",
    "newName":"Frozen Watermelon"
  }
  */
  
  let typeIsValid = false;
  for(let i = 0; i < validTypes.length; i++){
    if(validTypes[i] == type){
      typeIsValid = true;
    }
  }

  if(!typeIsValid){
    res.status(500).json("The database \'" + type + "\' that you are trying to update does not exist.");
    return;
  }

  let result = '';
  const idQuery = 'select name from ' + type + ' order by id;';
  try{ //get names from database for error checking
    result = await pool.query({
      rowMode: 'array',
      text: idQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting names from " + type + "database.");
    console.log(error);
    return;
  }

  let names_list = [];
  for(let i = 0; i < result.rows.length; i++){
    names_list[i] = result.rows[i][0];
  }

  let nameFound = false;
  for(let i = 0; i < names_list.length;i++){ //check if oldname is in database before query is made
    if(names_list[i] == oldName){
      nameFound = true;
    }
  }
  if(!nameFound){
    res.status(400).json('The item name \'' + oldName + '\' is not in the database \'' + type + '\'.');
    return;
  }

  const updateNameQuery = 'update ' + type + ' set name = ' + '\'' + newName + '\' where name = \'' + oldName + '\';' ;

  try{
    await pool.query(updateNameQuery);
  } catch (error){
    res.status(500).json("error in renaming drink");
    console.log(error);
  }

  res.status(200).json("Successfully renamed " + oldName + " to " + newName + " in the \'" + type + "\' database.");

});

/**
 * @swagger
 * /update/secondary:
 *   patch:
 *     summary: Update a secondary field in a database table
 *     tags: [Updating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table:
 *                 type: string
 *                 enum: ['drinks','ingredients','prices','utilities','snacks']
 *               name:
 *                 type: string
 *               secondary:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated item in database
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Successfully updated item 'Watermelon' in the database 'ingredients' to a new value of '500'.
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Please enter a table in your json request.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error in getting names from ingredients database.
 */
app.patch('/update/secondary', async (req, res) => {
  const table = req.body.table;
  let nameUntrimmed = req.body.name;
  const secondary_quality = req.body.secondary;
  let validTables = ['drinks','ingredients','prices','utilities','snacks'];
  
  if(table == null){
    res.status(400).json("Please enter a table in your json request");
    return;
  }

  if(nameUntrimmed == null){
    res.status(400).json("Please enter a name in your json request");
    return;
  }

  if(secondary_quality == null){
    res.status(400).json("Please enter a secondary to update in your json request");
    return;
  }

  const name = nameUntrimmed.trim();

  /* example of json
  {
    "table":"ingredients",
    "name":"Watermelon",
    "secondary":"500",
  }
  */

  //check if table entered is a valid table in the database
  let tableIsValid = false;
  for(let i = 0; i < validTables.length; i++){
    if(validTables[i] == table){
      tableIsValid = true;
    }
  }
  if(!tableIsValid){
    res.status(500).json("The database \'" + table + "\' that you are trying to update does not exist.");
    return;
  }

  
  let result = ''; //get names from database to check if item exists
  const idQuery = 'select name from ' + table + ' order by id;';
  try{ //get names from database for error checking
    result = await pool.query({
      rowMode: 'array',
      text: idQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting names from " + table + "database.");
    console.log(error);
    return;
  }

  //check if name is in corresponding database table
  let names_list = []; 
  for(let i = 0; i < result.rows.length; i++){
    names_list[i] = result.rows[i][0];
  }
  let nameFound = false;
  for(let i = 0; i < names_list.length;i++){ //check if item is in database before query is made
    if(names_list[i] == name){
      nameFound = true;
    }
  }
  if(!nameFound){
    res.status(400).json('The item name \'' + name + '\' is not in the database \'' + table + '\'.');
    return;
  }

  if(table == 'ingredients' || table == 'snacks' || table == 'utilities'){ //all these have second quality of quantity which is integer

    const parsedQuantity = parseInt(secondary_quality, 10); //parse value to integer to make sure it is valid
    if(isNaN(parsedQuantity)){ //error if parsing is Nan - meaning not an integer
      res.status(500).json('The quantity you entered for \'' + name + '\' is not a valid integer');
      return;
    }

    const updateQuantityQuery = 'update ' + table + ' set quantity = ' + parsedQuantity + ' where name = \'' + name + '\';';

    try{
      await pool.query(updateQuantityQuery);
    } catch (error){
      res.status(500).json("error in updating " + name + ", problem with database query.");
      return;
    }

    res.status(200).json("Successfully updated item \'" + name + "\' in the database \'" + table + "\' to a new value of \'" + parsedQuantity + "\'.");
    return;
  }
  else if(table == 'drinks'){ //this has a secondary quantity which is a list of ingredients

    //get list of ingredients from ingredients database and check if input ingredients are correct
    let ingredients = ''; //get names from database to check if item exists
    const ingredientsQuery = 'select name from ingredients order by id;';
    try{ //get names from database for error checking
      ingredients = await pool.query({
        rowMode: 'array',
        text: ingredientsQuery,
      })
    } catch (error){
      res.status(500).json("Error in getting valid ingredients from database.");
      console.log(error);
      return;
    }
    let ingredients_list = [];
    for(let i = 0; i < ingredients.rows.length; i++){
      ingredients_list[i] = ingredients.rows[i][0].trim(); 
      //get ingredients trimmed just in case but ingredients should be trimmed by postgres
    }
    let inputtedIngredients = secondary_quality.split(',');
    for(let i = 0; i < inputtedIngredients.length; i++){
      inputtedIngredients[i] = inputtedIngredients[i].trim();
    }
    for(let inputIndex = 0; inputIndex < inputtedIngredients.length; inputIndex++){  
      //checks if the ingredients inputted are in the ingredients databse
      let isValid = false;
      for(let validIndex = 0; validIndex < ingredients_list.length; validIndex++){
        if(ingredients_list[validIndex] == inputtedIngredients[inputIndex]){
          isValid = true;
        }
      }
      if(!isValid){
        res.status(500).json('The drink ingredient \'' + inputtedIngredients[inputIndex] + '\' is not in the ingredients database. Make sure your ingredients are comma separated');
        return;
      }
    }

    const validIngredients = inputtedIngredients.join();


    const updateIngredientsQuery = 'update ' + table + ' set ingredients_list = \'' + validIngredients + '\' where name = \'' + name + '\';';

    try{
      await pool.query(updateIngredientsQuery);
    } catch (error){
      console.log(updateIngredientsQuery);
      res.status(500).json("error in updating the ingredients of \'" + name + "\', problem with database query.");
      return;
    }

    
    res.status(200).json("Successfully updated ingredients of the drink \'" + name + "\' to \'" + validIngredients + '\'.');
    return;
  }
  else if(table == 'prices'){ //this has a secondary quantity which is a cost
    const parsedPrice = parseFloat(secondary_quality).toFixed(2);
    if(isNaN(parsedPrice)){
      res.status(500).json('The quantity you entered for \'' + name + '\' is not a valid price in the form x.xx');
      return;
    }

    const updatePriceQuery = 'update ' + table + ' set price = ' + parsedPrice + ' where name = \'' + name + '\';';
    try{
      await pool.query(updatePriceQuery);
    } catch (error){
      res.status(500).json("error in updating " + name + ", problem with database query.");
      return;
    }
    res.status(200).json("Successfully updated item \'" + name + "\' in the database \'" + table + "\' to a new value of \'" + parsedPrice + "\'.");
    return;
  } 

  res.status(500).json("error in updating " + name);
});

/**
 * @swagger
 * /restock/{ingredients_max}/{chips_max}/{utilities_max}/{percentage}:
 *   get:
 *     summary: Get items that need restocking based on given maximum and percentage values.
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: ingredients_max
 *         description: The maximum quantity of ingredients allowed.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: chips_max
 *         description: The maximum quantity of chips allowed.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: utilities_max
 *         description: The maximum quantity of utilities allowed.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: percentage
 *         description: The minimum percentage of items remaining before restocking is needed.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of items that need restocking.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the item.
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the item that needs restocking.
 *       '500':
 *         description: An error occurred while fetching data from the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
app.get('/restock/:ingredients_max/:chips_max/:utilities_max/:percentage', async (req, res) => {
  const ingredientsMax = req.params['ingredients_max'];
  const chipsMax = req.params['chips_max'];
  const utilitiesMax = req.params['utilities_max'];
  const lowPercent = req.params['percentage'];

  let ingredients = ''; //get names from database to check if item exists
  const ingredientsQuery = 'select * from ingredients order by id;';
  try{ //get names from database for error checking
    ingredients = await pool.query({
      rowMode: 'array',
      text: ingredientsQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting ingredients from database.");
    console.log(error);
    return;
  }

  let chips = ''; //get names from database to check if item exists
  const chipsQuery = 'select * from snacks order by id;';
  try{ //get names from database for error checking
    chips = await pool.query({
      rowMode: 'array',
      text: chipsQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting chips from database.");
    console.log(error);
    return;
  }

  let utilities = ''; //get names from database to check if item exists
  const utilitiesQuery = 'select * from utilities order by id;';
  try{ //get names from database for error checking
    utilities = await pool.query({
      rowMode: 'array',
      text: utilitiesQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting utilities from database.");
    console.log(error);
    return;
  }

  const ingredientsLow = Math.round(ingredientsMax * (lowPercent/100));
  const chipsLow = Math.round(chipsMax * (lowPercent/100));
  const utilitiesLow = Math.round(utilitiesMax * (lowPercent/100));
  
  let restockItems = [];


  for(let i = 0; i < ingredients.rows.length; i++){
    if(ingredients.rows[i][2] <= ingredientsLow){
      restockItems.push({name: ingredients.rows[i][1], quantity: ingredients.rows[i][2]});
    }
  }

  for(let i = 0; i < chips.rows.length; i++){
    if(chips.rows[i][2] <= chipsLow){
      restockItems.push({name: chips.rows[i][1], quantity: chips.rows[i][2]});
    }
  }

  for(let i = 0; i < utilities.rows.length; i++){
    if(utilities.rows[i][2] <= utilitiesLow){
      restockItems.push({name: utilities.rows[i][1], quantity: utilities.rows[i][2]});
    }
  }

  res.status(200).json(restockItems);
  // res.status(200).json("Successfully created restock report using ingredients max of: " + ingredientsMax + ", chips max of: "
  //      + chipsMax + ", utilities max of " + utilitiesMax + ", and a restock threshold of " + lowPercent + "%.");
});

/**
 * @swagger
 * /sales/{start}/{end}:
 *   get:
 *     tags: [Reports]
 *     summary: Get sales data for a given date range
 *     description: Retrieve sales data for the specified date range.
 *     parameters:
 *       - name: start
 *         in: path
 *         description: The start date of the sales data range in YYYY-MM-DD format
 *         required: true
 *         schema:
 *           type: string
 *       - name: end
 *         in: path
 *         description: The end date of the sales data range in YYYY-MM-DD format
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of objects representing the sales data for each item type sold in the given date range.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Type:
 *                     type: string
 *                     description: The type of the item, either "drink" or "chip".
 *                   Name:
 *                     type: string
 *                     description: The name of the item.
 *                   Amount:
 *                     type: integer
 *                     description: The number of items sold in the given date range.
 *       '400':
 *         description: The date range specified is invalid or the dates are not in the correct format.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '500':
 *         description: An error occurred while querying the order_history table.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.get('/sales/:start/:end', async (req, res) => {
  const startTime = req.params['start'];
  const endTime = req.params['end'];

  //date in database is in the form 'YYYY-MM-DD' and date must be in 2023
  const minStart = dayjs('01-01-2023').format('YYYY-MM-DD');
  const maxEnd = dayjs('12-31-2023').format('YYYY-MM-DD');

  let formatStart = dayjs(startTime).format('YYYY-MM-DD',  true);
  let formatEnd = dayjs(endTime).format('YYYY-MM-DD', true);

  if(formatStart == 'Invalid Date' || formatEnd == 'Invalid Date'){
    res.status(400).json("The date you entered is not in a valid format or it is impossible, try YYYY-MM-DD.");
    return;
  }
  
  if(!dayjs(formatStart).isBetween(minStart, maxEnd, 'day', '[]')){
    res.status(400).json('The date you entered is invalid, it must be between 2023-01-01 and 2023-12-31');
    return;
  }
  if(!dayjs(formatEnd).isBetween(minStart, maxEnd, 'day', '[]')){
    res.status(400).json('The date you entered is invalid, it must be between 2023-01-01 and 2023-12-31');
    return;
  }
  if(!dayjs(formatEnd).isSameOrAfter(formatStart, 'day')){
    res.status(400).json('The date range you entered is impossible, start date must be on or before end date');
    return;
  }

  let historyResults = ''; //get names from database to check if item exists
  const historyQuery = 'select drink, chips from order_history where date between \'' + formatStart + '\' and \'' + formatEnd + '\';';
  try{ //get names from database for error checking
    historyResults = await pool.query({
      rowMode: 'array',
      text: historyQuery,
    })
  } catch (error){
    res.status(500).json("Error in querying order_history table");
    console.log(error);
    return;
  }

  let drinksOrdered = [];
  let chipsOrderered = [];
  for(let i = 0; i < historyResults.rows.length; i++){
    drinksOrdered[i] = historyResults.rows[i][0];
    chipsOrderered[i] = historyResults.rows[i][1];
  }
  
  let seenDrinks = [];
  let seenChips = [];
  for(let orderIndex = 0; orderIndex < drinksOrdered.length; orderIndex++){
    let drinkBeenSeen = false;
    if(drinksOrdered[orderIndex] == 'null') continue;
    for(let seenIndex = 0; seenIndex < seenDrinks.length; seenIndex++){
        if(drinksOrdered[orderIndex] == seenDrinks[seenIndex]){
          drinkBeenSeen = true;
        }
    }
    if(!drinkBeenSeen){
      seenDrinks.push(drinksOrdered[orderIndex]);
    }
  }

  for(let orderIndex = 0; orderIndex < chipsOrderered.length; orderIndex++){
    let chipsBeenSeen = false;
    if(chipsOrderered[orderIndex] == 'null') continue;
    for(let seenIndex = 0; seenIndex < seenChips.length; seenIndex++){
        if(chipsOrderered[orderIndex] == seenChips[seenIndex]){
          chipsBeenSeen = true;
        }
    }
    if(!chipsBeenSeen){
      seenChips.push(chipsOrderered[orderIndex]);
    }
  }

  let drinksCount = Array(seenDrinks.length).fill(0); //create new arrays that keep track of how many of an item is sold
  let chipsCount = Array(seenChips.length).fill(0);
  
  for(let orderIndex = 0; orderIndex < drinksOrdered.length; orderIndex++){
    for(let seenIndex = 0; seenIndex < seenDrinks.length; seenIndex++){
      if(drinksOrdered[orderIndex] == seenDrinks[seenIndex]){
        drinksCount[seenIndex]++;
      }
    }
  }

  for(let orderIndex = 0; orderIndex < chipsOrderered.length; orderIndex++){
    for(let seenIndex = 0; seenIndex < seenChips.length; seenIndex++){
      if(chipsOrderered[orderIndex] == seenChips[seenIndex]){
        chipsCount[seenIndex]++;
      }
    }
  }
  
  var chips = [];
  for(let i = 0; i < seenChips.length; i++){ //create json of chips to send as response
    var ChipInfo = {
      "Type" : "chip",
      "Name" : seenChips[i],
      "Amount" : chipsCount[i]
    };
    chips.push(ChipInfo);
  }

  var drinks = [];
  for(let i = 0; i < seenDrinks.length; i++){
    var DrinkInfo = {
      "Type": "drink",
      "Name": seenDrinks[i],
      "Amount": drinksCount[i]
    }
    drinks.push(DrinkInfo);
  }
  
  var chipsAndDrinks = chips.concat(drinks);
  res.status(200).json(JSON.parse(JSON.stringify(chipsAndDrinks)));
});

/**
 * @swagger
 * /delete/{table}/{name}:
 *   delete:
 *     summary: Delete a record from the specified table
 *     description: Deletes a record from the specified table in the database based on the provided record name.
 *     tags: [Deleting]
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *           enum: [drinks, ingredients, prices, utilities, snacks]
 *         description: The name of the table to delete from.
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the record to delete from the table.
 *     responses:
 *       '200':
 *         description: Successfully deleted record from the specified table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating the record was deleted.
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating there was a problem with the database query.
 *       '500':
 *         description: Invalid table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the specified table is not valid in the database.
 */

app.delete('/delete/:table/:name', async (req, res) => {
  const table = req.params['table'];
  const name = req.params['name'].trim();
  let validTables = ['drinks','ingredients','prices','utilities','snacks'];

  //check if table entered is a valid table in the database
  let tableIsValid = false;
  for(let i = 0; i < validTables.length; i++){
    if(validTables[i] == table){
      tableIsValid = true;
    }
  }
  if(!tableIsValid){
    res.status(500).json("The database \'" + table + "\' that you are trying to update does not exist.");
    return;
  }

  const deleteQuery = 'delete from ' + table + ' where name = \'' + name + '\';';
  pool.query((deleteQuery), (error, results) => {
    if (error) {
      res.status(400).json("error in database query");
      console.log(error);
      return;
    }
    res.status(200).json("Successfully deleted " + name + " from the database " + table + '.')
    return;
  })
});

/**
 * @swagger
 * /user/create/{email}/{permissions}:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database with the given email and permissions
 *     tags: [Email]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the new user
 *       - in: path
 *         name: permissions
 *         schema:
 *           type: string
 *         required: true
 *         description: The permissions of the new user
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: The permission given is not a valid permission
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '500':
 *         description: An error occurred in getting last id from database or in database query
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.post('/user/create/:email/:permissions', async (req, res) => {
  const email = req.params['email'];
  const permissions = req.params['permissions'];
  let validPermissions = ['Manager', 'Server', 'Customer'];

  if(!validPermissions.includes(permissions)){
    res.status(400).json("The permission given is not a valid permission, try \'Manager\', \'Server\', or \'Customer\'");
    return;
  };

  let id = 0;
  const idQuery = 'select id from users order by id desc limit 1;';
  try{ //get id from database to use
    const result = await pool.query({
      rowMode: 'array',
      text: idQuery,
    })
    id = result.rows[0][0];
    id ++;
  } catch (error){
    res.status(500).json("error in getting last id from \'users\' database");
    return;
  }
  const newUserQuery = 'insert into users values (' + id + ', \'' + email + '\', ' + '\'' + permissions + '\');';
  console.log(newUserQuery);

  pool.query((newUserQuery), (error, results) => {
    if (error) {
      res.status(500).json("error in database query");
      console.log(error);
      return;
    }
    res.status(200).json("Successfully created new user with email: \'" + email + '\'.')
    return;
  })
});

/**
 * @swagger
 * /user/get/{email}:
 *   post:
 *     summary: Get a user's credentials from inputted email
 *     description: Gets a user's credentials from the users database
 *     tags: [Email]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      description: email of user that was queuried.
 *                    access:
 *                      type: string
 *                      description: access that the associated user has, Manager, Server, or Customer
 *       '500':
 *         description: An error occurred in getting last id from database or in database query
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.get('/user/get/:email', async (req, res) => {
  const email = req.params['email'];
  const userQuery = 'select * from users where email = \'' + email + '\';';

  let user = ''; //get names from database to check if item exists
  try{ //get names from database for error checking
    user = await pool.query({
      text: userQuery,
    })
  } catch (error){
    res.status(500).json("Error in getting valid user with email: \'" + email + "\' from database.");
    console.log(error);
    return;
  }
  if(user.rows.length == 0){
    const customer = [
      {email: email, access: "Customer"},
    ];
    res.status(200).json(customer);
  } else{
    const customer = [
      {email: user.rows[0].email, access: user.rows[0].access},
    ];
    res.status(200).json(customer);
  }
});

/**
 * @swagger
 *
 * /excess/{date}:
 *   get:
 *     summary: Endpoint to get the count of sold drinks and chips for a given date
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: The date from which the count is started in 'YYYY-MM-DD' format
 *     responses:
 *       200:
 *         description: Returns the count of sold drinks and chips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drinks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the drink
 *                       count:
 *                         type: number
 *                         description: The count of the drink sold
 *                 chips:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the chips
 *                       count:
 *                         type: number
 *                         description: The count of the chips sold
 *       400:
 *         description: Returns an error if the input date format is invalid or if the input date is not in 2023 or before the current date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Returns an error if there was an issue querying the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
app.get('/excess/:date', async (req, res) => {
  const inputDate = req.params['date'];
  let inputDay = dayjs(inputDate).format('YYYY-MM-DD');
  const minDate = dayjs('2023-01-01').format('YYYY-MM-DD');
  const currDate = dayjs().format('YYYY-MM-DD');
  if(!dayjs(inputDate, "YYYY-MM-DD", true).isValid()){
    res.status(400).json("Your date format is invalid, please use a YYYY-MM-DD format.");
    return;
  }
  if(!dayjs(inputDate).isBetween(minDate, currDate, 'day', '[]')){
    res.status(400).json("Please enter a date in 2023 before or on the current date");
    return;
  }
  let historyResults = ''; //get names from database to check if item exists
  const historyQuery = 'select drink, chips from order_history where date between \'' + inputDay + '\' and \'' + currDate + '\';';
  try{ //get names from database for error checking
    historyResults = await pool.query({
      rowMode: 'array',
      text: historyQuery,
    })
  } catch (error){
    res.status(500).json("Error in querying order_history table");
    console.log(error);
    return;
  }

  let drinksOrdered = [];
  let chipsOrderered = [];
  for(let i = 0; i < historyResults.rows.length; i++){
    drinksOrdered[i] = historyResults.rows[i][0];
    chipsOrderered[i] = historyResults.rows[i][1];
  }
  
  let seenDrinks = [];
  let seenChips = [];
  for(let orderIndex = 0; orderIndex < drinksOrdered.length; orderIndex++){
    let drinkBeenSeen = false;
    if(drinksOrdered[orderIndex] == 'null') continue;
    for(let seenIndex = 0; seenIndex < seenDrinks.length; seenIndex++){
        if(drinksOrdered[orderIndex] == seenDrinks[seenIndex]){
          drinkBeenSeen = true;
        }
    }
    if(!drinkBeenSeen){
      seenDrinks.push(drinksOrdered[orderIndex]);
    }
  }

  for(let orderIndex = 0; orderIndex < chipsOrderered.length; orderIndex++){
    let chipsBeenSeen = false;
    if(chipsOrderered[orderIndex] == 'null') continue;
    for(let seenIndex = 0; seenIndex < seenChips.length; seenIndex++){
        if(chipsOrderered[orderIndex] == seenChips[seenIndex]){
          chipsBeenSeen = true;
        }
    }
    if(!chipsBeenSeen){
      seenChips.push(chipsOrderered[orderIndex]);
    }
  }

  let drinksCount = Array(seenDrinks.length).fill(0); //create new arrays that keep track of how many of an item is sold
  let chipsCount = Array(seenChips.length).fill(0);
  
  for(let orderIndex = 0; orderIndex < drinksOrdered.length; orderIndex++){
    for(let seenIndex = 0; seenIndex < seenDrinks.length; seenIndex++){
      if(drinksOrdered[orderIndex] == seenDrinks[seenIndex]){
        drinksCount[seenIndex]++;
      }
    }
  }

  for(let orderIndex = 0; orderIndex < chipsOrderered.length; orderIndex++){
    for(let seenIndex = 0; seenIndex < seenChips.length; seenIndex++){
      if(chipsOrderered[orderIndex] == seenChips[seenIndex]){
        chipsCount[seenIndex]++;
      }
    }
  }

  //drink cacluations
  //query items from current stock
  let drinkIngredients = ''; //get names from database to check if item exists
  const drinksIngredientsQuery = 'select name,ingredients_list from drinks order by id;';
  try{ //get names from database for error checking
    drinkIngredients = await pool.query({
      rowMode: 'array',
      text: drinksIngredientsQuery,
    })
  } catch (error){
    res.status(500).json("Error in querying drinks table");
    console.log(error);
    return;
  }
  const drinksWithIngredients = drinkIngredients.rows;
  var drinkNameIngredients = []; //gets into a 2d array - 1st is name, then followed by list of ingredients
  for(let i = 0; i < drinksWithIngredients.length; i++){
    drinkNameIngredients[i] = new Array(1);
    drinkNameIngredients[i][0] = drinksWithIngredients[i][0];
    let result = drinksWithIngredients[i][1].split(',');
    for(let j = 0; j < result.length; j++){
      result[j] = result[j].trim();
      drinkNameIngredients[i].push(result[j]);
    }
  }

  //query ingredients from current stock
  let ingredientsList = ''; //get names from database to check if item exists
  const ingredientsQuery = 'select name, quantity from ingredients order by id;';
  try{ //get names from database for error checking
    ingredientsList = await pool.query({
      rowMode: 'array',
      text: ingredientsQuery,
    })
  } catch (error){
    res.status(500).json("Error in querying drinks table");
    console.log(error);
    return;
  }
  const ingredientsCurr = ingredientsList.rows; //current ingredients in database
  let ingredientsCounting = structuredClone(ingredientsCurr);//ingredient names with their counted amounts
  for(let i = 0; i < ingredientsCounting.length; i++){
    ingredientsCounting[i][1] = 0;
  }
  let drinkListLength = Math.max(drinkNameIngredients.length, drinksCount.length);//ensure array is bigger of whichever needed
  for(let drinkNameIngredientsI = 0; drinkNameIngredientsI < drinkListLength; drinkNameIngredientsI++){
    let currDrinkName = drinkNameIngredients[drinkNameIngredientsI][0];
    //need to match name with drink name and then check the counts and add it to ingredients for each
    let seenDrinksIndex = 0; //index where seenDrinks
    for(let i = 0; i < seenDrinks.length; i++){
      if(currDrinkName == seenDrinks[i]){
        seenDrinksIndex = i;
      }
    }
    const drinkCounts = drinksCount[seenDrinksIndex] //count of how many current drink were ordered
    for(let drinkIngredientIndex = 1; drinkIngredientIndex < drinkNameIngredients[drinkNameIngredientsI].length; drinkIngredientIndex++){
      // console.log(drinkNameIngredients[drinkNameIngredientsI][drinkIngredientIndex]);
      const currentIngredient = drinkNameIngredients[drinkNameIngredientsI][drinkIngredientIndex];
      for(let i = 0; i < ingredientsCounting.length; i++){
        if(ingredientsCounting[i][0].toUpperCase() == currentIngredient.toUpperCase()){ //if name matches add drink count of the ingredient
          ingredientsCounting[i][1]+=drinkCounts;
        }
      }
    }
  }
  // console.log(drinksCount[0] + seenDrinks[0]); - drinks ordered in form of count + 
  let ingredientInfo = []; //return array that is built should be name with amount sold over the period
  for(let i = 0; i < ingredientsCounting.length; i++){
    if(ingredientsCounting[i][1] < 0.1 * ingredientsCurr[i][1]){
      ingredientInfo.push(ingredientsCounting[i]);
    }  
  } 
  let returnIngredients = [];
  for(let i = 0; i < ingredientInfo.length; i++){ //create json of chips to send as response
    var individualIngredient = {
      "Name" : ingredientInfo[i][0],
      "Amount" : ingredientInfo[i][1],
    };
    returnIngredients.push(individualIngredient);
  }

  //chip information
  let chipsList = ''; //get names from database to check if item exists
  const chipsQuery = 'select name, quantity from snacks order by id;';
  try{ //get names from database for error checking
    chipsList = await pool.query({
      rowMode: 'array',
      text: chipsQuery,
    })
  } catch (error){
    res.status(500).json("Error in querying drinks table");
    console.log(error);
    return;
  }
  const chipsCurr = chipsList.rows;
  let chipsIndex = Math.max(chipsCurr.length, chipsCount.length);
  let chipInfo = [];
  for(let i = 0; i < chipsIndex; i++){
    if(chipsCount[i] < chipsCurr[i][1]){
      chipInfo.push(chipsCurr[i]);
    }
  }
  let returnChips = [];
  for(let i = 0; i < chipInfo.length;i++){
    var individualChip = {
      "Name" : chipInfo[i][0],
      "Amount" : chipInfo[i][1],
    };
    returnChips.push(individualChip);
  }
  const returnItems = returnIngredients.concat(returnChips); 
  // var ingredientsAndChips = returnIngredients.concat(reuturnChips);
  res.status(200).json(JSON.parse(JSON.stringify(returnItems)));
});
/**
 * @swagger
 * /complete/{orderid}:
 *   delete:
 *     summary: Deletes an order from the order_queue table in the database.
 *     tags: [Deleting]
 *     parameters:
 *       - in: path
 *         name: orderid
 *         required: true
 *         description: The ID of the order to be deleted.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The order was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: There was an error in the database query.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.delete('/complete/:orderid', async (req, res) => {
  let orderId = req.params['orderid'];
  const deleteQuery = 'delete from order_queue where id = ' + orderId + ';';
  pool.query((deleteQuery), (error, results) => {
    if (error) {
      res.status(400).json("error in database query");
      console.log(error);
      return;
    }
    res.status(200).json("Successfully deleted order number " + orderId + " from order_queue");
    return;
  })

});

/**
 * @swagger
 * /x-report:
 *   get:
 *     summary: Get the report of all transactions made today
 *     description: Returns a report of all transactions made today, along with the total sales of the day.
 *     tags: [Reports]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A JSON object containing an array of transactions and the total sales of the day.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   description: An array of transactions made today
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         description: The date of the transaction (formatted as "MM/DD/YYYY")
 *                       time:
 *                         type: string
 *                         description: The time of the transaction (formatted as "HH:MI")
 *                       id:
 *                         type: integer
 *                         description: The ID of the transaction
 *                       drink:
 *                         type: string
 *                         description: The name of the drink ordered in the transaction
 *                       drinksize:
 *                         type: string
 *                         description: The size of the drink ordered in the transaction
 *                       extra:
 *                         type: string
 *                         description: Any extras added to the drink ordered in the transaction
 *                       chips:
 *                         type: string
 *                         description: Whether or not chips were ordered in the transaction
 *                       cost:
 *                         type: number
 *                         description: The cost of the transaction
 *                 total_sales:
 *                   type: number
 *                   description: The total sales made today
 *       500:
 *         description: An error occurred while processing the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error that occurred
 */
app.get('/x-report', async (req, res) => {
  try {
    const query = `
      SELECT to_char(date, 'MM/DD/YYYY') as date, 
             to_char(time, 'HH:MI') as time, 
             id, drink, drinksize, extra, chips, cost
      FROM order_history
      WHERE date = NOW()::date
    `;
    const { rows } = await pool.query(query);

    const total_sales = rows.reduce((acc, row) => acc + row.cost, 0);

    res.json({ transactions: rows, total_sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /z-report:
 *   get:
 *     summary: Get the z-report
 *     description: Get the z-report, which is a sales report for each day.
 *     tags: [Reports]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of objects representing the sales report for each day in the specified date range.
 *         schema:
 *           type: object
 *           properties:
 *             sales_report:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     description: The date for which the z-report is generated, in YYYY-MM-DD format.
 *                   total_sales:
 *                     type: number
 *                     description: The total sales for the specified date, in USD.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: The error message.
 */

app.get('/z-report', async (req, res) => {
  try {
    const startDate = new Date('January 1, 2023');
    const currentDate = new Date();

    const dates = [];
    while (startDate <= currentDate) {
      const dateString = startDate.toISOString().slice(0, 10);
      dates.push(dateString);
      startDate.setDate(startDate.getDate() + 1);
    }

    const query = `
      SELECT date_trunc('day', date) AS date, SUM(cost) as total_sales
      FROM order_history
      WHERE date >= $1 AND date <= $2
      GROUP BY date
    `;
    const promises = dates.map((date) =>
      pool.query(query, [date, date])
    );
    const results = await Promise.all(promises);

    const salesByDate = new Map();
    results.forEach((result) => {
      result.rows.forEach((row) => {
        salesByDate.set(row.date.toISOString().slice(0, 10), row.total_sales);
      });
    });

    const salesReport = dates.map((date) => ({
      date,
      total_sales: salesByDate.get(date) || 0,
    }));

    res.json({ sales_report: salesReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



