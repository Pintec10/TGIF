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
        fullNameCell.innerHTML = arr[i].last_name + " " + arr[i].first_name;
        if (arr[i].middle_name !== null) {
            fullNameCell.innerHTML += " " + arr[i].middle_name;
        }
        partyCell.innerHTML = arr[i].party;
        stateCell.innerHTML = arr[i].state;
        seniorityCell.innerHTML = arr[i].seniority;
        votesCell.innerHTML = arr[i].votes_with_party_pct + "%";
        row.append(fullNameCell, partyCell, stateCell, seniorityCell, votesCell);
        tableBody.append(row);
    }
}

buildTable(membersArray);