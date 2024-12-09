import './css/start.css';

import React, { useEffect, useState } from 'react';

export default function start() {
    const [amountrecords, setRecords] = useState<number>();
    const [amountservers, setServers] = useState<number>();
    const [amountusers, setUsers] = useState<number>();
    useEffect(() => {
        fetch(`/api/firebase/count`)
          .then((res) => res.json())
          .then(async (data) => {
            setServers(data.servers);
            setRecords(data.records);
            setUsers(data.users);
          })
          .catch((error) => console.error('Erreur lors de la récupération des serveurs:', error));
      } , []);
    return (
        <section id='start'>
            <div id='welcome'>
                <div>
                    <img src="/or_tracker.png" alt="Record Tracker Logo" />
                    <h1>OR Tracker <span>Beta</span></h1>
                </div>
                <p>OR Tracker is a bot designed specifically for the community of the OR server,<br/> facilitating the seamless tracking of current records.</p>
                <ul>
                    <li className='invite'><a href="/invite" target='_blank'>Invite OR Tracker</a></li>
                    <li className='join'><a href="/invite?methode=server" target='_blank'>Join the server</a></li>
                </ul>
            </div>
            <div id='informations'>
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
                    <p>{amountusers}</p>
                    </ul>
                </section>
            </div>
            <div id='features'>
                <section className='sec1'>
                    <ul>
                    <h2>Track current records</h2>
                    <p>Track the current records easily</p>
                    </ul>
                </section>
                <section className='sec2'>
                    <ul>
                    <h2>Search current records from where you want</h2>
                    <p>You can search for records from where you want. Discord, your phone, your computer or even your TV</p>
                    </ul>
                </section>
                <section className='sec3'>
                    <ul>
                    <h2>Leaderboard for the player</h2>
                    <p>You can take a part into the leaderboard and try to be one with the most records to their name</p>
                    </ul>
                </section>
            </div>
        </section>
    );
}