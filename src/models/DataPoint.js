import { Schema, model, models } from "mongoose";

const DataPointSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Breakfast: {
        type: Boolean
    },
    Lunch: {
        type: Boolean
    },
    Dinner: {
        type: Boolean
    },
    GoodSleep: {
        type: Boolean
    },
    Headache: {
        type: Boolean
    },
    Exercise: {
        type: Boolean
    },
    Shower: {
        type: Boolean
    },
    Work: {
        type: Boolean
    },
    Game: {
        type: Boolean
    },
    Music: {
        type: Boolean
    },
    Smoke: {
        type: Boolean
    },
    Vape: {
        type: Boolean
    },
    Drink: {
        type: Boolean
    }
})

export default models.DataPoint || new model("DataPoint", DataPointSchema)