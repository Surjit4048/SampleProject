module.exports = app => {
    const cars = require("../controllers/car.controller.js");
    let router = require("express").Router();

    // Retrieve all cars
    router.get("/", cars.findAll);

    // Create a new cars
    router.post("/", cars.create);

    // Update a cars
    router.put("/:id", cars.update);

    // Delete a cars with Id
    router.delete("/:id", cars.delete);

    // Delete all
    router.delete("/", cars.deleteAll);

    app.use('/api/cars', router);
};