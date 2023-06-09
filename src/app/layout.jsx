import './globals.css'
import { Poppins } from 'next/font/google'
import Provider from '@/utils/Provider'
import NavBar from '@/components/NavBar'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
    title: 'Activist',
    description: 'App to rack mood and energy daily',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className='overflow-x-hidden'>
            <body className={poppins.className}>
                <Provider>
                    <NavBar />
                    {children}
                </Provider>
            </body>
        </html>
    )
}
