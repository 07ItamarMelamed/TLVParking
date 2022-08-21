const {queryUpdate, queryGet, queryInsert, queryGetById, queryDeleteById} = require('./data/queries');

function updateParking(p) {
  console.log("update parking");
  queryUpdate(p);
}

function getParkings() {
  console.log("get parkings");
  return queryGet();
}

function insertParking(p) {
  console.log("insert parking");
  queryInsert(p);
}

function getParkingById(id) {
  console.log("get parking by id");
  return queryGetById(id);
}

function deleteParkingById(id) {
  console.log("delete parking by id");
  queryDeleteById(id);
}

module.exports = {
  updateParking,
  getParkings,
  getParkingById,
  insertParking,
  deleteParkingById,
};
