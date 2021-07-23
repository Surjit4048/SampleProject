module.exports = {
    url: {
        dev: "mongodb+srv://singh:ffun@cluster0.vdqwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        test: "mongodb+srv://singh:ffun@cluster0.vdqwc.mongodb.net/testDatabase?retryWrites=true&w=majority",
        params: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};