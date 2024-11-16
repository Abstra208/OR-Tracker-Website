"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import Cookies from 'js-cookie';
const { initializeApp, getApps } = require('firebase/app');
const { getDatabase, ref, set, get, child, update, remove } = require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

let app = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getDatabase(app);

export default function Home() {
  const [loginframe, setLoginframe] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (Cookies.get('access_token') !== undefined) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleCloseLogin = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const frame = document.querySelector('#login .frame') as HTMLElement;
    if (target && !frame.contains(target)) {
      frame.className = 'frame close';
      setLoginframe(null);
    }
  }

  const [amountrecords, setRecords] = useState<number>();
  const [amountservers, setServers] = useState<number>();
  useEffect(() => {
      const fetchRecords = async () => {
          try {
              const Recordsnapshot = await get(child(ref(db), '/records'));
              setRecords(Object.keys(Recordsnapshot.val()).length);
          } catch (error) {
              console.error('Erreur lors de la récupération des enregistrements:', error);
          }
      };
      const fetchServers = async () => {
          try {
              const Serverssnapshot = await get(child(ref(db), '/servers'));
              const Servers = Object.keys(Serverssnapshot.val()).length;
              if (Servers === 0) {
                  setServers(0);
              } else {
                  setServers(Servers);
              }
          } catch (error) {
              console.error('Erreur lors de la récupération des serveurs:', error);
          }
      }

      fetchRecords();
  }, [db]);

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
          <Image
              src="/or_records.png"
              alt="Record Tracker Logo"
              layout="intrinsic"
              height={40}
              width={40}
              priority
          />
          <h1>OR Records</h1>
        </div>
        <a onClick={handleLogin}>Login</a>
      </nav>
      <main>
        <div className='welcome'>
          <Image
            src="/or_tracker.png"
            alt="Record Tracker Logo"
            layout="intrinsic"
            height={180}
            width={180}
            priority
            className="big-logo"
          />
          <h1>OR Tracker</h1>
          <p>OR Tracker is a bot designed specifically for the community of the OR server,<br/> facilitating the seamless tracking of current records.</p>
          <ul>
            <li><a href="/invite" target='_blank'>Invite OR Tracker</a></li>
            <li><a href="/invite?methode=server" target='_blank'>Join the server</a></li>
          </ul>
        </div>
        <div className='informations'>
          <section>
            <h2>Servers</h2>
            <p>{amountservers}</p>
          </section>
          <section>
            <h2>Records</h2>
            <p>{amountrecords}</p>
          </section>
          <section>
            <h2>Users</h2>
          </section>
        </div>
      </main>
      {loginframe}
    </div>
  );
}