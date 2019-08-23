let tableBody = document.getElementById("data-table");
let membersArray = data.results[0].members;

function buildTable(arr) {
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

buildTable(membersArray);


//
// FILTERS
let inputElements = document.getElementsByTagName("input");
for (let j = 0; j < inputElements.length; j++) {
    inputElements[j].onchange = filterData;
}

function filterData() {
    let displayedArray = membersArray;
    if (document.getElementById("cb-democrat").checked || document.getElementById("cb-republican").checked || document.getElementById("cb-independent").checked) {
        if (document.getElementById("cb-democrat").checked === false) {
            displayedArray = displayedArray.filter(x => x.party != "D");
        }
        if (document.getElementById("cb-republican").checked === false) {
            displayedArray = displayedArray.filter(x => x.party != "R");
        }
        if (document.getElementById("cb-independent").checked === false) {
            displayedArray = displayedArray.filter(x => x.party != "I");
        }
    }
    tableBody.innerHTML = "";
    buildTable(displayedArray);
}







