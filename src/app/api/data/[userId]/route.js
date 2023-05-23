import { connect } from "@/utils/Connect";
import DataPoint from "@/models/DataPoint";
import { data } from "autoprefixer";

export async function GET(req, { params }) {
    try {
        await connect()

        const dataPoints = await DataPoint.find({ User: params.userId })

        return new Response(JSON.stringify(dataPoints))
    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch users data points", err)
    }
}

export async function DELETE(req, { params }) {
    try {
        await connect()

        await DataPoint.deleteMany({ User: params.userId })

        return new Response("Deleted users data points")
    } catch (err) {
        console.log(err)
        return new Response("Failed to delete users data points", err)
    }
}

export async function POST(req, { params }) {
    const { 
        FormattedDate,
        TimeAwake,
        Mood,
        Energy,
        form
    } = await req.json()

    try {
        await connect()

        const dataPointExists = await DataPoint.findOne({ FormattedDate: FormattedDate, User: params.userId })

        if (!dataPointExists) {
            DataPoint.create({
                User: params.userId,
                Date: new Date,
                TimeAwake,
                FormattedDate,
                Mood,
                Energy,
                 Breakfast: form.Breakfast === undefined ? false : true,
                Lunch: form.Lunch === undefined ? false : true,
                Dinner: form.Dinner === undefined ? false : true,
                GoodSleep: form.Sleep === undefined ? false : true,
                Headache: form.Headache === undefined ? false : true,
                Exercise: form.Exercise === undefined ? false : true,
                Shower: form.Shower === undefined ? false : true,
                Work: form.Work === undefined ? false : true,
                Game: form.Game === undefined ? false : true,
                Music: form.Music === undefined ? false : true,
                Smoke: form.Smoke === undefined ? false : true,
                Vape: form.Vape === undefined ? false : true,
                Drink: form.Drink === undefined ? false : true
            })
            return new Response("successfully created data point", { status: 200 })
        } else {
            return new Response("dpae")
        }
    } catch (err) {
        console.log(err)
        return new Response("Failed to create data point.", err)
    }
}