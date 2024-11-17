"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
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

if (typeof window !== 'undefined' && Cookies.get('access_token') === undefined) {
    window.location.href = '/login';
}

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const db = getDatabase(app);
    interface Record {
        name: string;
        description: string;
        imageUrl?: string;
    }

    const [records, setRecords] = useState<{ [key: string]: Record }>({});

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const Recordsnapshot = await get(child(ref(db), '/records'));
                setRecords(Recordsnapshot.val());
            } catch (error) {
                console.error('Erreur lors de la récupération des enregistrements:', error);
            }
        };

        fetchRecords();
    }, [db]);

    const records_list = [];

    for (const record in records) {
        records_list.push(
            <li key={record}>
                <input type="checkbox" id={record} name={record} />
                <label htmlFor={record}>
                    <h2>{records[record].name}</h2>
                    <p>{records[record].description}</p>
                </label>
            </li>
        );
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = Cookies.get('access_token');

                const userResponse = await axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const { id, avatar } = userResponse.data;

                setUsername(userResponse.data.username);
                setId(userResponse.data.id);
                setAvatar(userResponse.data.avatar);
                setAvatarUrl(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
            } catch (error) {
                setUsername('Guest');
                setId('0');
                setAvatar('0');
                setAvatarUrl('https://cdn.discordapp.com/embed/avatars/0.png');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        Cookies.remove('access_token');
        window.location.href = '/';
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof document !== 'undefined') {
            const search = e.target.value.toLowerCase();
            const records_list = document.querySelectorAll('ul li');

            records_list.forEach((record) => {
                const nameElement = record.querySelector('h2');
                const descriptionElement = record.querySelector('p');

                const name = nameElement?.textContent?.toLowerCase() || '';
                const description = descriptionElement?.textContent?.toLowerCase() || '';

                if (name.includes(search) || description.includes(search)) {
                    (record as HTMLElement).style.display = 'block';
                } else {
                    (record as HTMLElement).style.display = 'none';
                }
            });
        } else {
            console.error('Erreur lors de la recherche:', 'document is not defined');
        }
    }

    return (
        <main>
            <nav>
                <h1>Bienvenue, {username} !</h1>
                <img src={avatarUrl} alt={`${username}'s avatar`} />
                <button onClick={handleLogout}>Log out</button>
            </nav>
            <div>
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    onChange={handleSearch} 
                />
                <ul>
                    {records_list}
                </ul>
            </div>
        </main>
    );
}

export default Dashboard;