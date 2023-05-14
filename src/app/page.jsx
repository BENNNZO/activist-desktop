"use client"

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession()

    return (
        <main>
            {session?.user ? (
                <>
                    <h1>Signed In</h1>
                    <button onClick={() => signOut()} className='py-2 px-4 bg-slate-300 shadow-sm'>Sign Out</button>
                    <img src={session?.user.image} alt="profile picture" />
                    <p className='text_gradient font-extrabold text-5xl'>{session?.user.name}</p>
                    <p>{session?.user.email}</p>
                </>
            ) : (
                <>
                    <h1>Signed Out</h1>
                    <button onClick={() => signIn()} className='py-2 px-4 bg-slate-300 shadow-sm'>Sign In</button>
                </>
            )}
        </main>
    )
}
