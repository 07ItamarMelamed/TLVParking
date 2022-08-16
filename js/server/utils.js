const Joi = require("joi");
const fs = require("fs");
const shortid = require("shortid");
const {PATH_PARKINGS} = require('../path');

const getAll = () => {
    return JSON.parse(fs.readFileSync(PATH_PARKINGS, "utf8"));
};

const getById = (id) => {
  return getAll().find((parking) => parking.id === id);
};

const deleteById = (id, res) => {
  const p = getById(id);
  if (!p) {
    return res.status(404).send("The parking with the given ID was not found.");
  }

  const updatedParkings = getAll().filter((parking) => parking.id !== id);
  if (updatedParkings.length === getAll().length) {
    return res.status(404).send("Parking not found. Deletion failed.");
  }
  fs.writeFileSync(PATH_PARKINGS, JSON.stringify(updatedParkings));
  return res.send(`Parking ${id} has been deleted`);
};

const addParkingToList = (p) => {
  const newParking = {
    id: shortid.generate(),
    x_coord: p.x_coord,
    y_coord: p.y_coord,
    address: p.address,
    time: Date.now(),
  };

  console.log(getAll());
  const updatedParkings = getAll().concat(newParking);
  fs.writeFileSync(PATH_PARKINGS, JSON.stringify(updatedParkings));

  return updatedParkings;
};

module.exports = { getAll, getById, deleteById, addParkingToList };
