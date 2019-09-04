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
        selectedState: "all",
        partiesLegend: {
            "D": "democrat",
            "R": "republican",
            "I": "independent"
        },
        statesLegend: {
            "all": "any state",
            "AL": "Alabama",
            "AK": "Alaska",
            "AS": "American Samoa",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FM": "Federated States Of Micronesia",
            "FL": "Florida",
            "GA": "Georgia",
            "GU": "Guam",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MH": "Marshall Islands",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "MP": "Northern Mariana Islands",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PW": "Palau",
            "PA": "Pennsylvania",
            "PR": "Puerto Rico",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VI": "Virgin Islands",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        }
    },

    methods: {
        fetchRemoteData() {
            return fetch(this.url, this.initObject)
                .then(function (response) {
                    return response.json()
                }).then((json) => {
                    this.membersArray = json.results[0].members;
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
                if (!this.statesArray.includes(this.membersArray[i].state)) {
                    this.statesArray.push(this.membersArray[i].state);
                }
            }
            this.statesArray.sort();
        }
    },

    computed: {
        filterData() {
            return this.membersArray.filter(x => {
                let party = (app.selectedParties.includes(x.party) || app.selectedParties.length === 0);
                let state = (app.selectedState.includes(x.state) || app.selectedState === "all");
                return party && state;
            })
        },

        selectedFiltersStringBuilder() {

            let selectedPartiesString = "";
            for (let i = 0; i < this.selectedParties.length; i++) {
                selectedPartiesString += this.partiesLegend[this.selectedParties[i]];
                if (i < this.selectedParties.length - 2) {
                    selectedPartiesString += ", ";
                }
                if (i === this.selectedParties.length - 2) {
                    selectedPartiesString += " or ";
                }
            }
            selectedPartiesString += " delegates from " + this.statesLegend[this.selectedState];
            return selectedPartiesString;
        }
    },

    created() {
        this.fetchRemoteData();
    },

})


