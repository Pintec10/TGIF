let membersArray = data.results[0].members;

let statistics = {
    membersDem: 0,
    membersRep: 0,
    membersInd: 0,
    membersTotal: 0,
    avgVWPDem: 0,
    avgVWPRep: 0,
    avgVWPInd: 0,
    avgVWPTotal: 0
}

//
// BUILDING SEPARATE LISTS FOR PARTIES AND "AT A GLANCE" TABLE DATA

let listDem = [];
let listRep = [];
let listInd = [];
let avgDem = 0;
let avgRep = 0;
let avgInd = 0;
let avgTotal = 0;

function atAGlanceData(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].party === "D") {
            listDem.push(arr[i]);
            avgDem += arr[i].votes_with_party_pct;
        } else if (arr[i].party === "R") {
            listRep.push(arr[i]);
            avgRep += arr[i].votes_with_party_pct;
        } else if (arr[i].party === "I") {
            listInd.push(arr[i]);
            avgInd += arr[i].votes_with_party_pct;
        }
        avgTotal += arr[i].votes_with_party_pct;
    }
    statistics.membersDem = listDem.length;
    statistics.membersRep = listRep.length;
    statistics.membersInd = listInd.length;
    statistics.membersTotal = listDem.length + listRep.length + listInd.length;
    statistics.avgVWPDem = (avgDem / listDem.length).toFixed(2);
    statistics.avgVWPRep = (avgRep / listRep.length).toFixed(2);
    statistics.avgVWPInd = (avgInd / listInd.length).toFixed(2);
    statistics.avgVWPTotal = (avgTotal / membersArray.length).toFixed(2);
}

atAGlanceData(membersArray);


//
// RESULTS LOGGING TO CONSOLE
console.log("Dems: " + listDem.length + ", Reps: " + listRep.length + ", Inds: " + listInd.length);
let total = listDem.length + listRep.length + listInd.length;
console.log("Total members: " + total);
console.log("statistics object below:");
console.log(statistics);