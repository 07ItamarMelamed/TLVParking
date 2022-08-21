const express = require("express");
const cors = require('cors');
const shortid = require("shortid");
const { updateParking, getParkings, getParkingById, insertParking, deleteParkingById } = require("./utils");
const { connectClient } = require("./data/database");
const PORT = 3000;

const app = express();
app.use(express.json());

app.use(cors());

//Endpoints

app.get("/api/parking/:id", async (req, res) => {
  const parkingId = req.params.id;
  await getParkingById(parkingId)
  .then((requestedParking) => {
    if (requestedParking == []) {
      res.status(404).send(`parking ${parkingId} not found`);
    } else {
      res.send(requestedParking);
    }
  });
});

app.get("/api/parkings", async (req, res) => {
  await getParkings()
  .then((parkings) => {
    if (parkings == []) {
      res.status(404).send(`Parkings do not exist`);
    } else {
      res.send(parkings);
    }
  });
});

//  Create
app.post("/api/parking", async (req, res) => {
  const newParking = {
    id: shortid.generate(),
    x_coord: req.body.x_coord,
    y_coord: req.body.y_coord,
    address:req.body.address,
    time: Date.now()
  };
  
  insertParking(newParking);
  res.send(newParking);
});

app.put("/api/parking", async (req, res) => {
  updateParking(req.body);
  res.send(req.body);
});



//Delete
app.delete("/api/parking/:id", async (req, res) => {
  const parkingId = req.params.id;
  deleteParkingById(parkingId);
  res.send(`Parking ${parkingId} has been deleted`);
});

app.listen(PORT, function (err) {
  if (err) {
    console.log("Error in server setup");
  }
  console.log("Server listening on Port", PORT);
  connectClient();
});