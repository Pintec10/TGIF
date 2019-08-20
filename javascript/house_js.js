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
        //ADDING
        let congresspersonLink = document.createElement("a");
        congresspersonLink.href = arr[i].url;
        congresspersonLink.target = "_blank";
        congresspersonLink.innerHTML = arr[i].last_name + " " + arr[i].first_name;
        if (arr[i].middle_name !== null) {
            congresspersonLink.innerHTML += " " + arr[i].middle_name;
        }
        //END ADDING
        partyCell.innerHTML = arr[i].party;
        stateCell.innerHTML = arr[i].state;
        seniorityCell.innerHTML = arr[i].seniority;
        votesCell.innerHTML = arr[i].votes_with_party_pct + "%";
        fullNameCell.append(congresspersonLink); //ADDED
        row.append(fullNameCell, partyCell, stateCell, seniorityCell, votesCell);
        tableBody.append(row);
    }
}

buildTable(membersArray);