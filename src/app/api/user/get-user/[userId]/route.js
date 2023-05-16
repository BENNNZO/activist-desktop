import { connect } from "@/utils/Connect";
import User from "@/models/User";

export async function GET(req, { params }) {
    try {
        await connect()

        const user = await User.findById(params.userId, "-password")

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch user data (not data points)", err, { status: 500 })
    }
}