const db = require("../models");
const Car = db.cars;

exports.create = (req, res) => {
    if (!req.body.make) {
        res.status(400).send({ message: "Body content is empty" });
        return;
    }

    const car = new Car({
        no: req.body.no,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        status: 'Live'
    });

    car.save(car)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error While adding new Car."
            });
        });
};

exports.findAll = (req, res) => {
    Car.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Cars."
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Empty data body"
        });
    }

    const id = req.params.id;
    Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Failed to update car info."
                });
            } else res.send({ message: "Car was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while updating car"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Car.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Failed to delete car info."
                });
            } else {
                res.send({
                    message: "Car was deleted successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while deleting car"
            });
        });
};

exports.deleteAll = (req, res) => {
    Car.deleteMany({})
        .then(data => {
            res.send({
                message: "Cars were deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while deleting all Cars."
            });
        });
};