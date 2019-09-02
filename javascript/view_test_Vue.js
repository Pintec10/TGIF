var app = new Vue({
    el: "#app",
    data: {
        membersArray: [],
        chamber: "",
        initObject: {
            method: "GET",
            headers: {
                "X-API-Key": "WS6nqjrzT2mQTDM2UCCv3b3RPJPoIbA5HjDHyu72"
            }
        }
    },

    methods: {
        fetchRemoteData() {
            console.log("called fetchRemoteData");
        }
    },

    computed: {

    },

    created() {
        this.fetchRemoteData();
    }
})