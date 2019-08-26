console.log("YOU ARE USING NON-LIVE DATA!")

let membersArray = data.results[0].members;  //UNCOMMENT FOR NON-LIVE 

//
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
        let congresspersonLink = document.createElement("a");
        congresspersonLink.href = arr[i].url;
        congresspersonLink.target = "_blank";
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

buildTable(membersArray); //UNCOMMENT FOR NON-LIVE


//
// FILTERS v2.0
let selectedParties = [];
let selectedStates = "all";

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



//
// BUILD DROPDOWN MENU
function buildDropdown() {
    let statesArray = [];

    // build array with states
    for (let i = 0; i < membersArray.length; i++) {
        if (statesArray.includes(membersArray[i].state)) { } else {
            statesArray.push(membersArray[i].state);
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

buildDropdown(); //UNCOMMENT FOR NON-LIVE







//
// FILTERS v1.0 - worked, but not the best way to do it.
/*
let inputElements = document.getElementsByTagName("input");
for (let j = 0; j < inputElements.length; j++) {
    inputElements[j].onchange = filterData;
}

document.getElementById("state-dropdown").value.onchange = console.log("dropdwn changed");

function filterData() {
    let displayedArray = membersArray;
    if (document.getElementById("cb-democrat").checked || document.getElementById("cb-republican").checked || document.getElementById("cb-independent").checked) {
        if (document.getElementById("cb-democrat").checked === false) {
            displayedArray = displayedArray.filter(x => x.party !== "D");
        }
        if (document.getElementById("cb-republican").checked === false) {
            displayedArray = displayedArray.filter(x => x.party !== "R");
        }
        if (document.getElementById("cb-independent").checked === false) {
            displayedArray = displayedArray.filter(x => x.party !== "I");
        }
    }

    buildTable(displayedArray);
}
*/