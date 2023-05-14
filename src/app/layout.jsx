import './globals.css'
import { Poppins } from 'next/font/google'
import Provider from '@/utils/Provider'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
    title: 'Activist',
    description: 'App to rack mood and energy daily',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    )
}
