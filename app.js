import express from "express";
import customEnv from "custom-env";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import userRegister from "./routes/userRegister.js";
import userLogin from "./routes/userLogin.js";
import user from "./routes/user.js";
import details from "./routes/details.js";
import password from "./routes/password.js";
import searchResults from "./routes/searchResults.js";
import email from "./routes/email.js";
import reset from "./routes/resetPass.js";
import itemDetails from "./routes/itemDetails.js";
import storeRoutes from "./routes/addresses.js";

import popularSearches from "./services/popularSearches.js";
import popularSearchesWS from "./WebScraping/popularSearchesWS.js";
import { scheduleNightlyScraper } from "./WebScraping/nightScrap.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

customEnv.env(process.env.NODE_ENV, "./config");
console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
console.log("PORT:", process.env.PORT);

app.use(cors());

app.use("/api", userRegister);
app.use("/api", userLogin);
app.use("/api", user);
app.use("/api", details);
app.use("/api", password);
app.use("/api", searchResults);
app.use("/api", email);
app.use("/api", reset);
app.use("/api", itemDetails);
app.use("/api", storeRoutes);

app.use(express.static("public"));

const client = new MongoClient("mongodb://127.0.0.1:27017");
try {
  // Connect to the MongoDB server
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}

// Call the createPopularSearches function after the database connection is established
popularSearches
  .createPopularSearches()
  .then(() => {})
  .catch((err) => {
    console.error("Error initializing popular searches", err);
  });

popularSearchesWS.savePopularSearches();

// Schedule the nightly scraper
scheduleNightlyScraper();

const server = http.createServer(app);
server.listen(process.env.PORT);
