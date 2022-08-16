const Joi = require('joi');
const fs = require('fs');
const PATH_PARKINGS = require('/js/path.js');

const validateParking = (p) => {
    const schema = {
        x_coord: Joi.number().required(),
        y_coord: Joi.number().required(),
        address: Joi.string().required()
    };

    return Joi.validate(p, schema);
};

const getAll = () => {
    const parkings = fs.readFileSync(PATH_PARKINGS);
    return parkings;
}

const getById = (id) => {
    return getAll().find((parking) => parking.ID === id);
}

const deleteById = (id) => {
    const p = getById(id);
    if (!p) {
        return res.status(404).send('The parking with the given ID was not found.');
    }
    
    const index = getAll().indexOf(p);
    getAll().forEach((parkingFromList) => {
        if (getAll().indexOf(parkingFromList) > index) {
            parkingFromList.ID--;
        }
    })
    getAll().splice(index, 1);

    return p;
}

const addParking = (p) => {
    const { error } = validateParking(p);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const current = new Date();

    const newParking = {
        ID: getAll().length + 1,
        x_coord: p.x_coord,
        y_coord: p.y_coord,
        address: p.address,
        time: current.toLocaleTimeString()
    };

    const updatedParkings = getAll().push(newParking);
    fs.writeFileSync(PATH_PARKINGS, updatedParkings);

    return newParking;
}

module.exports = {getAll, getById, deleteById, addParking};