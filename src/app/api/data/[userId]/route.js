import { connect } from "@/utils/Connect";
import DataPoint from "@/models/DataPoint";

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

export async function POST(req, { params }) {
    try {
        await connect()

        DataPoint.create({
            User: params.userId,
            Breakfast: false,
            Lunch: false,
            Dinner: true,
            GoodSleep: false,
            Headache: false,
            Exercise: true,
            Shower: false,
            Work: true,
            Game: false,
            Music: false,
            Smoke: true,
            Vape: true,
            Drink: false
        })
        return new Response("Created new data point")
    } catch (err) {
        console.log(err)
        return new Response("Failed to create data point.", err)
    }
}