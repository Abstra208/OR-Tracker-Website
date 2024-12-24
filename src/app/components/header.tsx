"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
    const pathname = usePathname();
    let page = "";
    if (pathname === '/') {
        page = 'home';
    } else if (pathname === '/records') {
        page = 'records';
    } else if (pathname === '/users') {
        page = 'users';
    } else {
        page = 'none';
    }

    useEffect(() => {
        const navigation = document.getElementById('navigation');
        const homeNav = document.querySelector('.home a');
        const recordsNav = document.querySelector('.records a');
        const usersNav = document.querySelector('.users a');

        navigation?.classList.remove('home', 'records', 'users');
        homeNav?.classList.remove('active');
        recordsNav?.classList.remove('active');
        usersNav?.classList.remove('active');

        if (pathname === '/') {
            navigation?.classList.add('home');
            homeNav?.classList.add('active');
        } else if (pathname === '/records') {
            navigation?.classList.add('records');
            recordsNav?.classList.add('active');
        } else if (pathname === '/users') {
            navigation?.classList.add('users');
            usersNav?.classList.add('active');
        } else {
            navigation?.classList.add('none');
        }
    }, [pathname]);
    return (
        <nav>
            <div className='left'>
                <img src="/orrecords.png" alt="" />
                <h1>OR Records</h1>
            </div>
            <div className='center'>
                <div className="navigation">
                    <ul>
                        <li className="home"><Link href="/">Home</Link></li>
                        <li className="records"><Link href="/records">Records</Link></li>
                        <li className="users"><Link href="/users">Users</Link></li>
                    </ul>
                    <div id="navigation" className={page}></div>
                </div>
            </div>
            <div className='right'>
                <button>Coming soon!</button>
            </div>
        </nav>
    );
}