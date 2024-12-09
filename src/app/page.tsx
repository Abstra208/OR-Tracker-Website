'use client';

import Start from './components/start';
import Records from './components/records';
import Users from './components/users';

import './components/css/style.css';

import { useEffect, useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adresse = window.location.hash.substring(1);

    if (adresse === 'records') {
      setDisplay(<Records />);
    } else if (adresse === 'users') {
      setDisplay(<h1>Users</h1>);
    } else {
      setDisplay(<Start />);
    }
  }, []);
  const handleHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDisplay(<Start />);
    window.location.hash = '';
  }
  const handleRecords = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDisplay(<Records />);
    window.location.hash = 'records';
  }
  const handleUsers = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDisplay(<Users />);
    window.location.hash = 'users';
  }
  return (
      <main id='app'>
        <nav>
          <a onClick={handleHome}>Home</a>
          <a onClick={handleRecords}>Records</a>
          <a onClick={handleUsers}>Users</a>
        </nav>
        {display}
      </main>
  );
}