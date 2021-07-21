module.exports = mongoose => {
    return mongoose.model(
        "car",
        mongoose.Schema(
            {
                id: String,
                no: Number,
                make: String,
                model: String,
                year: Number,
                price: String,
                status: String,
            },
            {timestamps: true}
        )
    );
};