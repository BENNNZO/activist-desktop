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

        // const dataPointExists = await DataPoint.findOne({ FormattedDate: FormattedDate, User: params.userId })
        const dataPointExists = false

        console.log(form)

        if (!dataPointExists) {
            DataPoint.create({
                User: params.userId,
                Date: new Date,
                TimeAwake,
                FormattedDate,
                Mood,
                Energy,
                Breakfast: form.Breakfast === undefined ? false : form.Breakfast,
                Lunch: form.Lunch === undefined ? false : form.Lunch,
                Dinner: form.Dinner === undefined ? false : form.Dinner,
                GoodSleep: form.Sleep === undefined ? false : form.Sleep,
                Headache: form.Headache === undefined ? false : form.Headache,
                Exercise: form.Exercise === undefined ? false : form.Exercise,
                Shower: form.Shower === undefined ? false : form.Shower,
                Work: form.Work === undefined ? false : form.Work,
                Game: form.Game === undefined ? false : form.Game,
                Music: form.Music === undefined ? false : form.Music,
                Smoke: form.Smoke === undefined ? false : form.Smoke,
                Vape: form.Vape === undefined ? false : form.Vape,
                Drink: form.Drink === undefined ? false : form.Drink
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