const axios = require('axios');

export const GET_CARS = 'getAllCars';

export const updateCars = (cars) => ({
    type: GET_CARS,
    payload: {cars},
});

export function getAllCars(dispatch) {
    axios.get("http://localhost:8080/api/cars/")
        .then(function (response) {
            dispatch(updateCars(response.data))
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function addCar(dispatch, no, make, model, year, price) {
    axios.post("http://localhost:8080/api/cars/",
        {
            no, make, model, year, price
        })
        .then(function (response) {
            getAllCars(dispatch);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function updateCar(dispatch, id, make, model, year, price) {
    axios.put("http://localhost:8080/api/cars/"+id,
        {
            make, model, year, price
        })
        .then(function (response) {
            getAllCars(dispatch);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function setCarSold(dispatch, id) {
    axios.put("http://localhost:8080/api/cars/"+id,
        {
            status: 'Sold'
        })
        .then(function (response) {
            getAllCars(dispatch);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function deleteCar(dispatch, id) {
    axios.delete("http://localhost:8080/api/cars/"+id,)
        .then(function (response) {
            getAllCars(dispatch);
        })
        .catch(function (error) {
            console.log(error);
        })
}


