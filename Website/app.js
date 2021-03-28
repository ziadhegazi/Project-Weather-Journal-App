//baseURL
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
//API Key
const apiKey = "&APPID=dd729811ce6821424a00b8b1c99e5884&units=metric";

//Global variables
const frag = document.createDocumentFragment();
//dynamic date
let date = new Date();
let newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

//Detecting button pressed
document.querySelector("#generate").addEventListener("click", performAction);

function performAction(e) {
    //Zipcode user entered
    const zipcode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;
    console.log(newDate);
    getData(baseURL, zipcode, apiKey)
    .then(function(data) {
        postData("/addData", {
            temp: data.main.temp, 
            date: newDate,
            feelings: feelings})
        .then(function() {
            updateUI();
        })
    })
}


//async GET API data
const getData = async (url, zipcode, key) => {
    //call API
    const countryCode = document.querySelector("#countryCode").value;
    const res = await fetch(`${url}${zipcode},${countryCode}${key}`)
    console.log(res);

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
        const entryHolder = document.querySelector("#entry-holder");
        allEntries = [];
        
            const newDiv = document.createElement("div");
            const newDate = document.querySelector("#date");
            const newTemp = document.querySelector("#temp");
            const newFeeling = document.querySelector("#content");

            newDate.innerHTML = (`Date: ${allData.date}`);
            newTemp.innerHTML = (`Temperature: ${allData.temp}`);
            newFeeling.innerHTML = (`Feelings: ${allData.feelings}`);
        
        return allData;
        }
    catch(error) {
        console.log("Error", error);
    }
}

function removeChildren(parent) {
    while(parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}