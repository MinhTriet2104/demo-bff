// API
const API_URL = "https://5fc3196b9210060016869e9e.mockapi.io/";

// Declare variable
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors"); // cors

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

// Routes
app.get("/user/:id", async (req, res) => {
  // get id from params
  const id = req.params.id;

  try {
    // req get user info
    const resUser = axios.get(API_URL + "users/" + id);
    // req get messages 
    const resMess = axios.get(API_URL + "messages");
    // req get user 
    const resUserSetting = axios.get(API_URL + "usersetting/" + id);
  
    // request all
    const userData = await axios.all([resUser, resMess, resUserSetting]);
  
    // parse data
    const userInfo = {
      user: userData[0].data,
      messages: userData[1].data,
      userSetting: userData[2].data,
    }
  
    res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
});

// Not found route
app.get("*", (req, res) => res.status(404).send("404 Not Found"));

// Running
const port = 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
