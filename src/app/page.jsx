"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function Home() {
    const { data: session } = useSession()
    const { push } = useRouter()

    return (
        <div>
            <button
                onClick={() => push(`/dashboard/${session?.user.id}`)}
            >
                Dashboard
            </button>
        </div>
    )
}
