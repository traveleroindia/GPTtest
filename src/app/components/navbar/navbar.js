'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { BsFillCloudMoonFill, BsCloudSunFill } from "react-icons/bs";
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import LOGO from '../../../../public/images/LOGO.png';
import {useAuth } from '../providers/userProvider';
import dynamic from 'next/dynamic';
import { useCookies } from 'react-cookie';

const navLinks = [
    { id: 1, title: 'Home', href: '/' },
    { id: 2, title: 'About', href: '/about' },
    { id: 3, title: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const currentTheme = resolvedTheme || 'light';
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const prevUserDetails = useRef(null); // Store previous state without re-rendering

 const {userDetails} = useAuth();;
    // Set mounted to true after component mounts
    useEffect(() => {
        setMounted(true);
    }, []);


    const [cookies, setCookie, removeCookie] = useCookies(['user']); // Correct destructuring
    const logOut = () => {
        removeCookie('user', { path: '/' });
        alert('User logged out successfully!');
    };




    // Return null until component is mounted to avoid hydration issues, but still render the structure
    return (
        <nav className={`lg:px-20 md:px-5 py-2 md:py-1 lg:shadow-lg shadow-lg sticky top-0 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 z-50 ${!mounted ? 'hidden' : ''}`}>
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold w-60 max-w-full px-4 xl:mr-12">
                    <Image src={LOGO} className="w-[150px]" alt="logo" />
                </div>
                <div className="lg:hidden px-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 focus:outline-none">
                        {isOpen ? '✖' : '☰'}
                    </button>
                </div>
                <div className={`fixed z-50 top-0 left-0 w-3/4 h-full shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex lg:flex-row lg:justify-between lg:items-center lg:shadow-none bg-[--light] dark:bg-[--dark] py-2 lg:bg-transparent lg:dark:bg-transparent`}>
                    <div className="lg:hidden flex items-center flex-col max-w-48 mb-8">
                        <Image src={LOGO} priority="low" alt="logo" />
                    </div>
                    <div className="lg:flex-row lg:items-center flex flex-col">
                        {navLinks.map((link) => (
                            <Link key={link.id} href={link.href}
                                className={`px-4 py-2 rounded ${pathname === link.href ? 'text-[--c1] font-semibold' : 'hover:text-[--c1]'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <div className="lg:flex-row lg:items-center flex flex-col-reverse gap-3 text-center mt-8 lg:mt-0">
                        <button
                            onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
                            aria-label="Toggle Theme"
                            className="px-4 py-2 text-3xl text-[--c1] hover:text-[--c1hover] transition"
                        >
                            {currentTheme === 'light' ? <BsFillCloudMoonFill /> : <BsCloudSunFill />}
                        </button>

                        {/* Show user details if available */}
                        {userDetails ? (
                            <><p className="px-4 py-2  text-xs">Hello <span className='font-bold capitalize text-xl'>{userDetails.name}</span> </p>
                            < button className="px-4 py-2 rounded ml-4 bg-gray-800 w-36 text-white dark:bg-[--light] dark:text-black dark:hover:bg-[--c1] hover:bg-[--c1] transform-scalar" 
                            onClick={logOut}>
                                Logout
                            </button></>
                        ) : (
                            <>
                                <Link href="/user" className="px-4 py-2 rounded ml-4 bg-[--c1] w-36 text-white hover:transform-sc">
                                    Login
                                </Link>
                                <Link href="/user" className="px-4 py-2 rounded ml-4 bg-gray-800 w-36 text-white dark:bg-[--light] dark:text-black">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });