const expect = require("chai").expect;
const request = require("supertest");
const app = require("../server.js");
const mongoose = require('mongoose');
const db = require("../models");


describe("Node Server Test", () => {
    before(async () => {
        await db.cars.deleteMany({});
    });

    after(async () => {
        await mongoose.disconnect();
    });

    it("should connect and disconnect db", async () => {
        await mongoose.connect(db.url, db.params);

        mongoose.connection.on('connected', () => {
            expect(mongoose.connection.readyState).to.equal(1);
        });
        mongoose.connection.on('error', () => {
            expect(mongoose.connection.readyState).to.equal(99);
        });

        await mongoose.disconnect();
        mongoose.connection.on('disconnected', () => {
            expect(mongoose.connection.readyState).to.equal(1);
        });
    });
});

describe("Test GET(/api/cars/)", () => {
    before(async () => {
        await mongoose.connect(db.url, db.params);
        await db.cars.deleteMany({});
    });
    it("should return all cars", async () => {
        const cars = [
            {no: 1, make: "Honda", model: "Pilot", year: 2020, price: "$23000",},
            {no: 2, make: "Honda", model: "Accord", year: 2020, price: "$25000",},
            {no: 3, make: "Honda", model: "Civic", year: 2020, price: "$26000",},
            {no: 4, make: "Audi", model: "Q7", year: 2020, price: "$27000",},
        ];
        await db.cars.insertMany(cars);
        const res = await request(app).get("/api/cars/");
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(4);
    });
});

describe("Test POST(/api/cars/)", () => {
    before(async () => {
        await mongoose.connect(db.url, db.params);
        await db.cars.deleteMany({});
    });
    it("should create new car in collection", async () => {
        const res = await request(app)
            .post("/api/cars/")
            .send({
                no: 1,
                make: "Honda",
                model: "Pilot",
                year: 2020,
                price: "$23000",
            });

        const data = res.body;
        expect(res.status).to.equal(200);
        expect(data).to.have.property("no", 1);
        expect(data).to.have.property("make", "Honda");
        expect(data).to.have.property("model", "Pilot");
        expect(data).to.have.property("year", 2020);
        expect(data).to.have.property("price", "$23000");
        expect(data).to.have.property("status", "Live");

        const car = await db.cars.findOne({no: 1});
        expect(car.make).to.equal('Honda');
        expect(car.model).to.equal('Pilot');
    });
});

describe("Test PUT(/api/cars/:id)", () => {
    before(async () => {
        await mongoose.connect(db.url, db.params);
        await db.cars.deleteMany({});
    });
    it("should update already existed car", async () => {
        const testCar = new db.cars( {no: 1, make: "Honda", model: "Pilot", year: 2020, price: "$23000",});
        await testCar.save();

        const res = await request(app)
            .put("/api/cars/" + testCar._id)
            .send({make: "Honda2", model: "Pilot2", year: 2022, price: "$230002",});

        const car = await db.cars.findOne({no: 1});
        expect(car.make).to.equal("Honda2");
        expect(car.model).to.equal("Pilot2");
        expect(car.year).to.equal(2022);
        expect(car.price).to.equal("$230002");

    });
});


describe("Test DELETE with id (/api/cars/:id)", () => {
    before(async () => {
        await mongoose.connect(db.url, db.params);
        await db.cars.deleteMany({});
    });
    it("should delete a car and return 200", async () => {
        const testCar = new db.cars( {no: 1, make: "Honda", model: "Pilot", year: 2020, price: "$23000",});
        await testCar.save();

        const res = await request(app)
            .delete("/api/cars/" + testCar._id)
            .send();

        expect(res.status).to.equal(200);
    });
});

describe("Test DELETE All (/api/cars/)", () => {
    before(async () => {
        await mongoose.connect(db.url, db.params);
        await db.cars.deleteMany({});
    });
    it("should delete a car and return 200", async () => {
        const cars = [
            {no: 1, make: "Honda", model: "Pilot", year: 2020, price: "$23000",},
            {no: 2, make: "Honda", model: "Accord", year: 2020, price: "$25000",},
            {no: 3, make: "Honda", model: "Civic", year: 2020, price: "$26000",},
            {no: 4, make: "Audi", model: "Q7", year: 2020, price: "$27000",},
        ];
        await db.cars.insertMany(cars);
        const res = await request(app).delete("/api/cars/");
        expect(res.status).to.equal(200);

        db.cars.find({}).then(cars => {
            expect(cars.body.length).to.equal(0);
        });
    });
});