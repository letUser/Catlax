new Vue({
    el: '#app',
    data: {
        prevVids: [],
        showVid: false,
        cuteKittiesList: null,
        funnyKittiesList: null,
        currentVideo: null,
        error: false,
        APIkey: "AIzaSyAFu4C-C_rWXXg-9W0G1PrgIKhlVhrZ2_0"
    },
    computed: {
        source() {
            if (this.currentVideo) return `https://www.youtube.com/embed/${this.currentVideo.id.videoId}`;
            else return null;
        }
    },
    methods: {
        async startCute() {
            try {
                this.error = false;
                this.funnyKittiesList = null;
                this.prevVids = [];

                if (!this.cuteKittiesList) {
                    const response = await axios.get(
                        `https://www.googleapis.com/youtube/v3/search?key=${this.APIkey}`,
                        {
                            params: {
                                "part": "snippet",
                                "maxResults": 1000,
                                "q": "cute kitties"
                            }
                        }
                    );
                    this.cuteKittiesList = response.data.items;
                }

                this.currentVideo = this.cuteKittiesList[this.getRandomInt(this.cuteKittiesList.length)];
                this.prevVids.push(this.currentVideo);

                this.showVid = true;
            } catch (err) {
                this.showVid = false;
                this.error = true;
            }
        },
        async startFun() {
            try {
                this.error = false;
                this.cuteKittiesList = null;
                this.prevVids = [];

                if (!this.funnyKittiesList) {
                    const response = await axios.get(
                        `https://www.googleapis.com/youtube/v3/search?key=${this.APIkey}`,
                        {
                            params: {
                                "part": "snippet",
                                "maxResults": 350,
                                "q": "funny kitties"
                            }
                        }
                    );
                    this.funnyKittiesList = response.data.items;
                }

                this.currentVideo = this.funnyKittiesList[this.getRandomInt(this.funnyKittiesList.length)];
                this.prevVids.push(this.currentVideo);

                this.showVid = true;
            } catch (err) {
                this.showVid = false;
                this.error = true;
            }
        },

        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },

        nextVideo() {
            try {
                if (!this.cuteKittiesList) {
                    this.currentVideo = this.funnyKittiesList[this.getRandomInt(this.funnyKittiesList.length)];
                    this.prevVids.push(this.currentVideo);
                } else if (!this.funnyKittiesList) {
                    this.currentVideo = this.cuteKittiesList[this.getRandomInt(this.cuteKittiesList.length)];
                    this.prevVids.push(this.currentVideo);
                }
            } catch (err) {
                this.showVid = false;
                this.error = true;
            }
        },

        prevVideo() {
            try {
                this.currentVideo = this.prevVids[this.prevVids.length - 2];
                this.prevVids.pop();
            } catch (err) {
                this.showVid = false;
                this.error = true;
            }
        }
    }
});