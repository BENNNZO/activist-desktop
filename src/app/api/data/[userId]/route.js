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
            
                // date created
                Date: new Date,
                TimeAwake,
                FormattedDate,

                // vars
                Mood,
                Energy,

                // booleans
                Breakfast: form.Breakfast === undefined ? false : true,
                Lunch: form.Lunch === undefined ? false : true,
                Dinner: form.Dinner === undefined ? false : true,
                GoodSleep: form.GoodSleep === undefined ? false : true,
                Headache: form.Headache === undefined ? false : true,
                Exercise: form.Exercise === undefined ? false : true,
                Shower: form.Shower === undefined ? false : true,
                Work: form.Work === undefined ? false : true,
                Game: form.Game === undefined ? false : true,
                Music: form.Music === undefined ? false : true,
                // Smoke: form.Smoke === undefined ? false : true,
                // Vape: form.Vape === undefined ? false : true,
                // Drink: form.Drink === undefined ? false : true
            })
            return new Response("successfully created data point", { status: 200 })
        } else {
            return new Response("dpae")
        }


        // let randMood = Math.round(Math.random() * 10)
        // let randEnergy = Math.round(randMood - ((Math.random() - 0.5) * 3))
        // if (randEnergy < 0) {
        //     randEnergy = 0
        // } else if (randEnergy > 10) {
        //     randEnergy = 10
        // }

        // Date: new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`),

        // DataPoint.create({
        //     User: params.userId,
        //     Date: new Date(),
        //     TimeAwake: [Math.round(Math.random() * 11), Math.round(Math.random() * 11 + 13)],
        //     FormattedDate: "May, 2023",
        //     Mood: randMood,
        //     Energy: randEnergy,
        //     Breakfast: Math.random() > 0.5 ? true : false,
        //     // Lunch: true,
        //     Lunch: Math.random() > 0.9 ? true : false,
        //     // Dinner: false,
        //     Dinner: Math.random() > 0.8 ? true : false,
        //     GoodSleep: Math.random() > 0.7 ? true : false,
        //     Headache: Math.random() > 0.6 ? true : false,
        //     Exercise: Math.random() > 0.5 ? true : false,
        //     Shower: Math.random() > 0.4 ? true : false,
        //     Work: Math.random() > 0.3 ? true : false,
        //     Game: Math.random() > 0.2 ? true : false,
        //     Music: Math.random() > 0.1 ? true : false,
        //     Smoke: Math.random() > 0.5 ? true : false,
        //     Vape: Math.random() > 0.5 ? true : false,
        //     Drink: Math.random() > 0.5 ? true : false
        // })

        // return new Response("Created new data point")
    } catch (err) {
        console.log(err)
        return new Response("Failed to create data point.", err)
    }
}