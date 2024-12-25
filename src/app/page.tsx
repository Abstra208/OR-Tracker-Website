'use client';

import React, { useEffect, useState } from 'react';
import './style/start.css';

export default function Home() {
  const [amountrecords, setRecords] = useState<number>(0);
  const [amountservers, setServers] = useState<number>(0);
  const [amountusers, setUsers] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      const informationsSection = document.getElementById('informations');
      if (!informationsSection) return;
      const infoUnderline = (informationsSection as HTMLElement).querySelector('.underline');

      const featuresSection = document.getElementById('features');
      if (!featuresSection) return;
      const featuresUnderline = (featuresSection as HTMLElement).querySelector('.underline');

      if (infoUnderline) {
        const rect = infoUnderline.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * .7 && rect.bottom >= window.innerHeight * .7;
        if (isInView) {
          infoUnderline.classList.add('active');
        }
      }
      if (featuresUnderline) {
        const rect = featuresUnderline.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * .7 && rect.bottom >= window.innerHeight * .7;
        if (isInView) {
          featuresUnderline.classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
      fetch(`/api/firebase/count`)
        .then((res) => res.json())
        .then(async (data) => {
          setServers(data.servers);
          setRecords(data.records);
          setUsers(data.users);
        })
        .catch((error) => console.error('Erreur lors de la récupération des serveurs:', error));
    } , [amountrecords, amountservers, amountusers]);
  return (
      <section id='start'>
        <section id='welcome'>
            <div>
                <img src="/ortracker.png" alt="Record Tracker Logo" />
                <h1>OR Tracker <span>Beta</span></h1>
            </div>
            <p>OR Tracker is a bot designed specifically for the community of the OR server,<br/> facilitating the seamless tracking of current records.</p>
            <ul>
                <li className='invite'><a className='discord' href="/invite" target='_blank'>Add to Discord</a></li>
                <li className='join'><a href="/server" target='_blank'>Join the server <img src="link.svg" alt="" /></a></li>
            </ul>
        </section>
        <section id='informations'>
            <h2>OR Tracker is <span className='underline'>the best way</span> to track your records<span className='small'>*</span></h2>
            <p>Currently serving over <span>{amountservers} servers</span> and more than <span>{amountusers} users.</span><br /> We have <span>{amountrecords} records</span> stored to date.</p>
        </section>
        <section id='features'>
          <h2><span className='underline'>Packed</span> with Features</h2>
          <p>Discover the amazing features that make OR Tracker the ultimate tool for record tracking.</p>
          <div className='features'>
              <div className='sec1'>
                  <h2>Record Tracking</h2>
                  <p>Easily monitor and manage current records with precision.</p>
              </div>
              <div className='sec2'>
                  <h2>Comprehensive Search</h2>
                  <p>Access records from any device, including Discord, your phone, computer, or even your TV.</p>
              </div>
              <div className='sec3'>
                  <h2>Leaderboard</h2>
                  <p>Compete on the leaderboard and strive to hold the most records.</p>
              </div>
          </div>
        </section>
      </section>
  );
}