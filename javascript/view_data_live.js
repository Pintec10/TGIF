console.log("YOU ARE USING **LIVE** DATA! (...or trying to)")
let membersArray = [];

// -----------------
// LIVE DATA FETCH

function fetchRemoteData(url, init) {
    return fetch(url, init).then(function (response) {
        return response.json();
    })
        .catch(function (error) {
            console.log("There was a problem: " + error.message);
        })
}


var initObject = {
    "headers": {
        "X-API-Key": "WS6nqjrzT2mQTDM2UCCv3b3RPJPoIbA5HjDHyu72"
    }
}

//Here we make the AJAX call
fetchRemoteData("https://api.propublica.org/congress/v1/113/" + chamber + "/members.json", initObject).then(function (json) {
    var dataLive = json;
    membersArray = dataLive.results[0].members;
    buildTable(membersArray);
    buildDropdown(membersArray);
});
// -----------------


// -----------------
//TABLE BUILDER
function buildTable(arr) {
    let tableBody = document.getElementById("data-table");
    tableBody.innerHTML = "";
    for (i = 0; i < arr.length; i++) {

        let row = document.createElement("tr");
        let fullNameCell = document.createElement("td");
        let partyCell = document.createElement("td");
        let stateCell = document.createElement("td");
        let seniorityCell = document.createElement("td");
        let votesCell = document.createElement("td");
        // 
        if (arr[i].url !== "") {
            var congresspersonLink = document.createElement("a");
            congresspersonLink.href = arr[i].url;
            congresspersonLink.target = "_blank";
        } else {
            var congresspersonLink = document.createElement("span");
        }

        congresspersonLink.innerHTML = arr[i].last_name + " " + arr[i].first_name;
        if (arr[i].middle_name !== null) {
            congresspersonLink.innerHTML += " " + arr[i].middle_name;
        }
        // 
        partyCell.innerHTML = arr[i].party;
        stateCell.innerHTML = arr[i].state;
        seniorityCell.innerHTML = arr[i].seniority;
        votesCell.innerHTML = arr[i].votes_with_party_pct + "%";
        //
        fullNameCell.append(congresspersonLink);
        row.append(fullNameCell, partyCell, stateCell, seniorityCell, votesCell);
        tableBody.append(row);
    }
}
// -----------------


// -----------------
// BUILD DROPDOWN MENU
function buildDropdown(arr) {
    let statesArray = [];

    // build array with states
    for (let i = 0; i < arr.length; i++) {
        if (statesArray.includes(arr[i].state)) { } else {
            statesArray.push(arr[i].state);
        }
    }
    statesArray.sort();

    // build menu from that array
    let dropdownMenu = document.getElementById("state-dropdown");
    for (let i in statesArray) {
        let stateOption = document.createElement("option");
        stateOption.innerHTML = statesArray[i];
        dropdownMenu.append(stateOption);
    }
}
// -----------------

// -----------------
// FILTERS
let selectedParties = [];
let selectedStates = "all";
let inputElements = document.getElementsByTagName("input");

document.getElementById("cb-democrat").addEventListener("click", changeSelectedParties);
document.getElementById("cb-republican").addEventListener("click", changeSelectedParties);
document.getElementById("cb-independent").addEventListener("click", changeSelectedParties);
document.getElementById("state-dropdown").addEventListener("change", changeSelectedStates);

// updates selected Parties
function changeSelectedParties() {
    if (event.target.checked) {
        selectedParties.push(event.target.value);
    } else {
        selectedParties.splice(selectedParties.indexOf(event.target.value), 1);
    }
    filterData();
}

//updates selected State
function changeSelectedStates() {
    selectedStates = event.target.value;
    filterData();
}

//builds the data array to use for table construction
function filterData() {
    let displayedArray = membersArray;
    if (selectedParties.length !== 0) {
        displayedArray = displayedArray.filter(x => selectedParties.includes(x.party));
    }
    if (selectedStates !== "all") {
        displayedArray = displayedArray.filter(x => x.state === selectedStates);
    }
    buildTable(displayedArray);
}
// -----------------
