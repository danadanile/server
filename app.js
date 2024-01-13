import {
  scrapeWebsite,
  scrapeMultipleWebsites,
} from "./WebScraping/LongShirts/scrapeShirt.js";

import express from 'express'
import customEnv from 'custom-env'
import http from 'http';

const app = express();

customEnv.env(process.env.NODE_ENV, './config')
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING)
console.log('PORT:', process.env.PORT)

app.use(express.static('public'))

import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");
try {
  // Connect to the MongoDB server
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}
const server = http.createServer(app);

// Example usage
const websitesToScrape = [
  {
    url: "https://www.castro.com/women/categories/tops_/_bodysuits/long_shirts",
    config: {
      //   productSelector: ".product-class",
      nameSelector: "#product_category_157204",
      //   priceSelector: ".price-class",
    },
  },
  //   {
  //     url: "https://website2.com",
  //     config: {
  //       productSelector: ".item-class",
  //       nameSelector: ".title-class",
  //       priceSelector: ".cost-class",
  //     },
  //   },
];

scrapeMultipleWebsites(websitesToScrape);
