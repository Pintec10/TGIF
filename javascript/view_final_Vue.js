console.log("YOU ARE USING **LIVE** DATA! (...or trying to)")
//let membersArray = [];

var app = new Vue({
    el: "#app",
    data: {
        membersArray: [],
        url: "https://api.propublica.org/congress/v1/113/" + chamber + "/members.json",
        initObject: {
            method: "GET",
            headers: {
                "X-API-Key": "WS6nqjrzT2mQTDM2UCCv3b3RPJPoIbA5HjDHyu72"
            }
        },
        loaded: false,
        statesArray: [],
        selectedParties: [],
        selectedState: "all"
    },

    methods: {
        fetchRemoteData() {
            return fetch(this.url, this.initObject).then(function (response) { // .****WHY NOT app.url????
                return response.json()
            }).then(function (json) {
                app.membersArray = json.results[0].members;
                //adding the "votes_with_party" numerical element (not present in initial data)
                for (let n in app.membersArray) {
                    app.membersArray[n].votes_with_party = Math.round(app.membersArray[n].total_votes * app.membersArray[n].votes_with_party_pct / 100);
                }
                app.buildDropdown();
                app.loaded = true;
            }).catch(function (error) {
                alert("There was a problem in retrieving data. Error message: " + error.message);
                console.log("There was a problem: " + error.message);
            })
        },

        buildDropdown() {
            // builds array with states
            for (let i = 0; i < this.membersArray.length; i++) {
                if (this.statesArray.includes(this.membersArray[i].state)) { } else {
                    this.statesArray.push(this.membersArray[i].state);
                }
            }
            this.statesArray.sort();
        }
    },

    computed: {
        filterData() {
            return this.membersArray.filter(x => (app.selectedParties.includes(x.party) || app.selectedParties.length === 0) && (app.selectedState.includes(x.state) || app.selectedState === "all"));
        }
    },

    created() {
        this.fetchRemoteData();
    }
})


// -----------------
//TABLE BUILDERS
/*
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

    if (usedDataArr.length === 0) {
        let row = document.createElement("tr");
        let resultCell = document.createElement("td");
        resultCell.colSpan = "5";
        resultCell.className = "text-danger";
        resultCell.innerHTML = "There are no delegates corresponding to the selected filters";
        row.append(resultCell);
        tableBody.append(row);
    }
}
*/
/*
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
*/
// -----------------


// -----------------
// BUILD DROPDOWN MENU
/*
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
*/

// -----------------
// FILTERS
/*
let selectedParties = [];
let selectedStates = "all";

document.getElementById("cb-democrat").addEventListener("click", changeSelectedParties);
document.getElementById("cb-republican").addEventListener("click", changeSelectedParties);
document.getElementById("cb-independent").addEventListener("click", changeSelectedParties);
document.getElementById("state-dropdown").addEventListener("change", changeSelectedStates);
*/



// updates selected Parties
function changeSelectedParties() {
    if (event.target.checked) {
        selectedParties.push(event.target.value);
    } else {
        selectedParties.splice(selectedParties.indexOf(event.target.value), 1);
    }
    filterData();
}

/*
//updates selected State
function changeSelectedStates() {
    selectedStates = event.target.value;
    filterData();
}
*/

//builds the data array to use for table construction
function filterData() {
    app.displayedArray = app.membersArray;
    if (selectedParties.length !== 0) {
        app.displayedArray = app.displayedArray.filter(x => selectedParties.includes(x.party));
    }
    if (selectedStates !== "all") {
        app.displayedArray = app.displayedArray.filter(x => x.state === selectedStates);
    }
    //buildMembersTable("data-table", displayedArray);
}
// -----------------


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
// -----------------