import NextAuth from 'next-auth/next'
import bcrypt from 'bcrypt'

// Providers
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Cookies so that the front end can tell if its a new user or not
import { cookies } from 'next/headers'

import { connect } from '@/utils/Connect'
import User from '@/models/User'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SK
        }),
        CredentialsProvider({
            async authorize(credentials, req) {
                const user = {
                    email: credentials.email,
                    username: credentials.username,
                    password: credentials.password
                }
                return user
            }
        })
    ],
    pages: {
        signIn: '/api/auth/signIn'
    },
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })

            if (sessionUser) {
                session.user.id = sessionUser._id.toString()
            }

            return session
        },
        async signIn({ profile, user }) {
            try {
                await connect()

                if (profile === undefined) {
                    const userExists = await User.findOne({ email: user.email })

                    if (!userExists) {
                        return '/api/auth/signUp?error=userNoExist'
                    } else {
                        if (await bcrypt.compare(user.password, userExists.password) === false) {
                            return '/api/auth/signIn?error=password'
                        } else {
                            return true
                        }
                    }
                } else {
                    const userExists = await User.findOne({ email: profile.email })
    
                    if (!userExists) {
                        User.create({
                            email: profile.email,
                            username: profile.name,
                            image: profile.picture
                        })
                        cookies().set("isNewUser", true)
                    } else {
                        cookies().set("isNewUser", false)
                    }
                    return true
                }
            } catch (err) {
                console.error("Failed to sign in user.", err)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }