import { Schema, model, models } from "mongoose";

const DataPointSchema = new Schema({
    // user this point is attached to
    User: { 
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // date created
    Date: Date,
    FormattedDate: String,

    // vars
    Mood: Number,
    Energy: Number,

    // booleans
    Breakfast: Boolean,
    Lunch: Boolean,
    Dinner: Boolean,
    GoodSleep: Boolean,
    Headache: Boolean,
    Exercise: Boolean,
    Shower: Boolean,
    Work: Boolean,
    Game: Boolean,
    Music: Boolean,
    Smoke: Boolean,
    Vape: Boolean,
    Drink: Boolean
})

export default models.DataPoint || new model("DataPoint", DataPointSchema)