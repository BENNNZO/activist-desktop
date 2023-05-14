// import mongoose from "mongoose";
import User from "@/models/User";
import { connect } from '@/utils/Connect';
import bcrypt from "bcrypt";

export async function POST(req) {
    const { email, username, password } = await req.json()

    try {
        await connect()

        User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })
        
        return new Response("Created New User!")
    } catch (err) {
        console.error(err)
        return new Response("Failed to create user", { status: 500 })
    }
}