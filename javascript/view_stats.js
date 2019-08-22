// "AT A GLANCE" TABLE

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
buildAtAGlanceTable();

//
// "LEAST" / "MOST" TABLES

function buildTable(tableID, usedList, numberDisplayed, pctDisplayed) {
    let tableBody = document.getElementById(tableID);
    for (let i = 0; i < usedList.length; i++) {
        let row = document.createElement("tr");
        let fullNameCell = document.createElement("td");
        let numberCell = document.createElement("td");
        let pctCell = document.createElement("td");
        let congresspersonLink = document.createElement("a");

        congresspersonLink.href = usedList[i].url;
        congresspersonLink.target = "_blank";
        congresspersonLink.innerHTML = usedList[i].last_name + " " + usedList[i].first_name;
        if (usedList[i].middle_name !== null) {
            congresspersonLink.innerHTML += " " + usedList[i].middle_name;
        }
        numberCell.innerHTML = usedList[i][numberDisplayed];
        pctCell.innerHTML = usedList[i][pctDisplayed].toFixed(2) + " %";

        fullNameCell.append(congresspersonLink);
        row.append(fullNameCell, numberCell, pctCell);
        tableBody.append(row);

    }
}
