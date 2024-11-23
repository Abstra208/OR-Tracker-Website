"use client";

import { use, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { inView, animate, spring } from "motion";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export default function Home() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      inView("#servers_count", () => {
        animate("#servers_count ul", { x: [500, 0] }, { type: spring });
      });
      inView("#records_count", () => {
        animate("#records_count ul", { x: [-500, 0] }, { type: spring });
      });
      inView("#users_count", () => {
        animate("#users_count ul", { x: [500, 0] }, { type: spring });
      });
      animate(".welcome", { opacity: [0, 1], y: [-100, 0] }, { type: spring });
    }
  }, []);

  const [loginframe, setLoginframe] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (Cookies.get('access_token') !== undefined) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleCloseLogin = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const frame = document.getElementById('login')?.querySelector('.frame') as HTMLElement;
      if (target && !frame.contains(target)) {
        setLoginframe(null);
      }
    }
  }

  const [amountrecords, setRecords] = useState<number>();
  const [amountservers, setServers] = useState<number>();

  useEffect(() => {
    fetch(`/api/firebase/infos`)
      .then((res) => res.json())
      .then(async (data) => {
        setServers(data.servers);
        setRecords(data.records);
      })
      .catch((error) => console.error('Erreur lors de la récupération des serveurs:', error));
  } , []);

  const handleLogin = () => {
    setLoginframe(
      <div onClick={handleCloseLogin} id="login">
        <div className='frame open'>
          <div className="top">
            <div className='nav'>
              <h2>Login</h2>
              <span className="close" onClick={() => setLoginframe(null)}>&times;</span>
            </div>
            <p>Choose how you want to continue.</p>
          </div>
          <div className="content">
            <div className="options">
              <a className='discord' href="/login">Login with Discord</a>
              <span>OR</span>
              <a className='guest' href="/login?code=guest">Continue as a guest</a>
            </div>
          </div>
          <div className='bottom'>
            <p>By continuing, you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="app">
      <nav>
        <div className="left">
          <img src="/or_records.png" alt="Record Tracker Logo" />
          <h1>OR Records</h1>
        </div>
        <a onClick={handleLogin}>Login</a>
      </nav>
      <main>
        <div className='welcome'>
          <img src="/or_tracker.png" alt="Record Tracker Logo" />
          <h1>OR Tracker <span>Beta</span></h1>
          <p>OR Tracker is a bot designed specifically for the community of the OR server,<br/> facilitating the seamless tracking of current records.</p>
          <ul>
            <li><a href="/invite" target='_blank'>Invite OR Tracker</a></li>
            <li><a href="/invite?methode=server" target='_blank'>Join the server</a></li>
          </ul>
        </div>
        <div className='informations'>
          <section id='servers_count'>
            <ul>
              <h2>Servers</h2>
              <p>{amountservers}</p>
            </ul>
          </section>
          <section id='records_count'>
            <ul>
              <h2>Records</h2>
              <p>{amountrecords}</p>
            </ul>
          </section>
          <section id='users_count'>
            <ul>
              <h2>Users</h2>
              <p>Null</p>
            </ul>
          </section>
        </div>
      </main>
      {loginframe}
    </div>
  );
}