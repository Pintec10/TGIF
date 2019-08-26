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
    statistics.avgVWPDem = (avgDem / listDem.length).toFixed(2) + " %";
    statistics.avgVWPRep = (avgRep / listRep.length).toFixed(2) + " %";
    //statistics.avgVWPInd = listInd.length == 0 ? 0 : (avgInd / listInd.length).toFixed(2);
    statistics.avgVWPInd = (avgInd / listInd.length).toFixed(2) + " %";
    statistics.avgVWPTotal = (avgTotal / membersArray.length).toFixed(2) + " %";
    for (key in statistics) {
        statistics[key] === "NaN %" ? statistics[key] = "---" : "";
    }
}

atAGlanceData(membersArray);



//
// RANKING FUNCTION, returns a list of lower x% and a list of the higher y% (x, y: cutoffPct___) elements
// of the given startingList array, based on the values of a selected ranking parameter.
// Example of how to call it in the HTML script:
// ranking(membersArray, "votes_with_party_pct", 20, 10);


let lowerResultArr = [];
let higherResultArr = [];
//adding the "votes_with_party" numerical element (not present in initial data)
for (let n in membersArray) {
    membersArray[n].votes_with_party = Math.round(membersArray[n].total_votes * membersArray[n].votes_with_party_pct / 100);
}

function ranking(startingList, rankingParameter, cutoffPctLower, cutoffPctHigher) {
    let lowerRangeElements = 0;
    let higherRangeElements = 0;
    let cutoffValueLower = 0;
    let cutoffValueHigher = 0;

    //determine cutoff values
    startingList.sort(function (a, b) { return a[rankingParameter] - b[rankingParameter] });
    lowerRangeElements = Math.round(startingList.length * cutoffPctLower / 100);
    higherRangeElements = Math.round(startingList.length * cutoffPctHigher / 100);
    cutoffValueLower = startingList[lowerRangeElements - 1][rankingParameter];
    cutoffValueHigher = startingList[startingList.length - higherRangeElements][rankingParameter];

    //build and order result arrays containing lower/higher elements
    lowerResultArr = startingList.filter(function (x) { return x[rankingParameter] <= cutoffValueLower });
    higherResultArr = startingList.filter(x => x[rankingParameter] >= cutoffValueHigher);
    higherResultArr.sort(function (a, b) { return b[rankingParameter] - a[rankingParameter] });


}

//console.log(membersArray);


// ROLLBACK BACKUP - USE IN CASE OF A SCREW-UP
/*

let lowerResultArr = [];
let higherResultArr = []

function ranking(startingList, rankingParameter, cutoffPctLower, cutoffPctHigher) {
    let orderedValuesArr = [];
    let lowerRange = 0;
    let higherRange = 0;
    let cutoffValueLower = 0;
    let cutoffValueHigher = 0;

    //determine cutoff values
    for (let i = 0; i < startingList.length; i++) {
        orderedValuesArr.push(membersArray[i][rankingParameter]);
    }
    orderedValuesArr.sort(function (a, b) { return a - b });
    lowerRange = Math.round(orderedValuesArr.length * cutoffPctLower / 100);
    higherRange = Math.round(orderedValuesArr.length * cutoffPctHigher / 100);
    cutoffValueLower = orderedValuesArr[lowerRange - 1];
    cutoffValueHigher = orderedValuesArr[orderedValuesArr.length - higherRange];
    for (let j = 0; j < startingList.length; j++) {
        if (startingList[j][rankingParameter] <= cutoffValueLower) {
            lowerResultArr.push(startingList[j]);
        }
        if (startingList[j][rankingParameter] >= cutoffValueHigher) {
            higherResultArr.push(startingList[j]);
        }
    }
    lowerResultArr.sort(function (a, b) { return a[rankingParameter] - b[rankingParameter] })
    higherResultArr.sort(function (a, b) { return b[rankingParameter] - a[rankingParameter] })
}

*/
