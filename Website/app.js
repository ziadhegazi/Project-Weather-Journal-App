//baseURL
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
//API Key
const apiKey = "dd729811ce6821424a00b8b1c99e5884";

//Global variables
const frag = document.createDocumentFragment();
//dynamic date
let date = new Date();
let newDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

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
    const res = await fetch(`${url}${zipcode},${countryCode}&APPID=${key}`)
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
        
        for (i = 0; i < allData.length;i++) {
            const divs = document.querySelectorAll("#div");
            const newDiv = document.createElement("div");
            const newDate = document.createElement("p");
            const newTemp = document.createElement("p");
            const newFeeling = document.createElement("p");

            newDiv.setAttribute("id","div");
            newDiv.setAttribute("class","div"+i);
            newDate.setAttribute("id","date"+i);
            newTemp.setAttribute("id","temp"+i);
            newFeeling.setAttribute("id","feelings"+i);

            newDate.innerHTML = allData[i].date;
            newTemp.innerHTML = allData[i].temp;
            newFeeling.innerHTML = allData[i].feelings;

            newDiv.appendChild(newDate);
            newDiv.appendChild(newTemp);
            newDiv.appendChild(newFeeling);
            frag.appendChild(newDiv);

            removeChildren(entryHolder);            
            entryHolder.appendChild(frag);
        }
        
        
        return allData;
        // document.querySelector("#date").innerHTML = allData[0].date;
        // document.querySelector("#temp").innerHTML = allData[0].temp;
        // document.querySelector("#content").innerHTML = allData[0].feelings;
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