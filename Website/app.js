const { response } = require("express");

//baseURL
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
//API Key
const apiKey = "dd729811ce6821424a00b8b1c99e5884";

//Global variables
//dynamic date
let date = new Date();
let newDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

//Detecting button pressed
document.querySelector("#generate").addEventListener("click", performAction);

function performAction(event) {
    //Zipcode user entered
    const zipcode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings");
    console.log(newDate);
    getData(baseURL, zipcode, apiKey)
    .then(function(data) {
        postData("/addData", {temp: data.body.temp, date: data.body.date, feelings: data.body,feelings})

        .then(function() {
            updateUI();
        })
    })
}


//async GET API data
const getData = async (url, zipcode, key) => {
    //call API
    const countryCode = document.querySelector("#countryCode").value;
    const res = await fetch(`${url}${zipcode},${countryCode}&appid=${key}`);
    console.log(response);

    try {
        //converting data into json format
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("Error", error);
    }
}

//async POST API
const postData = async (url = "", data= {}) => {
    const response = await fetch(url, {
        method: "post",
        credentials: "same-origin",
        headers: {
            "content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
        console.log("Error", error);
    }
}

//Updating User Interface
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        // adding data to div
        document.querySelector("#date").innerHTML = allData.date;
        document.querySelector("#temp").innerHTML = allData.temp;
        document.querySelector("content").innerHTML = allData.feelings;
    }
    catch(error) {
        console.log("Error", error);
    }
}