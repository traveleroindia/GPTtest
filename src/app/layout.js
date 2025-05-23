
import dynamic from 'next/dynamic';
import "./globals.css";
import {Providers} from './provider'
import {UserProvider} from './components/providers/userProvider'
// import Navbar from "./components/navbar/navbar";
const Navbar = dynamic(() => import('./components/navbar/navbar'), { ssr: true });


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}&libraries=places`}
        ></script>

      </head>
       <body   >
        <Providers>
          <UserProvider>
        <Navbar />
        {children}
        </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
