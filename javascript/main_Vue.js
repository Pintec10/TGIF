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
            return fetch(this.url, this.initObject)
                .then(function (response) {
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
    },

})


