'use strict';
const mongoose = require('mongoose');
const Orders = require('./models/models');

// Connecting to the mongodb
function dataBaseConnection(){
  const url = "mongodb+srv://Swapneeth:7AOQMXuHZi3kmoNz@shoppingcart.0jipmja.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(url);
  return mongoose.connection;
}

// posting data to the server
module.exports.postData = async(event)=>{
  // connecting to the database
  await dataBaseConnection();
  const data = JSON.parse(event.body);
  const ordering = new Orders({
    Items: data.Items
  });

  const ordered = await ordering.save();
  return{
    statusCode: 200,
    body: JSON.stringify(ordered),
  }
}

module.exports.getData = async (event) => {
  await dataBaseConnection() 
  const Items = await Orders.find();
  return {
    statusCode: 200,
    body: JSON.stringify(Items),  
  };

};
