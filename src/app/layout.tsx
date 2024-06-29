import { ClerkProvider } from '@clerk/nextjs'
// Importing necessary modules and components
import { Metadata } from 'next';
import { Acme } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import React from 'react';
import Footer from 'src/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import OnlineBoosters from 'src/components/OnlineBoosters';
// Acme font configuration
const acme = Acme({
  subsets: ['latin'],
  weight: '400',
});

// Metadata object for page information
export const metadata: Metadata = {
  title: 'THE FASTEST AND SMOOTHEST ELO BOOST | GOW BOOST',
  description: 'GOW BOOST IS THE FASTEST AND SMOOTHEST ELO BOOST & CHEAP LOL BOOSTING',
};

// Layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={acme.className}>
          <Navbar />
            <main draggable={false}>
                {children}
                <ToastContainer theme='colored' autoClose={3500}/>
            </main>
            <Footer />

            <script src="//code.tidio.co/bkpl1adprhe6u042prplhjvumyforpm4.js" async></script>
            <OnlineBoosters />
          </body>
      </html>
    </ClerkProvider>
  );
}

