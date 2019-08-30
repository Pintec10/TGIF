console.log("YOU ARE USING **LIVE** DATA! (...or trying to)")
let membersArray = [];

// -----------------
// LIVE DATA FETCH
var initObject = {
    "headers": {
        "X-API-Key": "WS6nqjrzT2mQTDM2UCCv3b3RPJPoIbA5HjDHyu72"
    }
}

function fetchRemoteData(chamber) { //EXPERIMENTAL
    url = "https://api.propublica.org/congress/v1/113/" + chamber + "/members.json";
    return fetch(url, initObject).then(function (response) {
        return response.json()
    }).then(function (json) {
        membersArray = json.results[0].members;
        //adding the "votes_with_party" numerical element (not present in initial data)
        for (let n in membersArray) {
            membersArray[n].votes_with_party = Math.round(membersArray[n].total_votes * membersArray[n].votes_with_party_pct / 100);
        }
    }).catch(function (error) {
        alert("There was a problem in retrieving data. Error message: " + error.message);
        console.log("There was a problem: " + error.message);
    })
};

/*
function fetchRemoteData(chamber) { //THIS VERSION WORKS
    url = "https://api.propublica.org/congress/v1/113/" + chamber + "/members.json";

    return fetch(url, initObject).then(function (response) {
        return response.json();
    })
        .catch(function (error) {
            console.log("There was a problem: " + error.message);
        })
}
*/





// -----------------
//TABLE BUILDERS
function buildMembersTable(tableID, usedDataArr) {
    let tableBody = document.getElementById(tableID);
    tableBody.innerHTML = "";
    for (i = 0; i < usedDataArr.length; i++) {

        let row = document.createElement("tr");
        let fullNameCell = document.createElement("td");
        let partyCell = document.createElement("td");
        let stateCell = document.createElement("td");
        let seniorityCell = document.createElement("td");
        let votesCell = document.createElement("td");
        // 
        if (usedDataArr[i].url !== "") {
            var congresspersonLink = document.createElement("a");
            congresspersonLink.href = usedDataArr[i].url;
            congresspersonLink.target = "_blank";
        } else {
            var congresspersonLink = document.createElement("span");
        }

        congresspersonLink.innerHTML = usedDataArr[i].last_name + " " + usedDataArr[i].first_name;
        if (usedDataArr[i].middle_name !== null) {
            congresspersonLink.innerHTML += " " + usedDataArr[i].middle_name;
        }
        // 
        partyCell.innerHTML = usedDataArr[i].party;
        stateCell.innerHTML = usedDataArr[i].state;
        seniorityCell.innerHTML = usedDataArr[i].seniority;
        votesCell.innerHTML = usedDataArr[i].votes_with_party_pct + "%";
        //
        fullNameCell.append(congresspersonLink);
        row.append(fullNameCell, partyCell, stateCell, seniorityCell, votesCell);
        tableBody.append(row);
    }
}


function buildStatsTable(tableID, usedDataArr, numberDisplayed, pctDisplayed) {
    let tableBody = document.getElementById(tableID);
    for (let i = 0; i < usedDataArr.length; i++) {
        let row = document.createElement("tr");
        let fullNameCell = document.createElement("td");
        let numberCell = document.createElement("td");
        let pctCell = document.createElement("td");
        if (usedDataArr[i].url !== "") {
            var congresspersonLink = document.createElement("a");
            congresspersonLink.href = usedDataArr[i].url;
            congresspersonLink.target = "_blank";
        } else {
            var congresspersonLink = document.createElement("span");
        }

        congresspersonLink.innerHTML = usedDataArr[i].last_name + " " + usedDataArr[i].first_name;
        if (usedDataArr[i].middle_name !== null) {
            congresspersonLink.innerHTML += " " + usedDataArr[i].middle_name;
        }
        numberCell.innerHTML = usedDataArr[i][numberDisplayed];
        pctCell.innerHTML = usedDataArr[i][pctDisplayed].toFixed(2) + " %";

        fullNameCell.append(congresspersonLink);
        row.append(fullNameCell, numberCell, pctCell);
        tableBody.append(row);

    }
}

function buildAtAGlanceTable() {
    document.getElementById("Rep-members").innerHTML = statistics.membersRep;
    document.getElementById("Dem-members").innerHTML = statistics.membersDem;
    document.getElementById("Ind-members").innerHTML = statistics.membersInd;
    document.getElementById("Total-members").innerHTML = statistics.membersTotal;
    document.getElementById("Rep-avg-VWP").innerHTML = statistics.avgVWPRep;
    document.getElementById("Dem-avg-VWP").innerHTML = statistics.avgVWPDem;
    document.getElementById("Ind-avg-VWP").innerHTML = statistics.avgVWPInd;
    document.getElementById("Total-avg-VWP").innerHTML = statistics.avgVWPTotal;
}
// -----------------


// -----------------
// BUILD DROPDOWN MENU
function buildDropdown(usedDataArr) {
    let statesArray = [];

    // build array with states
    for (let i = 0; i < usedDataArr.length; i++) {
        if (statesArray.includes(usedDataArr[i].state)) { } else {
            statesArray.push(usedDataArr[i].state);
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
//let inputElements = document.getElementsByTagName("input");

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
    buildMembersTable("data-table", displayedArray);
}
// -----------------


//DISPLAY/HIDE ELEMENTS BEFORE/AFTER LOADING
function displayControl() {
    let displayChangers = document.getElementsByClassName("display-before-load");
    for (let i = 0; i < displayChangers.length; i++) {
        displayChangers[i].style.display = "none";
    }
    displayChangers = document.getElementsByClassName("display-after-load");
    for (let i = 0; i < displayChangers.length; i++) {
        displayChangers[i].style.display = "table";
    }
}